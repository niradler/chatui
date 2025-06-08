import React from 'react';
import type { Message } from '../../types/index';
import MarkdownRenderer from './MarkdownRenderer';
import {
  HandThumbUpIcon,
  HandThumbDownIcon,
  DocumentDuplicateIcon,
  ShareIcon,
  ArrowPathIcon,
  ChatBubbleLeftRightIcon,
  PhotoIcon,
  ClockIcon,
  StopIcon,
} from '@heroicons/react/24/outline';

interface MessageBubbleProps {
  message: Message;
  onLike: (messageId: string) => void;
  onDislike: (messageId: string) => void;
  onCopy: (content: string) => void;
  onShare?: (messageId: string) => void;
  onRegenerate?: (messageId: string) => void;
  onStopGeneration?: () => void;
  darkMode?: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  onLike,
  onDislike,
  onCopy,
  onShare,
  onRegenerate,
  onStopGeneration,
  darkMode = false,
}) => {
  const formatTimestamp = (timestamp: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(timestamp);
  };

  const hasImages = message.images && message.images.length > 0;
  const isMarkdown = message.contentType === 'markdown' || 
    message.content.includes('```') || 
    message.content.includes('# ') || 
    message.content.includes('## ') ||
    message.content.includes('**') ||
    message.content.includes('*') ||
    message.content.includes('- ') ||
    message.content.includes('1. ') ||
    message.content.includes('> ') ||
    message.content.includes('`');

  return (
    <div className="flex gap-4 max-w-4xl mx-auto">
      {message.type === 'assistant' && (
        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
          <ChatBubbleLeftRightIcon className="w-4 h-4 text-white" />
        </div>
      )}
      
      <div className={`flex-1 ${message.type === 'user' ? 'ml-auto max-w-2xl' : ''}`}>
        {message.type === 'user' && (
          <div className="flex items-center gap-2 mb-2 justify-end">
            <span className="text-sm text-gray-600 dark:text-neutral-400">You</span>
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">U</span>
            </div>
          </div>
        )}
        
        {/* Message Images */}
        {hasImages && (
          <div className="mb-3">
            <div className="flex items-center gap-2 mb-2">
              <PhotoIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {message.images!.length} image{message.images!.length > 1 ? 's' : ''}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {message.images!.map((image) => (
                <div
                  key={image.id}
                  className="relative group rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700"
                >
                  <img
                    src={image.url}
                    alt={image.file.name}
                    className="w-full h-20 object-cover cursor-pointer"
                    onClick={() => {
                      const previewWindow = window.open('', '_blank');
                      if (previewWindow) {
                        previewWindow.document.write(`
                          <html>
                            <head>
                              <title>Image Preview - ${image.file.name}</title>
                              <style>
                                body { margin: 0; padding: 20px; background: #000; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
                                img { max-width: 100%; max-height: 100%; object-fit: contain; border-radius: 8px; }
                              </style>
                            </head>
                            <body>
                              <img src="${image.url}" alt="${image.file.name}" />
                            </body>
                          </html>
                        `);
                        previewWindow.document.close();
                      }
                    }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-1">
                    <p className="text-xs truncate">{image.file.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Message Content */}
        <div className={`${
          message.type === 'user' 
            ? 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 p-4 rounded-xl ml-auto' 
            : ''
        }`}>
          {message.isLoading && !message.content ? (
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-gray-600"></div>
              <span>Thinking...</span>
            </div>
          ) : (
            <div className="relative">
              {isMarkdown ? (
                <MarkdownRenderer 
                  content={message.content} 
                  darkMode={darkMode}
                  className={message.type === 'user' ? 'prose-sm' : ''}
                />
              ) : (
                <p className="text-gray-800 dark:text-neutral-200 whitespace-pre-wrap leading-relaxed">
                  {message.content}
                </p>
              )}
              {/* Streaming cursor indicator */}
              {message.isLoading && message.content && (
                <span className="inline-block w-0.5 h-5 bg-blue-600 dark:bg-blue-400 ml-1 animate-pulse" style={{ animation: 'pulse 1s infinite' }} />
              )}
            </div>
          )}
        </div>

        {/* Message Metadata */}
        {message.metadata && (message.metadata.model || message.metadata.processingTime) && (
          <div className="flex items-center gap-3 mt-2 text-xs text-gray-500 dark:text-gray-400">
            {message.metadata.model && (
              <span className="flex items-center gap-1">
                <ChatBubbleLeftRightIcon className="w-3 h-3" />
                {message.metadata.model}
              </span>
            )}
            {message.metadata.processingTime && (
              <span className="flex items-center gap-1">
                <ClockIcon className="w-3 h-3" />
                {message.metadata.processingTime}ms
              </span>
            )}
          </div>
        )}

        {/* Timestamp */}
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {formatTimestamp(message.timestamp)}
          </span>
        </div>

        {/* Action Buttons */}
        {message.type === 'assistant' && (
          <div className="flex items-center gap-2 mt-4">
            {/* Stop button for streaming messages */}
            {message.isLoading && message.content && onStopGeneration && (
              <button
                onClick={onStopGeneration}
                className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-sm rounded-lg transition-colors flex items-center gap-1"
                title="Stop generation"
              >
                <StopIcon className="w-4 h-4" />
                Stop
              </button>
            )}
            
            {/* Regular action buttons (only when not loading) */}
            {!message.isLoading && (
              <>
                <div className="flex border border-gray-200 dark:border-neutral-700 rounded-full p-0.5">
                  <button 
                    onClick={() => onLike(message.id)}
                    className={`p-2 rounded-full transition-colors ${
                      message.liked 
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                        : 'hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-500 dark:text-neutral-400'
                    }`}
                    title="Like this response"
                  >
                    <HandThumbUpIcon className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => onDislike(message.id)}
                    className={`p-2 rounded-full transition-colors ${
                      message.disliked 
                        ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' 
                        : 'hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-500 dark:text-neutral-400'
                    }`}
                    title="Dislike this response"
                  >
                    <HandThumbDownIcon className="w-4 h-4" />
                  </button>
                </div>
                <button 
                  onClick={() => onCopy(message.content)}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 text-gray-500 dark:text-neutral-400 transition-colors"
                  title="Copy to clipboard"
                >
                  <DocumentDuplicateIcon className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => onShare?.(message.id)}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 text-gray-500 dark:text-neutral-400 transition-colors" 
                  title="Share"
                >
                  <ShareIcon className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => onRegenerate?.(message.id)}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 text-gray-500 dark:text-neutral-400 transition-colors" 
                  title="Regenerate response"
                >
                  <ArrowPathIcon className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
