"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff } from "lucide-react"
import Link from "next/link"

export function LoginForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Demo login - check if user exists in localStorage
    const existingUser = localStorage.getItem("ngoUser")
    if (existingUser) {
      const userData = JSON.parse(existingUser)
      if (userData.email === formData.email) {
        // Update authentication status
        localStorage.setItem(
          "ngoUser",
          JSON.stringify({
            ...userData,
            isAuthenticated: true,
          }),
        )
        setIsLoading(false)
        router.push("/dashboard")
        return
      }
    }

    // For demo purposes, allow any email/password combination
    localStorage.setItem(
      "ngoUser",
      JSON.stringify({
        id: Date.now(),
        ngoName: "Demo NGO",
        email: formData.email,
        location: "Demo City",
        causeAreas: ["Education", "Healthcare"],
        isAuthenticated: true,
      }),
    )

    setIsLoading(false)
    router.push("/dashboard")
  }

  return (
    <Card className="border-border bg-card shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-foreground font-sans">Sign In</CardTitle>
        <CardDescription className="text-secondary font-mono">
          Enter your credentials to access your NGO dashboard
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
              <p className="text-destructive text-sm font-mono">{error}</p>
            </div>
          )}

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground font-mono">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              className="bg-input border-border focus:ring-primary"
              placeholder="organization@example.com"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-foreground font-mono">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                className="bg-input border-border focus:ring-primary pr-10"
                placeholder="Enter your password"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <Link href="/forgot-password" className="text-sm text-primary hover:text-primary/80 font-mono">
              Forgot your password?
            </Link>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 text-lg font-semibold"
            disabled={isLoading}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-secondary font-mono">
              Don't have an account?{" "}
              <Link href="/signup" className="text-primary hover:text-primary/80 font-semibold">
                Sign up here
              </Link>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
