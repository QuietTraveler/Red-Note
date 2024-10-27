import React, { useState } from 'react';
import { Home, Search, PlusSquare, MessageCircle, User } from 'lucide-react';
import { SearchModal } from './modals/SearchModal';
import { CreatePostModal } from './modals/CreatePostModal';
import { MessagesModal } from './modals/MessagesModal';
import { ProfileModal } from './modals/ProfileModal';

const navItems = [
  { icon: Home, label: '首页' },
  { icon: Search, label: '发现' },
  { icon: PlusSquare, label: '发布' },
  { icon: MessageCircle, label: '消息' },
  { icon: User, label: '我' },
];

export function BottomNav() {
  const [activeTab, setActiveTab] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [messagesOpen, setMessagesOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    switch (index) {
      case 1:
        setSearchOpen(true);
        break;
      case 2:
        setCreateOpen(true);
        break;
      case 3:
        setMessagesOpen(true);
        break;
      case 4:
        setProfileOpen(true);
        break;
    }
  };

  const handleModalClose = () => {
    setSearchOpen(false);
    setCreateOpen(false);
    setMessagesOpen(false);
    setProfileOpen(false);
    setActiveTab(0); // Reset to home tab when closing any modal
  };

  return (
    <>
      <div className="fixed bottom-0 w-full bg-white border-t py-2 px-6">
        <div className="flex justify-around items-center max-w-screen-xl mx-auto">
          {navItems.map((item, index) => (
            <button 
              key={index} 
              className={`flex flex-col items-center ${
                activeTab === index ? 'text-red-500' : 'text-gray-600'
              } transition-colors`}
              onClick={() => handleTabClick(index)}
            >
              <item.icon className={`w-6 h-6 ${
                activeTab === index ? 'text-red-500' : 'text-gray-600'
              }`} />
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      <SearchModal isOpen={searchOpen} onClose={handleModalClose} />
      <CreatePostModal isOpen={createOpen} onClose={handleModalClose} />
      <MessagesModal isOpen={messagesOpen} onClose={handleModalClose} />
      <ProfileModal isOpen={profileOpen} onClose={handleModalClose} />
    </>
  );
}