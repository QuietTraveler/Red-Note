import React, { createContext, useContext, useState, useCallback } from 'react';
import type { Post, PaginationParams } from '../types';
import { postsApi } from '../services/api';

interface PostContextType {
  posts: Post[];
  loading: boolean;
  error: Error | null;
  selectedPost: Post | null;
  hasMore: boolean;
  setSelectedPost: (post: Post | null) => void;
  loadPosts: (params?: PaginationParams) => Promise<void>;
  addPost: (post: Omit<Post, 'id'>) => Promise<void>;
  updatePost: (id: string, updates: Partial<Post>) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  toggleLike: (id: string) => Promise<void>;
  toggleSave: (id: string) => Promise<void>;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export function PostProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const loadPosts = useCallback(async (params?: PaginationParams) => {
    try {
      setLoading(true);
      setError(null);
      const response = await postsApi.getPosts(params?.page || page);
      setPosts(prev => params?.page === 1 ? response.data : [...prev, ...response.data]);
      setHasMore(response.data.length > 0);
      setPage(prev => prev + 1);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load posts'));
    } finally {
      setLoading(false);
    }
  }, [page]);

  const addPost = useCallback(async (post: Omit<Post, 'id'>) => {
    try {
      const response = await postsApi.createPost(post);
      setPosts(prev => [response.data, ...prev]);
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to create post');
    }
  }, []);

  const updatePost = useCallback(async (id: string, updates: Partial<Post>) => {
    try {
      const response = await postsApi.updatePost(id, updates);
      setPosts(prev => prev.map(post => 
        post.id === id ? { ...post, ...response.data } : post
      ));
      if (selectedPost?.id === id) {
        setSelectedPost({ ...selectedPost, ...response.data });
      }
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to update post');
    }
  }, [selectedPost]);

  const deletePost = useCallback(async (id: string) => {
    try {
      await postsApi.deletePost(id);
      setPosts(prev => prev.filter(post => post.id !== id));
      if (selectedPost?.id === id) {
        setSelectedPost(null);
      }
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to delete post');
    }
  }, [selectedPost]);

  const toggleLike = useCallback(async (id: string) => {
    try {
      const response = await postsApi.toggleLike(id);
      setPosts(prev => prev.map(post => {
        if (post.id === id) {
          return {
            ...post,
            isLiked: response.data.liked,
            likes: response.data.liked ? post.likes + 1 : post.likes - 1,
          };
        }
        return post;
      }));
      if (selectedPost?.id === id) {
        setSelectedPost(prev => prev && {
          ...prev,
          isLiked: response.data.liked,
          likes: response.data.liked ? prev.likes + 1 : prev.likes - 1,
        });
      }
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to toggle like');
    }
  }, [selectedPost]);

  const toggleSave = useCallback(async (id: string) => {
    try {
      const response = await postsApi.toggleSave(id);
      setPosts(prev => prev.map(post => {
        if (post.id === id) {
          return { ...post, isSaved: response.data.saved };
        }
        return post;
      }));
      if (selectedPost?.id === id) {
        setSelectedPost(prev => prev && {
          ...prev,
          isSaved: response.data.saved,
        });
      }
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to toggle save');
    }
  }, [selectedPost]);

  return (
    <PostContext.Provider value={{
      posts,
      loading,
      error,
      selectedPost,
      hasMore,
      setSelectedPost,
      loadPosts,
      addPost,
      updatePost,
      deletePost,
      toggleLike,
      toggleSave,
    }}>
      {children}
    </PostContext.Provider>
  );
}

export function usePost() {
  const context = useContext(PostContext);
  if (context === undefined) {
    throw new Error('usePost must be used within a PostProvider');
  }
  return context;
}