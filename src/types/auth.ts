export interface AuthUser {
    id: string
    email: string
    name?: string
  }
  
  export interface AuthContextType {
    user: AuthUser | null
    token: string | null
    loading: boolean
    login: (email: string, password: string) => Promise<void>
    signup: (email: string, password: string) => Promise<void>
    logout: () => void
    isAuthenticated: boolean
  }
  
  export interface AuthResponse {
    token: string
    user: AuthUser
  }
  