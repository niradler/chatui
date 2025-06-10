import { useState, useCallback, useRef, useEffect } from 'react';
import type { Message, MessageImage } from '../types';
import { ollamaApi, type OllamaMessage } from '../services/ollamaApi';
import { ERROR_MESSAGES, STORAGE_KEYS } from '../constants';

export interface ChatState {
  id: string | null;
  title: string;
  messages: Message[];
  model: string;
  createdAt: Date;
  updatedAt: Date;
  metadata?: {
    totalMessages: number;
    lastActivity: Date;
    averageResponseTime?: number;
  };
}

export const useOllamaChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentModel, setCurrentModel] = useState<string>(() => {
    const savedModel = localStorage.getItem(STORAGE_KEYS.LAST_MODEL);
    return savedModel || '';
  });
  const [serverStatus, setServerStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [chatTitle, setChatTitle] = useState<string>('New Chat');
  const [isRestoring, setIsRestoring] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const messageIdCounterRef = useRef(0);
  const chatStateRef = useRef<ChatState>({
    id: null,
    title: 'New Chat',
    messages: [],
    model: currentModel,
    createdAt: new Date(),
    updatedAt: new Date()
  });

  // Streaming buffer configuration
  const streamingBufferRef = useRef({
    chunks: [] as string[],
    timer: null as number | null,
    chunkSize: 2, // Default: show every 2 chunks (configurable)
    displayInterval: 100, // Default: 100ms between displays (configurable)
    isStreaming: false,
    messageId: '',
    fullContent: '',
  });

  // Auto-generate chat title from first user message
  const generateChatTitle = useCallback((messages: Message[]): string => {
    const firstUserMessage = messages.find(msg => msg.type === 'user' && msg.content.trim());
    if (!firstUserMessage) return 'New Chat';

    const content = firstUserMessage.content.trim();
    // Take first 50 characters, break at word boundary
    if (content.length <= 50) return content;

    const truncated = content.substring(0, 47);
    const lastSpace = truncated.lastIndexOf(' ');
    return (lastSpace > 20 ? truncated.substring(0, lastSpace) : truncated) + '...';
  }, []);

  // Update chat state
  const updateChatState = useCallback((updates: Partial<ChatState>) => {
    chatStateRef.current = {
      ...chatStateRef.current,
      ...updates,
      updatedAt: new Date(),
    };

    if (updates.title) {
      setChatTitle(updates.title);
    }
  }, []);

  // Initialize new chat
  const initializeNewChat = useCallback((model?: string) => {
    const newChatState: ChatState = {
      id: null,
      title: 'New Chat',
      messages: [],
      model: model || currentModel,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    chatStateRef.current = newChatState;
    setCurrentChatId(null);
    setChatTitle('New Chat');
    setMessages([]);

    if (model) {
      setCurrentModel(model);
    }

    return newChatState;
  }, [currentModel]);

  // Restore chat from history
  const restoreChat = useCallback(async (chatData: {
    id: string;
    title: string;
    messages: Message[];
    model: string;
    createdAt: Date;
    updatedAt: Date;
  }) => {
    try {
      setIsRestoring(true);

      // Stop any ongoing operations
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Update chat state
      const restoredState: ChatState = {
        ...chatData,
        metadata: {
          totalMessages: chatData.messages.length,
          lastActivity: new Date(chatData.updatedAt),
        }
      };

      chatStateRef.current = restoredState;
      setCurrentChatId(chatData.id);
      setChatTitle(chatData.title);
      setCurrentModel(chatData.model);

      // Restore messages with proper timestamp conversion
      const restoredMessages = chatData.messages.map(msg => ({
        ...msg,
        timestamp: new Date(msg.timestamp),
      }));

      setMessages(restoredMessages);
      setIsLoading(false);

      console.log(`🔄 Restored chat: ${chatData.title} (${restoredMessages.length} messages)`);

      return restoredState;
    } catch (error) {
      console.error('Failed to restore chat:', error);
      throw error;
    } finally {
      setIsRestoring(false);
    }
  }, []);

  // Get current chat state
  const getCurrentChatState = useCallback((): ChatState => {
    const currentState = {
      ...chatStateRef.current,
      id: currentChatId,
      title: chatTitle,
      messages,
      model: currentModel,
      updatedAt: new Date(),
      metadata: {
        totalMessages: messages.length,
        lastActivity: new Date(),
        averageResponseTime: messages
          .filter(msg => msg.metadata?.processingTime)
          .reduce((acc, msg, _, arr) => acc + (msg.metadata!.processingTime! / arr.length), 0),
      }
    };

    chatStateRef.current = currentState;
    return currentState;
  }, [currentChatId, chatTitle, messages, currentModel]);

  // Update chat state when messages change
  useEffect(() => {
    if (messages.length > 0) {
      const newTitle = generateChatTitle(messages);
      if (newTitle !== chatTitle && chatTitle === 'New Chat') {
        setChatTitle(newTitle);
        updateChatState({ title: newTitle });
      }

      updateChatState({
        messages,
        metadata: {
          totalMessages: messages.length,
          lastActivity: new Date(),
        }
      });
    }
  }, [messages, generateChatTitle, chatTitle, updateChatState]);

  // Load available models and set default if none selected
  useEffect(() => {
    const loadModels = async () => {
      try {
        const models = await ollamaApi.getModels();
        if (models.length > 0 && !currentModel) {
          const firstModel = models[0].name;
          setCurrentModel(firstModel);
          localStorage.setItem(STORAGE_KEYS.LAST_MODEL, firstModel);
          chatStateRef.current.model = firstModel;
        }
      } catch (error) {
        console.error('Failed to load models:', error);
      }
    };
    loadModels();
  }, [currentModel]);

  // Update local storage when model changes
  const handleModelChange = useCallback((model: string) => {
    setCurrentModel(model);
    localStorage.setItem(STORAGE_KEYS.LAST_MODEL, model);
    chatStateRef.current.model = model;
  }, []);

  const checkServerStatus = useCallback(async () => {
    setServerStatus('checking');
    const isRunning = await ollamaApi.isServerRunning();
    setServerStatus(isRunning ? 'online' : 'offline');
    return isRunning;
  }, []);

  // Convert our Message format to Ollama format
  const convertToOllamaMessages = useCallback((messages: Message[]): OllamaMessage[] => {
    return messages
      .filter(msg => !msg.isLoading)
      .map(msg => {
        const ollamaMsg: OllamaMessage = {
          role: msg.type === 'user' ? 'user' : 'assistant',
          content: msg.content
        };

        // Add images if present (for vision models)
        if (msg.images && msg.images.length > 0) {
          // Convert File objects to base64 - this will be handled in the API call
          ollamaMsg.images = [];
        }

        return ollamaMsg;
      });
  }, []);

  // Add a new message
  const addMessage = useCallback((message: Omit<Message, 'id' | 'timestamp'>) => {
    // Generate unique ID using timestamp + counter to prevent collisions
    messageIdCounterRef.current += 1;
    const newMessage: Message = {
      ...message,
      id: `${Date.now()}-${messageIdCounterRef.current}`,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    return newMessage.id;
  }, []);

  // Update a message
  const updateMessage = useCallback((messageId: string, updates: Partial<Message>) => {
    setMessages(prev =>
      prev.map(msg => {
        if (msg.id === messageId) {
          return { ...msg, ...updates };
        }
        return msg;
      })
    );
  }, []);

  // Configure streaming settings (for developers)
  const configureStreaming = useCallback((settings: {
    chunkSize?: number;
    displayInterval?: number;
  }) => {
    if (settings.chunkSize !== undefined) {
      streamingBufferRef.current.chunkSize = Math.max(1, settings.chunkSize);
    }
    if (settings.displayInterval !== undefined) {
      streamingBufferRef.current.displayInterval = Math.max(50, settings.displayInterval);
    }
  }, []);

  // Start streaming for a message
  const startStreaming = useCallback((messageId: string) => {
    const buffer = streamingBufferRef.current;

    // Clear any existing streaming state
    if (buffer.timer) {
      clearTimeout(buffer.timer);
    }

    // Initialize streaming state
    buffer.chunks = [];
    buffer.isStreaming = true;
    buffer.messageId = messageId;
    buffer.fullContent = '';
    buffer.timer = null;

    console.log('🚀 Started streaming for message:', messageId);
  }, [updateMessage]);

  // Flush accumulated chunks to display
  const flushStreamingBuffer = useCallback(() => {
    const buffer = streamingBufferRef.current;

    if (!buffer.isStreaming || !buffer.messageId) {
      return;
    }

    // Clear timer
    if (buffer.timer) {
      clearTimeout(buffer.timer);
      buffer.timer = null;
    }

    // Update message with current content
    if (buffer.fullContent) {
      console.log('📝 Flushing', buffer.chunks.length, 'chunks:', buffer.fullContent.slice(-20));
      updateMessage(buffer.messageId, {
        content: buffer.fullContent,
        isLoading: true,
      });
    }

    // Clear processed chunks
    buffer.chunks = [];
  }, [updateMessage]);

  // Add chunk to buffer and handle display
  const addStreamingChunk = useCallback((chunk: string) => {
    const buffer = streamingBufferRef.current;

    if (!buffer.isStreaming || !buffer.messageId) {
      console.warn('⚠️ Received chunk but not streaming:', chunk);
      return;
    }

    // Add chunk to buffer
    buffer.chunks.push(chunk);
    buffer.fullContent += chunk;

    // Check if we should display accumulated chunks
    if (buffer.chunks.length >= buffer.chunkSize) {
      flushStreamingBuffer();
    } else {
      // Schedule a flush if we haven't flushed recently
      if (!buffer.timer) {
        buffer.timer = setTimeout(() => {
          flushStreamingBuffer();
        }, buffer.displayInterval);
      }
    }
  }, [flushStreamingBuffer]);

  // End streaming and finalize message
  const endStreaming = useCallback((finalContent?: string, metadata?: any) => {
    const buffer = streamingBufferRef.current;

    if (!buffer.isStreaming || !buffer.messageId) {
      console.warn('⚠️ Attempted to end streaming but not streaming');
      return;
    }

    console.log('🏁 Ending streaming for message:', buffer.messageId);

    // Clear any pending timer
    if (buffer.timer) {
      clearTimeout(buffer.timer);
      buffer.timer = null;
    }

    // Final flush with any remaining chunks
    if (buffer.chunks.length > 0) {
      flushStreamingBuffer();
    }

    // Final update with complete content and metadata
    const finalText = finalContent || buffer.fullContent;
    updateMessage(buffer.messageId, {
      content: finalText,
      isLoading: false,
      metadata,
    });

    // Clear streaming state
    buffer.isStreaming = false;
    buffer.messageId = '';
    buffer.fullContent = '';
    buffer.chunks = [];

    console.log('✅ Streaming ended successfully');
  }, [updateMessage, flushStreamingBuffer]);

  // Clear/cancel streaming
  const clearStreaming = useCallback(() => {
    const buffer = streamingBufferRef.current;

    if (buffer.timer) {
      clearTimeout(buffer.timer);
      buffer.timer = null;
    }

    buffer.isStreaming = false;
    buffer.messageId = '';
    buffer.fullContent = '';
    buffer.chunks = [];

    console.log('🧹 Streaming cleared');
  }, []);

  // Remove a message
  const removeMessage = useCallback((messageId: string) => {
    setMessages(prev => prev.filter(msg => msg.id !== messageId));
  }, []);

  // Send a message to Ollama
  const sendMessage = useCallback(async (content: string, images?: MessageImage[], enableStreaming: boolean = true) => {
    if ((!content.trim() && (!images || images.length === 0)) || isLoading) return;

    // Check server status first
    const isServerRunning = await checkServerStatus();
    if (!isServerRunning) {
      addMessage({
        type: 'assistant',
        content: ERROR_MESSAGES.SERVER_OFFLINE,
        isLoading: false,
      });
      return;
    }

    // Add user message
    addMessage({
      type: 'user',
      content: content.trim(),
      isLoading: false,
      images: images,
    });

    // Add loading assistant message
    const assistantMessageId = addMessage({
      type: 'assistant',
      content: '',
      isLoading: true,
    });

    setIsLoading(true);

    try {
      // Create abort controller for this request
      abortControllerRef.current = new AbortController();

      const ollamaMessages = convertToOllamaMessages(messages);
      ollamaMessages.push({ role: 'user', content: content.trim() });

      const startTime = Date.now();

      // Extract files from images for API call
      const imageFiles = images ? images.map(img => img.file) : [];

      // Reset streaming buffer timer for new conversation
      clearStreaming();

      if (enableStreaming) {
        console.log('🚀 Starting streaming chat...');

        // Start streaming for the assistant message
        startStreaming(assistantMessageId);

        // Streaming response with optional images
        await ollamaApi.chatWithImages(
          currentModel,
          ollamaMessages,
          imageFiles,
          (token: string) => {
            // Add each token to the streaming buffer
            addStreamingChunk(token);
          },
          () => {
            console.log('✅ Streaming completed, finalizing message...');
            const processingTime = Date.now() - startTime;

            // End streaming with metadata
            endStreaming(undefined, {
              model: currentModel,
              processingTime,
            });

            setIsLoading(false);
            console.log('✅ Message finalized successfully');
          },
          abortControllerRef.current?.signal
        );
        console.log('🏁 Streaming request completed');
      } else {
        // Non-streaming response with optional images
        const response = await ollamaApi.chatWithImages(currentModel, ollamaMessages, imageFiles);
        const processingTime = Date.now() - startTime;
        updateMessage(assistantMessageId, {
          content: response,
          isLoading: false,
          metadata: {
            model: currentModel,
            processingTime,
          },
        });
        setIsLoading(false);
      }

    } catch (error) {
      console.error('Error sending message:', error);

      // Clear streaming state
      clearStreaming();

      // Update the assistant message with error
      const errorMessage = error instanceof Error ? error.message : ERROR_MESSAGES.REQUEST_FAILED;
      updateMessage(assistantMessageId, {
        content: `❌ Error: ${errorMessage}`,
        isLoading: false,
      });
      setIsLoading(false);
    }
  }, [messages, isLoading, currentModel, addMessage, updateMessage, convertToOllamaMessages, checkServerStatus, startStreaming, addStreamingChunk, endStreaming, clearStreaming]);

  // Stop current generation
  const stopGeneration = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }

    // Clear streaming state
    clearStreaming();

    // Update any loading messages
    setMessages(prev =>
      prev.map(msg =>
        msg.isLoading ? { ...msg, isLoading: false } : msg
      )
    );
    setIsLoading(false);
  }, [clearStreaming]);

  // Clear all messages
  const clearMessages = useCallback(() => {
    setMessages([]);
    initializeNewChat();
  }, [initializeNewChat]);

  // Regenerate last response
  const regenerateLastResponse = useCallback(async () => {
    const lastUserMessage = [...messages].reverse().find(msg => msg.type === 'user');
    if (lastUserMessage) {
      // Remove the last assistant message if it exists
      let lastAssistantIndex = -1;
      for (let i = messages.length - 1; i >= 0; i--) {
        if (messages[i].type === 'assistant') {
          lastAssistantIndex = i;
          break;
        }
      }
      if (lastAssistantIndex > -1) {
        setMessages(prev => prev.slice(0, lastAssistantIndex));
      }

      // Resend the last user message
      await sendMessage(lastUserMessage.content);
    }
  }, [messages, sendMessage]);

  return {
    // Core chat state
    messages,
    isLoading,
    currentModel,
    serverStatus,

    // Chat management state
    currentChatId,
    chatTitle,
    isRestoring,

    // Actions
    setCurrentModel: handleModelChange,
    sendMessage,
    addMessage,
    updateMessage,
    removeMessage,
    stopGeneration,
    clearMessages,
    regenerateLastResponse,
    checkServerStatus,
    configureStreaming,

    // Chat management actions
    initializeNewChat,
    restoreChat,
    getCurrentChatState,
    updateChatState,
    generateChatTitle,
  };
};
