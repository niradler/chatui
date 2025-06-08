import React from 'react';
import {
  ChatBubbleLeftRightIcon,
  SunIcon,
  MoonIcon,
} from '@heroicons/react/24/outline';

interface SidebarHeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ darkMode, toggleDarkMode }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-neutral-700">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
          <ChatBubbleLeftRightIcon className="w-5 h-5 text-white" />
        </div>
        <span className="font-semibold text-gray-900 dark:text-white">AI Assistant</span>
      </div>
      <button
        onClick={toggleDarkMode}
        className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-800 transition-colors"
        title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      >
        {darkMode ? <SunIcon className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
      </button>
    </div>
  );
};

export default SidebarHeader;
