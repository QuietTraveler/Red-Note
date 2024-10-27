import React, { useState } from 'react';
import { Heart, MessageCircle, Bookmark, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Post as PostType } from '../types';
import { usePost } from '../context/PostContext';

export function Post({ post }: { post: PostType }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { setSelectedPost } = usePost();

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  const images = post.images || [post.image];

  return (
    <div 
      className="break-inside-avoid mb-4 cursor-pointer group"
      onClick={() => setSelectedPost(post)}
    >
      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
        <div className="relative">
          <img 
            src={images[currentImageIndex]} 
            alt={post.title} 
            className="w-full aspect-[3/4] object-cover group-hover:opacity-95 transition-opacity" 
          />
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(prev => Math.max(0, prev - 1));
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-1 bg-black/50 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"
                disabled={currentImageIndex === 0}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(prev => Math.min(images.length - 1, prev + 1));
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 bg-black/50 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"
                disabled={currentImageIndex === images.length - 1}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
                {images.map((_, index) => (
                  <div
                    key={index}
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
          {post.location && (
            <div className="absolute bottom-2 left-2 flex items-center bg-black/50 text-white text-xs px-2 py-1 rounded-full">
              <MapPin className="w-3 h-3 mr-1" />
              <span className="truncate max-w-[150px]">{post.location}</span>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-medium text-gray-900 text-sm leading-snug mb-3 group-hover:text-red-500 line-clamp-2">
            {post.title}
          </h3>
          {post.topics && (
            <div className="flex flex-wrap gap-1 mb-3">
              {post.topics.map((topic, index) => (
                <span key={index} className="text-xs text-gray-500 hover:text-red-500 transition-colors">
                  #{topic}
                </span>
              ))}
            </div>
          )}
          <div className="flex items-center justify-between">
            <button 
              className="flex items-center space-x-2 group/author"
              onClick={(e) => {
                e.stopPropagation();
                // Handle author profile click
              }}
            >
              <img 
                src={post.author.avatar} 
                alt={post.author.name} 
                className="w-6 h-6 rounded-full group-hover/author:ring-2 group-hover/author:ring-red-500 transition-all" 
              />
              <span className="text-sm text-gray-600 group-hover/author:text-red-500 transition-colors truncate max-w-[100px]">
                {post.author.name}
              </span>
            </button>
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleLike}
                className="flex items-center space-x-1 group/btn"
              >
                <Heart 
                  className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : 'group-hover/btn:text-red-500'} transition-colors`} 
                />
                <span className={`text-xs ${isLiked ? 'text-red-500' : 'text-gray-500 group-hover/btn:text-red-500'} transition-colors`}>
                  {likes}
                </span>
              </button>
              <button 
                className="flex items-center space-x-1 group/btn"
                onClick={(e) => e.stopPropagation()}
              >
                <MessageCircle className="w-4 h-4 group-hover/btn:text-red-500 transition-colors" />
                <span className="text-xs text-gray-500 group-hover/btn:text-red-500 transition-colors">
                  {post.comments}
                </span>
              </button>
              <button 
                onClick={handleBookmark}
                className="group/btn"
              >
                <Bookmark 
                  className={`w-4 h-4 ${isBookmarked ? 'fill-red-500 text-red-500' : 'group-hover/btn:text-red-500'} transition-colors`} 
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}