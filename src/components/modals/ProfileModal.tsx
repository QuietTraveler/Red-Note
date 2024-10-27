import React, { useState } from 'react';
import { Settings, BookMarked, Heart, Clock, Share2, ArrowLeft, Grid, BookOpen } from 'lucide-react';
import { posts } from '../../data';
import { Post } from '../Post';

const userProfile = {
  id: '1',
  name: '小红薯',
  redBookId: 'XHS123456',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
  background: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
  stats: {
    following: 238,
    followers: 1024,
    likes: 12345
  }
};

export function ProfileModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<'posts' | 'collections' | 'likes'>('posts');
  const [showShareMenu, setShowShareMenu] = useState(false);

  const userPosts = posts.slice(0, 3); // Simulate user's posts
  const collections = posts.slice(3, 5); // Simulate collections
  const likedPosts = posts.slice(2, 4); // Simulate liked posts

  if (!isOpen) return null;

  const renderContent = () => {
    switch (activeTab) {
      case 'posts':
        return (
          <div className="columns-2 gap-4">
            {userPosts.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </div>
        );
      case 'collections':
        return (
          <div className="columns-2 gap-4">
            {collections.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </div>
        );
      case 'likes':
        return (
          <div className="columns-2 gap-4">
            {likedPosts.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <div className="relative h-48">
          <img
            src={userProfile.background}
            alt="Profile background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent" />
          <div className="absolute top-4 left-4">
            <button 
              onClick={onClose} 
              className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
          </div>
          <button 
            className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors text-white"
            onClick={() => {
              // Open settings modal
            }}
          >
            <Settings className="w-6 h-6" />
          </button>
        </div>

        {/* Profile Info */}
        <div className="relative px-4 pb-4 -mt-16">
          <div className="text-center">
            <div className="w-24 h-24 rounded-full mx-auto mb-2 border-4 border-white overflow-hidden">
              <img
                src={userProfile.avatar}
                alt={userProfile.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="font-medium text-lg">{userProfile.name}</h2>
            <p className="text-sm text-gray-500">小红书号：{userProfile.redBookId}</p>
          </div>

          {/* Stats */}
          <div className="flex justify-around my-6">
            <button className="text-center hover:opacity-75 transition-opacity">
              <div className="font-medium">{userProfile.stats.following}</div>
              <div className="text-sm text-gray-500">关注</div>
            </button>
            <button className="text-center hover:opacity-75 transition-opacity">
              <div className="font-medium">{userProfile.stats.followers}</div>
              <div className="text-sm text-gray-500">粉丝</div>
            </button>
            <button className="text-center hover:opacity-75 transition-opacity">
              <div className="font-medium">{userProfile.stats.likes}</div>
              <div className="text-sm text-gray-500">获赞与收藏</div>
            </button>
          </div>

          {/* Quick Actions */}
          <div className="flex justify-center space-x-2 mb-6">
            <button className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors">
              编辑资料
            </button>
            <button 
              className="p-2 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
              onClick={() => setShowShareMenu(!showShareMenu)}
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>

          {/* Share Menu */}
          {showShareMenu && (
            <div className="absolute right-4 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-10">
              {['微信', '微博', 'QQ', '复制链接'].map((option) => (
                <button
                  key={option}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors"
                  onClick={() => {
                    // Handle share action
                    setShowShareMenu(false);
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          {/* Tabs */}
          <div className="flex border-b">
            <button
              className={`flex-1 pb-2 text-center ${
                activeTab === 'posts'
                  ? 'text-red-500 border-b-2 border-red-500'
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('posts')}
            >
              <Grid className="w-5 h-5 mx-auto mb-1" />
              <span className="text-sm">笔记</span>
            </button>
            <button
              className={`flex-1 pb-2 text-center ${
                activeTab === 'collections'
                  ? 'text-red-500 border-b-2 border-red-500'
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('collections')}
            >
              <BookMarked className="w-5 h-5 mx-auto mb-1" />
              <span className="text-sm">收藏</span>
            </button>
            <button
              className={`flex-1 pb-2 text-center ${
                activeTab === 'likes'
                  ? 'text-red-500 border-b-2 border-red-500'
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('likes')}
            >
              <Heart className="w-5 h-5 mx-auto mb-1" />
              <span className="text-sm">点赞</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 px-4 py-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}