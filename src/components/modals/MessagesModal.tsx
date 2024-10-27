import React from 'react';
import { Bell, MessageCircle, Heart, User } from 'lucide-react';

export function MessagesModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white z-50">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-medium">消息中心</h2>
          <button onClick={onClose} className="text-gray-500">关闭</button>
        </div>

        <div className="flex-1 overflow-auto">
          <div className="grid grid-cols-2 gap-px bg-gray-100 mb-4">
            <button className="flex flex-col items-center bg-white p-4">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-2">
                <Bell className="w-6 h-6 text-red-500" />
              </div>
              <span className="text-sm">系统通知</span>
            </button>
            <button className="flex flex-col items-center bg-white p-4">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-2">
                <Heart className="w-6 h-6 text-red-500" />
              </div>
              <span className="text-sm">赞和收藏</span>
            </button>
            <button className="flex flex-col items-center bg-white p-4">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-2">
                <MessageCircle className="w-6 h-6 text-red-500" />
              </div>
              <span className="text-sm">评论</span>
            </button>
            <button className="flex flex-col items-center bg-white p-4">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-2">
                <User className="w-6 h-6 text-red-500" />
              </div>
              <span className="text-sm">新增关注</span>
            </button>
          </div>

          <div className="px-4">
            <h3 className="font-medium mb-4">私信</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-gray-200" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">用户{i}</h4>
                      <span className="text-xs text-gray-500">昨天</span>
                    </div>
                    <p className="text-sm text-gray-500 truncate">这是最新的一条消息...</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}