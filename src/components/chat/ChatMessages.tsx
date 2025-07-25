import React from "react";
import type { Message, SuggestedPrompt } from "../../types/index";
import MessageBubble from "./MessageBubble";
import LoadingIndicator from "./LoadingIndicator";
import WelcomeScreen from "./WelcomeScreen";

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
  suggestedPrompts: SuggestedPrompt[];
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
  onPromptClick: (prompt: string) => void;
  onLike?: (messageId: string) => void;
  onDislike?: (messageId: string) => void;
  onCopy: (content: string) => void;
  onShare?: (messageId: string) => void;
  onRegenerate?: (messageId: string) => void;
  onStopGeneration: () => void;
  darkMode?: boolean;
  showWelcome?: boolean;
  showActions?: boolean;
  showTimestamps?: boolean;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages,
  isLoading,
  suggestedPrompts,
  messagesEndRef,
  onPromptClick,
  onLike,
  onDislike,
  onCopy,
  onShare,
  onRegenerate,
  onStopGeneration,
  darkMode = false,
  showWelcome = true,
  // showActions = true,
  // showTimestamps = false,
}) => {
  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin">
      {messages.length === 0 && showWelcome ? (
        <WelcomeScreen
          suggestedPrompts={suggestedPrompts}
          onPromptClick={onPromptClick}
        />
      ) : messages.length === 0 ? (
        <div className="flex items-center justify-center h-full text-gray-500 dark:text-neutral-400">
          <p>Start a conversation...</p>
        </div>
      ) : (
        <div className="p-4 space-y-6">
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              onLike={onLike}
              onDislike={onDislike}
              onCopy={onCopy}
              onShare={onShare}
              onRegenerate={onRegenerate}
              onStopGeneration={onStopGeneration}
              darkMode={darkMode}
            />
          ))}

          {/* Only show loading indicator if we're loading but don't have a streaming message */}
          {isLoading && !messages.some((msg) => msg.isLoading) && (
            <LoadingIndicator onStop={onStopGeneration} />
          )}

          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  );
};

export default ChatMessages;
