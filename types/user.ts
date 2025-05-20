export interface User {
  id: string;
  name: string;
  email: string;
  role: 'editor' | 'client' | 'admin';
  avatar?: string;
  color?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
