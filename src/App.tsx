import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  Bars3Icon,
  SunIcon,
  MoonIcon,
  RocketLaunchIcon,
  LightBulbIcon,
  CodeBracketIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";

// Components
import Sidebar from "./components/sidebar/Sidebar";
import ChatMessages from "./components/chat/ChatMessages";
import ChatInput from "./components/chat/ChatInput";
import ModelSelector from "./components/ModelSelector";
import { ToastProvider } from "./components/Toast";

// Hooks
import {
  useDarkMode,
  useAutoResize,
  useScrollToBottom,
  useChatUI,
} from "./hooks";
import { useChatHistory } from "./hooks/useChatHistory";
import { useToast } from "./hooks/useToast";

// Types
import type { Message, MessageImage, SuggestedPrompt } from "./types/index";

// Add type for window with configureStreaming
declare global {
  interface Window {
    configureStreaming: (config: {
      chunkSize: number;
      displayInterval: number;
    }) => void;
  }
}

const App: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userPreferences] = useState({
    theme: "auto",
    language: "en",
    notifications: true,
  });

  const { darkMode, toggleDarkMode } = useDarkMode();
  const { textareaRef } = useAutoResize(inputValue);
  const { showSuccess, showError } = useToast();

  // ChatUI chat hook
  const {
    messages,
    isLoading,
    currentModel,
    serverStatus,
    currentChatId,
    chatTitle,
    isRestoring,
    setCurrentModel,
    sendMessage,
    stopGeneration,
    clearMessages,
    regenerateLastResponse,
    checkServerStatus,
    configureStreaming,
    initializeNewChat,
    restoreChat,
    getCurrentChatState,
  } = useChatUI();

  // Chat history hook
  const {
    chatHistory,
    error: historyError,
    loadChatState,
    deleteChat,
    createAutoSave,
    clearError,
  } = useChatHistory();

  const { messagesEndRef } = useScrollToBottom([messages]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check server status on mount
  useEffect(() => {
    checkServerStatus();
  }, [checkServerStatus]);

  // Configure streaming for optimal UX
  useEffect(() => {
    configureStreaming({
      chunkSize: 2, // Show every 2 chunks for smooth reading
      displayInterval: 80, // Max 80ms between displays for responsive feel
    });

    // Expose configureStreaming globally for testing (remove in production)
    if (typeof window !== "undefined") {
      window.configureStreaming = configureStreaming;
    }
  }, [configureStreaming]);

  // Handle new chat
  const handleNewChat = useCallback(() => {
    clearMessages();
    setInputValue("");
    setSidebarOpen(false);
    initializeNewChat();
    clearError();
  }, [clearMessages, initializeNewChat, clearError]);

  // Handle chat selection with restore
  const handleSelectChat = useCallback(
    async (chatId: string) => {
      try {
        setSidebarOpen(false);

        // Load chat state
        const chatState = loadChatState(chatId);

        if (chatState) {
          // Restore the complete chat state
          await restoreChat({
            id: chatState.id!,
            title: chatState.title,
            messages: chatState.messages,
            model: chatState.model,
            createdAt: chatState.createdAt,
            updatedAt: chatState.updatedAt,
          });

          showSuccess(`Successfully restored chat: ${chatState.title}`);
        } else {
          showError("Chat not found");
        }
      } catch {
        showError("Failed to restore chat");
      }
    },
    [loadChatState, restoreChat, showSuccess, showError]
  );

  // Handle chat deletion
  const handleDeleteChat = useCallback(
    async (chatId: string) => {
      try {
        await deleteChat(chatId);

        // If we deleted the current chat, start a new one
        if (currentChatId === chatId) {
          handleNewChat();
        }
      } catch {
        showError("Failed to delete chat");
      }
    },
    [deleteChat, currentChatId, handleNewChat, showError]
  );

  // Auto-save chat when messages change
  useEffect(() => {
    if (messages.length > 0) {
      const currentState = getCurrentChatState();
      const cleanup = createAutoSave(currentState);
      return cleanup;
    }
  }, [messages, getCurrentChatState, createAutoSave]);

  const suggestedPrompts: SuggestedPrompt[] = [
    {
      id: "1",
      text: "Explain React hooks with examples",
      icon: <CodeBracketIcon className="w-4 h-4" />,
    },
    {
      id: "2",
      text: "What are the latest web development trends?",
      icon: <RocketLaunchIcon className="w-4 h-4" />,
    },
    {
      id: "3",
      text: "Help me debug this JavaScript error",
      icon: <QuestionMarkCircleIcon className="w-4 h-4" />,
    },
    {
      id: "4",
      text: "Best practices for responsive design",
      icon: <LightBulbIcon className="w-4 h-4" />,
    },
    {
      id: "5",
      text: "How to optimize website performance?",
      icon: <RocketLaunchIcon className="w-4 h-4" />,
    },
    {
      id: "6",
      text: "Explain async/await in JavaScript",
      icon: <CodeBracketIcon className="w-4 h-4" />,
    },
  ];

  const handleSubmit = useCallback(
    async (
      e: React.FormEvent,
      promptText?: string,
      images?: MessageImage[]
    ) => {
      e.preventDefault();
      const messageText = promptText || inputValue;
      if (!messageText.trim() && (!images || images.length === 0)) return;
      if (isLoading) return;

      await sendMessage(messageText, images);
      setInputValue("");

      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    },
    [inputValue, isLoading, sendMessage, textareaRef]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<Element>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        const syntheticEvent = { preventDefault: () => {} } as React.FormEvent;
        handleSubmit(syntheticEvent);
      }
    },
    [handleSubmit]
  );

  const handleLike = useCallback(() => {
    // You can implement feedback storage here
  }, []);

  const handleDislike = useCallback(() => {
    // You can implement feedback storage here
  }, []);

  const handleCopy = useCallback(
    async (content: string) => {
      try {
        await navigator.clipboard.writeText(content);
        showSuccess("Content copied to clipboard");
      } catch {
        showError("Failed to copy content");
      }
    },
    [showSuccess, showError]
  );

  const handlePromptClick = useCallback(
    (prompt: string) => {
      const syntheticEvent = { preventDefault: () => {} } as React.FormEvent;
      handleSubmit(syntheticEvent, prompt);
    },
    [handleSubmit]
  );

  const handleFileUpload = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        const fileNames = Array.from(files)
          .map((file) => file.name)
          .join(", ");

        // For now, just send a message about the files
        const message = `I can see you've uploaded: ${fileNames}. File processing will be implemented in a future update. How can I help you with these files?`;
        const syntheticEvent = { preventDefault: () => {} } as React.FormEvent;
        handleSubmit(syntheticEvent, message);
      }
    },
    [handleSubmit]
  );

  const handleExportChat = useCallback(async () => {
    const chatData = {
      messages,
      timestamp: new Date().toISOString(),
      theme: darkMode ? "dark" : "light",
      model: currentModel,
      preferences: userPreferences,
    };

    const blob = new Blob([JSON.stringify(chatData, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `chatui-export-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [messages, darkMode, currentModel, userPreferences]);

  const handleShareChat = useCallback(async () => {
    if (navigator.share && messages.length > 0) {
      try {
        await navigator.share({
          title: "ChatUI Conversation",
          text: `Check out this AI conversation:\
\
${messages
  .map((m: Message) => `${m.type}: ${m.content}`)
  .join(
    "\
\
"
  )}`,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Error sharing:", err);
        handleCopy(
          messages
            .map((m: Message) => `${m.type}: ${m.content}`)
            .join(
              "\
\
"
            )
        );
      }
    } else {
      // Fallback to copy
      handleCopy(
        messages
          .map((m: Message) => `${m.type}: ${m.content}`)
          .join(
            "\
\
"
          )
      );
    }
  }, [messages, handleCopy]);

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <ToastProvider />
      <div className="flex h-screen bg-white dark:bg-neutral-900 text-gray-900 dark:text-white">
        {/* Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          darkMode={darkMode}
          chatHistory={chatHistory}
          onNewChat={handleNewChat}
          onToggleDarkMode={toggleDarkMode}
          onSelectChat={handleSelectChat}
          onDeleteChat={handleDeleteChat}
          onExportChat={handleExportChat}
          onShareChat={handleShareChat}
          onUpgrade={() => console.log("Upgrade clicked")}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col lg:ml-0">
          {/* Mobile Header */}
          <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-800 transition-colors"
            >
              <Bars3Icon className="w-5 h-5" />
            </button>
            <div className="flex-1 text-center">
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                {isRestoring ? "Restoring..." : chatTitle}
              </h1>
              {currentChatId && (
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {messages.length} messages
                </div>
              )}
            </div>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-800 transition-colors"
            >
              {darkMode ? (
                <SunIcon className="w-5 h-5" />
              ) : (
                <MoonIcon className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Error Display */}
          {historyError && (
            <div className="mx-4 mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="text-sm text-red-700 dark:text-red-300">
                  {historyError}
                </div>
                <button
                  onClick={clearError}
                  className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                >
                  ×
                </button>
              </div>
            </div>
          )}

          {/* Model Selector */}
          <div className="p-4 border-b border-gray-200 dark:border-neutral-700">
            <ModelSelector
              currentModel={currentModel}
              onModelChange={setCurrentModel}
              serverStatus={serverStatus}
            />
          </div>

          {/* Messages Area */}
          <ChatMessages
            messages={messages}
            isLoading={isLoading}
            suggestedPrompts={suggestedPrompts}
            messagesEndRef={messagesEndRef}
            onPromptClick={handlePromptClick}
            // onLike={handleLike}
            // onDislike={handleDislike}
            onCopy={handleCopy}
            // onShare={(messageId) => {
            //   const message = messages.find((m: Message) => m.id === messageId);
            //   if (message) handleCopy(message.content);
            // }}
            onRegenerate={() => regenerateLastResponse()}
            onStopGeneration={stopGeneration}
            darkMode={darkMode}
          />

          {/* Input Area */}
          <ChatInput
            value={inputValue}
            onChange={setInputValue}
            onSubmit={(e, images) => handleSubmit(e, undefined, images)}
            onKeyDown={handleKeyDown}
            isLoading={isLoading}
            textareaRef={textareaRef}
            onFileUpload={handleFileUpload}
            onVoiceInput={() => console.log("Voice input not implemented yet")}
            currentModel={currentModel}
          />

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileChange}
            className="hidden"
            accept=".txt,.pdf,.doc,.docx,.jpg,.png,.gif"
          />
        </div>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default App;
