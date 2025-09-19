"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

interface User {
  id: number
  ngoName: string
  email: string
  location: string
  causeAreas: string[]
  isAuthenticated: boolean
}

interface AuthContextType {
  user: User | null
  login: (userData: User) => void
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing user session
    const storedUser = localStorage.getItem("ngoUser")
    if (storedUser) {
      const userData = JSON.parse(storedUser)
      if (userData.isAuthenticated) {
        setUser(userData)
      }
    }
    setIsLoading(false)
  }, [])

  const login = (userData: User) => {
    setUser(userData)
    localStorage.setItem("ngoUser", JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("ngoUser")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
