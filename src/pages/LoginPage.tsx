"use client"

import React from "react"
import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import LoginForm from "../components/LoginForm"
import SignupForm from "../components/SignupForm"
import { LogOut } from "lucide-react"

export default function LoginPage() {
  const [isSignup, setIsSignup] = useState(false)
  const { isAuthenticated, user, logout } = useAuth()

  if (isAuthenticated && user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="bg-gray-900 rounded-lg shadow-xl p-8 max-w-md w-full text-center">
          <h1 className="text-3xl font-bold text-orange-600 mb-4">Welcome Back!</h1>
          <p className="text-gray-300 mb-2">Logged in as</p>
          <p className="text-xl font-semibold text-white mb-6">{user.email}</p>
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-lg shadow-xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-orange-600 text-center mb-2">Star Wars</h1>
        <p className="text-gray-400 text-center mb-8">Character Explorer</p>

        {isSignup ? (
          <>
            <SignupForm onSuccess={() => setIsSignup(false)} />
            <p className="text-center text-gray-400 text-sm mt-6">
              Already have an account?{" "}
              <button onClick={() => setIsSignup(false)} className="text-orange-600 hover:text-orange-500 font-medium">
                Login
              </button>
            </p>
          </>
        ) : (
          <>
            <LoginForm onSuccess={() => {}} />
            <p className="text-center text-gray-400 text-sm mt-6">
              Don&apos;t have an account?{" "}
              <button onClick={() => setIsSignup(true)} className="text-orange-600 hover:text-orange-500 font-medium">
                Sign up
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  )
}
