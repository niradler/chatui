import React from "react";
import type { ChatHistory } from "../../types/index";
import SidebarHeader from "./SidebarHeader";
import SidebarNavigation from "./SidebarNavigation";
import ChatHistoryList from "./ChatHistoryList";
import SidebarFooter from "./SidebarFooter";

interface SidebarProps {
  isOpen: boolean;
  darkMode: boolean;
  chatHistory: ChatHistory[];
  onNewChat: () => void;
  onToggleDarkMode: () => void;
  onSelectChat?: (chatId: string) => void;
  onDeleteChat?: (chatId: string) => void;
  onExportChat?: () => void;
  onShareChat?: () => void;
  onUpgrade?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  darkMode,
  chatHistory,
  onNewChat,
  onToggleDarkMode,
  onSelectChat,
  onDeleteChat,
  onExportChat,
  onShareChat,
}) => {
  return (
    <div
      className={`
      fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-neutral-900 border-r border-gray-200 dark:border-neutral-700 transform transition-transform duration-300 ease-in-out
      ${isOpen ? "translate-x-0" : "-translate-x-full"}
      lg:translate-x-0 lg:static lg:inset-0
    `}
    >
      <div className="flex flex-col h-full">
        <SidebarHeader darkMode={darkMode} toggleDarkMode={onToggleDarkMode} />

        <div className="flex-1 overflow-y-auto scrollbar-thin p-4">
          <SidebarNavigation
            onExportChat={onExportChat}
            onShareChat={onShareChat}
          />

          <div className="mt-6">
            <ChatHistoryList
              chatHistory={chatHistory}
              onSelectChat={onSelectChat}
              onDeleteChat={onDeleteChat}
            />
          </div>
        </div>

        <SidebarFooter onNewChat={onNewChat} />
      </div>
    </div>
  );
};

export default Sidebar;
