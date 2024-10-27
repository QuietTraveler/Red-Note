import React, { useState } from 'react';
import { Search, PlusSquare } from 'lucide-react';
import { SearchModal } from './modals/SearchModal';
import { CreatePostModal } from './modals/CreatePostModal';
import { ProfileModal } from './modals/ProfileModal';

export function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
        <div className="max-w-screen-xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-red-500">小红书</h1>
            <div className="flex items-center space-x-6">
              <button 
                className="hover:text-red-500 transition-colors"
                onClick={() => setSearchOpen(true)}
              >
                <Search className="w-6 h-6" />
              </button>
              <button 
                className="hover:text-red-500 transition-colors"
                onClick={() => setCreateOpen(true)}
              >
                <PlusSquare className="w-6 h-6" />
              </button>
              <button 
                className="w-8 h-8 rounded-full bg-gray-200 hover:ring-2 hover:ring-red-500 transition-all"
                onClick={() => setProfileOpen(true)}
              />
            </div>
          </div>
        </div>
      </nav>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <CreatePostModal isOpen={createOpen} onClose={() => setCreateOpen(false)} />
      <ProfileModal isOpen={profileOpen} onClose={() => setProfileOpen(false)} />
    </>
  );
}