import { useState } from 'react'

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<{ email: string; name: string } | null>(null)

  const signIn = async (email: string, password: string) => {
    console.log('Sign in:', email, password)
    setIsAuthenticated(true)
    setUser({ email, name: 'User Name' })
  }

  const signUp = async (name: string, email: string, password: string) => {
    console.log('Sign up:', name, email, password)
    setIsAuthenticated(true)
    setUser({ email, name })
  }

  const signOut = () => {
    setIsAuthenticated(false)
    setUser(null)
  }

  const socialAuth = async (provider: string) => {
    console.log('Social auth:', provider)
  }

  return {
    isAuthenticated,
    user,
    signIn,
    signUp,
    signOut,
    socialAuth
  }
}
