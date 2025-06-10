import React from "react";
import { PlusIcon } from "@heroicons/react/24/outline";

interface SidebarFooterProps {
  onNewChat: () => void;
}

const SidebarFooter: React.FC<SidebarFooterProps> = ({ onNewChat }) => {
  return (
    <div className="p-4 border-t border-gray-200 dark:border-neutral-700">
      <button
        onClick={onNewChat}
        className="w-full flex items-center justify-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-neutral-300 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors border border-gray-200 dark:border-neutral-700"
      >
        <PlusIcon className="w-4 h-4" />
        New Chat
      </button>
    </div>
  );
};

export default SidebarFooter;
