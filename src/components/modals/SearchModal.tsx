import React, { useState, useMemo } from 'react';
import { Search, X, TrendingUp, MapPin } from 'lucide-react';
import { posts, trendingTopics } from '../../data';
import type { Post } from '../../types';

export function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'posts' | 'topics'>('all');

  const searchResults = useMemo(() => {
    if (!searchQuery) return [];
    
    const query = searchQuery.toLowerCase();
    return posts.filter(post => 
      post.title.toLowerCase().includes(query) ||
      post.topics?.some(topic => topic.toLowerCase().includes(query)) ||
      post.location?.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const filteredTopics = useMemo(() => {
    if (!searchQuery) return trendingTopics;
    return trendingTopics.filter(topic => 
      topic.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      <div className="sticky top-0 bg-white z-10">
        <div className="p-4">
          <div className="flex items-center space-x-3 mb-4">
            <div className="flex-1 flex items-center bg-gray-100 rounded-full px-4 py-2">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="搜索你感兴趣的内容"
                className="flex-1 ml-2 bg-transparent outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button onClick={onClose} className="text-gray-500">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex space-x-4 border-b">
            {[
              { id: 'all', label: '全部' },
              { id: 'posts', label: '笔记' },
              { id: 'topics', label: '话题' }
            ].map((tab) => (
              <button
                key={tab.id}
                className={`pb-2 px-2 ${
                  activeTab === tab.id
                    ? 'text-red-500 border-b-2 border-red-500'
                    : 'text-gray-500'
                }`}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4">
        {!searchQuery ? (
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <TrendingUp className="w-5 h-5 text-red-500" />
              <h3 className="font-medium">热门话题</h3>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {trendingTopics.map((topic) => (
                <button
                  key={topic.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-red-50 transition-colors"
                  onClick={() => setSearchQuery(topic.name)}
                >
                  <span className="text-sm">#{topic.name}</span>
                  <span className="text-xs text-gray-500">{topic.count}万</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {(activeTab === 'all' || activeTab === 'posts') && searchResults.map((post: Post) => (
              <div key={post.id} className="flex space-x-3 p-2 hover:bg-gray-50 rounded-lg">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h4 className="font-medium line-clamp-2">{post.title}</h4>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-4 h-4 rounded-full mr-1"
                    />
                    <span>{post.author.name}</span>
                  </div>
                  {post.location && (
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <MapPin className="w-3 h-3 mr-1" />
                      <span>{post.location}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {(activeTab === 'all' || activeTab === 'topics') && filteredTopics.length > 0 && (
              <div>
                <h3 className="font-medium mb-2">相关话题</h3>
                <div className="flex flex-wrap gap-2">
                  {filteredTopics.map((topic) => (
                    <button
                      key={topic.id}
                      className="px-4 py-2 bg-gray-100 rounded-full text-sm hover:bg-red-50 hover:text-red-500 transition-colors"
                    >
                      #{topic.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {searchResults.length === 0 && filteredTopics.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                没有找到相关内容
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}