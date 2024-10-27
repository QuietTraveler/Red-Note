// User related types
export interface User {
  id: string;
  name: string;
  avatar: string;
  redBookId: string;
  bio?: string;
  following: number;
  followers: number;
  likes: number;
  isFollowing?: boolean;
}

// Post related types
export interface Post {
  id: string;
  title: string;
  content?: string;
  image: string;
  images?: string[];
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  likes: number;
  comments: number;
  location?: string;
  topics?: string[];
  isLiked?: boolean;
  isSaved?: boolean;
  createdAt: string;
  updatedAt?: string;
}

// Comment related types
export interface Comment {
  id: string;
  postId: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  likes: number;
  isLiked?: boolean;
  createdAt: string;
  updatedAt?: string;
  replies?: Comment[];
  parentId?: string;
}

// Topic related types
export interface Topic {
  id: string;
  name: string;
  count: number;
  isFollowing?: boolean;
}

// Pagination types
export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Error types
export interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
}