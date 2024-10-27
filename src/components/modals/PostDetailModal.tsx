import React, { useState, useEffect } from 'react';
import { X, Heart, MessageCircle, Bookmark, Share2, ChevronLeft, ChevronRight, MapPin, Send } from 'lucide-react';
import { Post as PostType } from '../../types';

interface PostDetailModalProps {
  post: PostType | null;
  isOpen: boolean;
  onClose: () => void;
}

interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  likes: number;
  timestamp: string;
  replies?: Comment[];
}

// Mock comments data
const mockComments: Comment[] = [
  {
    id: '1',
    author: {
      name: '美食达人',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
    },
    content: '看起来太美味了！请问具体位置在哪里呢？',
    likes: 42,
    timestamp: '2小时前',
    replies: [
      {
        id: '1-1',
        author: {
          name: '店主回复',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
        },
        content: '我们在静安区南京西路888号，欢迎来品尝！',
        likes: 12,
        timestamp: '1小时前'
      }
    ]
  },
  {
    id: '2',
    author: {
      name: '摄影爱好者',
      avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
    },
    content: '构图很棒，请问用的什么相机拍摄的呀？',
    likes: 28,
    timestamp: '3小时前'
  }
];

export function PostDetailModal({ post, isOpen, onClose }: PostDetailModalProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<Comment[]>(mockComments);

  useEffect(() => {
    if (post) {
      setLikes(post.likes);
      setCurrentImageIndex(0);
    }
  }, [post]);

  if (!isOpen || !post) return null;

  const images = post.images || [post.image];

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleCommentSubmit = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: {
        name: '我',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
      },
      content: newComment,
      likes: 0,
      timestamp: '刚刚'
    };

    setComments(prev => [comment, ...prev]);
    setNewComment('');
  };

  const CommentItem = ({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) => (
    <div className={`flex space-x-3 ${!isReply ? 'mb-4' : 'mt-3 ml-12'}`}>
      <img
        src={comment.author.avatar}
        alt={comment.author.name}
        className="w-8 h-8 rounded-full flex-shrink-0"
      />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <span className="font-medium text-sm">{comment.author.name}</span>
          <span className="text-xs text-gray-500">{comment.timestamp}</span>
        </div>
        <p className="text-sm mt-1">{comment.content}</p>
        <div className="flex items-center space-x-4 mt-2">
          <button className="text-xs text-gray-500 hover:text-red-500 transition-colors">回复</button>
          <button className="flex items-center space-x-1 group">
            <Heart className="w-4 h-4 text-gray-400 group-hover:text-red-500 transition-colors" />
            <span className="text-xs text-gray-500 group-hover:text-red-500 transition-colors">
              {comment.likes}
            </span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-4xl rounded-xl overflow-hidden relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-black/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid md:grid-cols-2">
            <div className="relative aspect-square bg-black">
              <img 
                src={images[currentImageIndex]} 
                alt={post.title}
                className="w-full h-full object-contain"
              />
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImageIndex(prev => Math.max(0, prev - 1))}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full text-white hover:bg-black/60 transition-colors disabled:opacity-50"
                    disabled={currentImageIndex === 0}
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => setCurrentImageIndex(prev => Math.min(images.length - 1, prev + 1))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full text-white hover:bg-black/60 transition-colors disabled:opacity-50"
                    disabled={currentImageIndex === images.length - 1}
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="flex flex-col h-[600px]">
              {/* Header */}
              <div className="p-6 border-b">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h3 className="font-medium">{post.author.name}</h3>
                      <p className="text-xs text-gray-500">原创作者</p>
                    </div>
                  </div>
                  <button className="px-4 py-1.5 border border-red-500 text-red-500 rounded-full text-sm hover:bg-red-50 transition-colors">
                    关注
                  </button>
                </div>

                <h2 className="text-xl font-medium mb-4">{post.title}</h2>

                {post.location && (
                  <div className="flex items-center text-gray-500 text-sm mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{post.location}</span>
                  </div>
                )}

                {post.topics && (
                  <div className="flex flex-wrap gap-2">
                    {post.topics.map((topic, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-red-50 hover:text-red-500 transition-colors cursor-pointer"
                      >
                        #{topic}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Comments */}
              <div className="flex-1 overflow-y-auto p-6">
                {comments.map(comment => (
                  <div key={comment.id}>
                    <CommentItem comment={comment} />
                    {comment.replies?.map(reply => (
                      <CommentItem key={reply.id} comment={reply} isReply />
                    ))}
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="p-6 border-t">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-6">
                    <button 
                      onClick={handleLike}
                      className="flex items-center space-x-2 group"
                    >
                      <Heart 
                        className={`w-6 h-6 ${
                          isLiked ? 'fill-red-500 text-red-500' : 'group-hover:text-red-500'
                        } transition-colors`}
                      />
                      <span className={`${
                        isLiked ? 'text-red-500' : 'text-gray-600 group-hover:text-red-500'
                      } transition-colors`}>
                        {likes}
                      </span>
                    </button>
                    <button className="flex items-center space-x-2 group">
                      <MessageCircle className="w-6 h-6 group-hover:text-red-500 transition-colors" />
                      <span className="text-gray-600 group-hover:text-red-500 transition-colors">
                        {comments.length}
                      </span>
                    </button>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setIsBookmarked(!isBookmarked)}
                      className="group"
                    >
                      <Bookmark 
                        className={`w-6 h-6 ${
                          isBookmarked ? 'fill-red-500 text-red-500' : 'group-hover:text-red-500'
                        } transition-colors`}
                      />
                    </button>
                    <button className="group">
                      <Share2 className="w-6 h-6 group-hover:text-red-500 transition-colors" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="说点什么..."
                    className="flex-1 px-4 py-2 bg-gray-100 rounded-full outline-none focus:ring-2 focus:ring-red-500/20"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleCommentSubmit()}
                  />
                  <button
                    onClick={handleCommentSubmit}
                    disabled={!newComment.trim()}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors disabled:text-gray-400 disabled:hover:bg-transparent"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}