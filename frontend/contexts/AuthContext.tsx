'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react'
import { User, LoadingState } from '@/lib/types'
import { apiClient } from '@/lib/api'

interface AuthContextType {
  user: User | null
  loading: LoadingState
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<LoadingState>({
    isLoading: true,
    error: null,
  })

  const checkAuthStatus = async () => {
    try {
      setLoading({ isLoading: true, error: null })
      const token = localStorage.getItem('token')
      if (!token) {
        setUser(null)
        apiClient.logout(null)
        setLoading({ isLoading: false, error: null })
        return
      }
      const userData = await apiClient.getProfile(token)
      setUser(userData)
    } catch (error: any) {
      if (error.status === 401) {
        apiClient.logout(null)
      }
      setUser(null)
    } finally {
      setLoading({ isLoading: false, error: null })
    }
  }

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      setLoading({ isLoading: true, error: null })
      const response = await apiClient.login(email, password)
      const token = response.token
      localStorage.setItem('token', token)
      if (response.user) {
        setUser(response.user)
      } else {
        // If user data is not in login response, fetch it
        const userData = await apiClient.getProfile(token)
        setUser(userData)
      }
    } catch (error: any) {
      setLoading({ isLoading: false, error: error.message })
      throw error
    } finally {
      setLoading({ isLoading: false, error: null })
    }
  }

  const register = async (name: string, email: string, password: string) => {
    try {
      setLoading({ isLoading: true, error: null })
      const response = await apiClient.register(name, email, password)
      const token = response.token
      localStorage.setItem('token', token)

      if (response.user) {
        setUser(response.user)
      } else {
        const userData = await apiClient.getProfile(token)
        setUser(userData)
      }
    } catch (error: any) {
      setLoading({ isLoading: false, error: error.message })
      throw error
    } finally {
      setLoading({ isLoading: false, error: null })
    }
  }

  const logout = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) await apiClient.logout(null)
      else await apiClient.logout(token)
    } catch (error) {
      // Manejo de error opcional
    } finally {
      setUser(null)
      localStorage.removeItem('token')
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
