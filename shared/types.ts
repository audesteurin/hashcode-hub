export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
export interface Season {
  id: string;
  title: string;
  description: string;
  seasonNumber: number;
}
export interface Lesson {
  id: string;
  seasonId: string;
  lessonNumber: number;
  title: string;
  content: string;
  likes: number;
}
export interface Comment {
  id: string;
  lessonId: string;
  author: string;
  content: string;
  timestamp: number;
}