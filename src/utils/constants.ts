// API endpoints
export const API_ENDPOINTS = {
  POSTS: '/posts',
  COMMENTS: '/comments',
  USERS: '/users',
  AUTH: '/auth',
};

// Image upload
export const UPLOAD_CONFIG = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  MAX_FILES: 9,
  ACCEPTED_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
};

// Cache
export const CACHE_CONFIG = {
  POST_CACHE_TIME: 5 * 60 * 1000, // 5 minutes
  USER_CACHE_TIME: 30 * 60 * 1000, // 30 minutes
};

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: '网络错误，请检查网络连接',
  SERVER_ERROR: '服务器错误，请稍后重试',
  UNAUTHORIZED: '请先登录',
  FORBIDDEN: '没有权限执行此操作',
  NOT_FOUND: '资源不存在',
  VALIDATION_ERROR: '输入数据有误',
};

// Validation
export const VALIDATION = {
  POST_TITLE_MAX_LENGTH: 100,
  COMMENT_MAX_LENGTH: 500,
  USERNAME_MIN_LENGTH: 3,
  USERNAME_MAX_LENGTH: 20,
  PASSWORD_MIN_LENGTH: 8,
};

// Routes
export const ROUTES = {
  HOME: '/',
  PROFILE: '/profile',
  POST: '/post/:id',
  SETTINGS: '/settings',
  LOGIN: '/login',
  REGISTER: '/register',
};