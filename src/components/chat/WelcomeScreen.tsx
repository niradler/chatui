import React from 'react';
import type { SuggestedPrompt } from '../../types/index';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

interface WelcomeScreenProps {
  suggestedPrompts: SuggestedPrompt[];
  onPromptClick: (prompt: string) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ suggestedPrompts, onPromptClick }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      <div className="text-center py-12 max-w-2xl">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <ChatBubbleLeftRightIcon className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">
          Welcome to AI Assistant
        </h1>
        <p className="text-gray-600 dark:text-neutral-400 mb-8 text-lg">
          Your intelligent companion for coding, learning, and problem-solving
        </p>
        
        {/* Suggested Prompts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-4xl mx-auto">
          {suggestedPrompts.map((prompt) => (
            <button
              key={prompt.id}
              onClick={() => onPromptClick(prompt.text)}
              className="flex items-center gap-3 p-4 text-left border border-gray-200 dark:border-neutral-700 rounded-xl hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors group"
            >
              <div className="text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300">
                {prompt.icon}
              </div>
              <span className="text-sm text-gray-700 dark:text-neutral-300">
                {prompt.text}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
