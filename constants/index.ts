export const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://nuxt-todo-service.onrender.com'
    : 'http://localhost:3001';

export const GENERIC_ERROR = 'Something went wrong';

export const TASKS_ENDPOINT = '/tasks';
