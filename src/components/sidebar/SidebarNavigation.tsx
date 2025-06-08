import React from 'react';
import {
  PlusIcon,
  ArrowDownTrayIcon,
  ShareIcon,
} from '@heroicons/react/24/outline';

interface SidebarNavigationProps {
  onNewChat: () => void;
  onExportChat?: () => void;
  onShareChat?: () => void;
}

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({
  onNewChat,
  onExportChat,
  onShareChat,
}) => {
  return (
    <div className="space-y-4">
      <button 
        onClick={onNewChat}
        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-neutral-300 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors border border-gray-200 dark:border-neutral-700"
      >
        <PlusIcon className="w-4 h-4" />
        New Chat
      </button>

      {/* Quick Actions */}
      <div className="pt-4 border-t border-gray-200 dark:border-neutral-700">
        <h3 className="text-xs font-semibold text-gray-500 dark:text-neutral-400 uppercase tracking-wider mb-3 px-3">
          Quick Actions
        </h3>
        <div className="space-y-1">
          <button 
            onClick={onExportChat}
            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-neutral-300 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <ArrowDownTrayIcon className="w-4 h-4" />
            Export Chat
          </button>
          <button 
            onClick={onShareChat}
            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-neutral-300 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <ShareIcon className="w-4 h-4" />
            Share Conversation
          </button>
        </div>
      </div>
    </div>
  );
};

export default SidebarNavigation;
