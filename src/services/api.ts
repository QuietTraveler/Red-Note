import type { Post, Comment, User } from '../types';

// API configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

// API response types
interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

// Error handling
class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

// Generic fetch wrapper with error handling
async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(response.status, data.message || 'An error occurred');
  }

  return data;
}

// Posts API
export const postsApi = {
  // Get all posts with pagination
  getPosts: (page = 1, limit = 20) =>
    fetchApi<Post[]>(`/posts?page=${page}&limit=${limit}`),

  // Get single post by ID
  getPost: (id: string) => 
    fetchApi<Post>(`/posts/${id}`),

  // Create new post
  createPost: (post: Omit<Post, 'id'>) =>
    fetchApi<Post>('/posts', {
      method: 'POST',
      body: JSON.stringify(post),
    }),

  // Update post
  updatePost: (id: string, updates: Partial<Post>) =>
    fetchApi<Post>(`/posts/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    }),

  // Delete post
  deletePost: (id: string) =>
    fetchApi<void>(`/posts/${id}`, {
      method: 'DELETE',
    }),

  // Like/unlike post
  toggleLike: (id: string) =>
    fetchApi<{ liked: boolean }>(`/posts/${id}/like`, {
      method: 'POST',
    }),

  // Save/unsave post
  toggleSave: (id: string) =>
    fetchApi<{ saved: boolean }>(`/posts/${id}/save`, {
      method: 'POST',
    }),
};

// Comments API
export const commentsApi = {
  // Get comments for a post
  getComments: (postId: string, page = 1, limit = 20) =>
    fetchApi<Comment[]>(`/posts/${postId}/comments?page=${page}&limit=${limit}`),

  // Create comment
  createComment: (postId: string, content: string) =>
    fetchApi<Comment>(`/posts/${postId}/comments`, {
      method: 'POST',
      body: JSON.stringify({ content }),
    }),

  // Delete comment
  deleteComment: (postId: string, commentId: string) =>
    fetchApi<void>(`/posts/${postId}/comments/${commentId}`, {
      method: 'DELETE',
    }),

  // Like/unlike comment
  toggleCommentLike: (postId: string, commentId: string) =>
    fetchApi<{ liked: boolean }>(
      `/posts/${postId}/comments/${commentId}/like`,
      { method: 'POST' }
    ),
};

// User API
export const userApi = {
  // Get user profile
  getProfile: () => 
    fetchApi<User>('/user/profile'),

  // Update user profile
  updateProfile: (updates: Partial<User>) =>
    fetchApi<User>('/user/profile', {
      method: 'PATCH',
      body: JSON.stringify(updates),
    }),

  // Follow/unfollow user
  toggleFollow: (userId: string) =>
    fetchApi<{ following: boolean }>(`/user/${userId}/follow`, {
      method: 'POST',
    }),

  // Get user's posts
  getUserPosts: (userId: string, page = 1, limit = 20) =>
    fetchApi<Post[]>(`/user/${userId}/posts?page=${page}&limit=${limit}`),

  // Get user's saved posts
  getSavedPosts: (page = 1, limit = 20) =>
    fetchApi<Post[]>(`/user/saved-posts?page=${page}&limit=${limit}`),
};