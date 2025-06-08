import React from 'react';
import { StopIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

interface LoadingIndicatorProps {
  onStop: () => void;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ onStop }) => {
  return (
    <div className="flex gap-4 max-w-4xl mx-auto">
      <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
        <ChatBubbleLeftRightIcon className="w-4 h-4 text-white" />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
          <span className="text-gray-500 dark:text-neutral-400 text-sm">AI is thinking...</span>
          <button
            onClick={onStop}
            className="ml-auto p-1 rounded border border-gray-300 dark:border-neutral-600 hover:bg-gray-100 dark:hover:bg-neutral-800 text-gray-500 dark:text-neutral-400 text-xs flex items-center gap-1"
          >
            <StopIcon className="w-3 h-3" />
            Stop
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoadingIndicator;
