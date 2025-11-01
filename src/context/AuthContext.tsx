"use client"

import React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { authService } from "../services/authService"
import type { AuthContextType, AuthUser } from "../types/auth"

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  // Initialize auth from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem("auth_token")
      const storedUser = localStorage.getItem("auth_user")

      if (storedToken && storedUser) {
        try {
          setToken(storedToken)
          setUser(JSON.parse(storedUser))
          console.log("[v0] Auth restored from localStorage")
        } catch (error) {
          console.log("[v0] Error restoring auth:", error)
          localStorage.removeItem("auth_token")
          localStorage.removeItem("auth_user")
        }
      }

      setLoading(false)
    }

    initializeAuth()
  }, [])

  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      const response = await authService.login(email, password)
      const { token: newToken, user: newUser } = response

      setToken(newToken)
      setUser(newUser)

      localStorage.setItem("auth_token", newToken)
      localStorage.setItem("auth_user", JSON.stringify(newUser))
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signup = async (email: string, password: string) => {
    setLoading(true)
    try {
      const response = await authService.signup(email, password)
      const { token: newToken, user: newUser } = response

      setToken(newToken)
      setUser(newUser)

      localStorage.setItem("auth_token", newToken)
      localStorage.setItem("auth_user", JSON.stringify(newUser))
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem("auth_token")
    localStorage.removeItem("auth_user")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        signup,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
