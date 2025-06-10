import React, { useState } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import type { ChatHistory } from "../../types/index";

interface ChatHistoryListProps {
  chatHistory: ChatHistory[];
  onSelectChat?: (chatId: string) => void;
  onDeleteChat?: (chatId: string) => void;
}

const formatTime = (date: Date) => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  return date.toLocaleDateString();
};

const ChatHistoryList: React.FC<ChatHistoryListProps> = ({
  chatHistory,
  onSelectChat,
  onDeleteChat,
}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(
    null
  );
  const [hoveredChat, setHoveredChat] = useState<string | null>(null);

  const handleDeleteClick = (e: React.MouseEvent, chatId: string) => {
    e.stopPropagation();
    setShowDeleteConfirm(chatId);
  };

  const confirmDelete = (e: React.MouseEvent, chatId: string) => {
    e.stopPropagation();
    onDeleteChat?.(chatId);
    setShowDeleteConfirm(null);
  };

  const cancelDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDeleteConfirm(null);
  };

  if (chatHistory.length === 0) {
    return (
      <div className="px-3 py-6 text-center">
        <div className="text-gray-500 dark:text-neutral-400 text-sm">
          No conversations yet
        </div>
        <div className="text-xs text-gray-400 dark:text-neutral-500 mt-1">
          Start a new chat to see your history here
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-1">
      <h3 className="text-xs font-semibold text-gray-500 dark:text-neutral-400 uppercase tracking-wider mb-3 px-3">
        Recent Conversations
      </h3>
      {chatHistory.map((chat) => (
        <div
          key={chat.id}
          className="relative group"
          onMouseEnter={() => setHoveredChat(chat.id)}
          onMouseLeave={() => setHoveredChat(null)}
        >
          {showDeleteConfirm === chat.id ? (
            // Delete confirmation
            <div className="px-3 py-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <div className="text-xs text-red-700 dark:text-red-300 mb-2">
                Delete this conversation?
              </div>
              <div className="flex gap-2">
                <button
                  onClick={(e) => confirmDelete(e, chat.id)}
                  className="px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
                <button
                  onClick={cancelDelete}
                  className="px-2 py-1 text-xs bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            // Regular chat item
            <div
              onClick={() => onSelectChat?.(chat.id)}
              className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-neutral-300 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors group flex items-start justify-between cursor-pointer"
            >
              <div className="flex-1 min-w-0 pr-2">
                <div className="truncate font-medium text-sm">{chat.title}</div>
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-neutral-500 mt-1">
                  <span>{formatTime(chat.timestamp)}</span>
                  {chat.messageCount && (
                    <>
                      <span>•</span>
                      <span>{chat.messageCount} messages</span>
                    </>
                  )}
                </div>
              </div>

              {/* Delete button */}
              {hoveredChat === chat.id && onDeleteChat && (
                <button
                  onClick={(e) => handleDeleteClick(e, chat.id)}
                  className="flex-shrink-0 p-1 text-gray-400 hover:text-red-500 dark:text-neutral-500 dark:hover:text-red-400 transition-colors"
                  title="Delete conversation"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ChatHistoryList;
