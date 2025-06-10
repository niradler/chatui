import { useState, useEffect, useCallback } from 'react';
import type { ChatHistory } from '../types';
import { chatStorage } from '../services/storage';
import type { ChatState } from './useChatUI';

export const useChatHistory = () => {
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load chat history from storage
  const loadChatHistory = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Add small delay to prevent UI flashing
      await new Promise(resolve => setTimeout(resolve, 100));

      const history = chatStorage.getChatHistory();
      setChatHistory(history);

      console.log(`📋 Loaded ${history.length} chats from history`);
    } catch (error) {
      console.error('Failed to load chat history:', error);
      setError('Failed to load chat history');
      setChatHistory([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save chat state
  const saveChatState = useCallback((chatState: ChatState): string => {
    try {
      const chatId = chatStorage.saveChatState(chatState);

      // Refresh chat history to reflect changes
      loadChatHistory();

      return chatId;
    } catch (error) {
      console.error('Failed to save chat:', error);
      setError('Failed to save chat');
      throw error;
    }
  }, [loadChatHistory]);

  // Load specific chat state
  const loadChatState = useCallback((chatId: string): ChatState | null => {
    try {
      const chatState = chatStorage.getChatState(chatId);
      return chatState;
    } catch (error) {
      console.error('Failed to load chat:', error);
      setError('Failed to load chat');
      return null;
    }
  }, []);

  // Delete chat
  const deleteChat = useCallback(async (chatId: string) => {
    try {
      chatStorage.deleteChat(chatId);

      // Refresh chat history
      await loadChatHistory();

      console.log(`🗋 Deleted chat: ${chatId}`);
    } catch (error) {
      console.error('Failed to delete chat:', error);
      setError('Failed to delete chat');
      throw error;
    }
  }, [loadChatHistory]);

  // Update chat metadata
  const updateChatMetadata = useCallback((chatId: string, updates: { title?: string; starred?: boolean; tags?: string[] }) => {
    try {
      const success = chatStorage.updateChat(chatId, {
        title: updates.title,
        metadata: {
          totalMessages: chatStorage.getChat(chatId)?.messageCount || 0,
          lastActivity: new Date(),
          ...chatStorage.getChat(chatId)?.metadata,
          starred: updates.starred,
          tags: updates.tags,
        }
      });

      if (success) {
        loadChatHistory();
        console.log(`✏️ Updated chat metadata: ${chatId}`);
      }

      return success;
    } catch (error) {
      console.error('Failed to update chat:', error);
      setError('Failed to update chat');
      return false;
    }
  }, [loadChatHistory]);

  // Search chats
  const searchChats = useCallback((query: string): ChatHistory[] => {
    try {
      if (!query.trim()) return chatHistory;
      return chatStorage.searchChats(query);
    } catch (error) {
      console.error('Failed to search chats:', error);
      return [];
    }
  }, [chatHistory]);

  // Get recent chats
  const getRecentChats = useCallback((limit: number = 10): ChatHistory[] => {
    try {
      return chatStorage.getRecentChats(limit);
    } catch (error) {
      console.error('Failed to get recent chats:', error);
      return [];
    }
  }, []);

  // Export all chats
  const exportChats = useCallback((): string => {
    try {
      return chatStorage.exportAllChats();
    } catch (error) {
      console.error('Failed to export chats:', error);
      setError('Failed to export chats');
      throw error;
    }
  }, []);

  // Import chats
  const importChats = useCallback(async (jsonData: string): Promise<number> => {
    try {
      const importedCount = chatStorage.importChats(jsonData);
      await loadChatHistory(); // Reload to show imported chats

      return importedCount;
    } catch (error) {
      console.error('Failed to import chats:', error);
      setError('Failed to import chats');
      throw error;
    }
  }, [loadChatHistory]);

  // Get storage info
  const getStorageInfo = useCallback(() => {
    try {
      return chatStorage.getStorageInfo();
    } catch (error) {
      console.error('Failed to get storage info:', error);
      return { used: 0, available: 0, chatCount: 0 };
    }
  }, []);

  // Cleanup old chats
  const cleanupOldChats = useCallback(async (maxChats: number = 100): Promise<number> => {
    try {
      const deletedCount = chatStorage.cleanupOldChats(maxChats);
      if (deletedCount > 0) {
        await loadChatHistory();
        console.log(`🧝 Cleaned up ${deletedCount} old chats`);
      }
      return deletedCount;
    } catch (error) {
      console.error('Failed to cleanup chats:', error);
      return 0;
    }
  }, [loadChatHistory]);

  // Auto-save functionality with debouncing
  const createAutoSave = useCallback((chatState: ChatState, delay: number = 2000) => {
    const timeoutId = setTimeout(() => {
      try {
        if (chatState.messages.length > 0) {
          saveChatState(chatState);
        }
      } catch (error) {
        console.error('Auto-save failed:', error);
      }
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [saveChatState]);

  // Load chat history on mount
  useEffect(() => {
    loadChatHistory();
  }, [loadChatHistory]);

  // Clear error after 5 seconds
  useEffect(() => {
    if (error) {
      const timeoutId = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timeoutId);
    }
  }, [error]);

  return {
    // State
    chatHistory,
    isLoading,
    error,

    // Core actions
    loadChatHistory,
    saveChatState,
    loadChatState,
    deleteChat,

    // Enhanced actions
    updateChatMetadata,
    searchChats,
    getRecentChats,
    exportChats,
    importChats,
    getStorageInfo,
    cleanupOldChats,
    createAutoSave,

    // Utility
    clearError: () => setError(null),
  };
};

export default useChatHistory;
