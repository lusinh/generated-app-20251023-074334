export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
export interface Lead {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: number; // epoch millis
}