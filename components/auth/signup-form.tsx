"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Upload, Eye, EyeOff } from "lucide-react"
import Link from "next/link"

const causeAreas = [
  "Education",
  "Healthcare",
  "Environment",
  "Poverty Alleviation",
  "Animal Welfare",
  "Human Rights",
  "Disaster Relief",
  "Community Development",
  "Arts & Culture",
  "Technology for Good",
]

export function SignUpForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    ngoName: "",
    email: "",
    password: "",
    confirmPassword: "",
    location: "",
    causeAreas: [] as string[],
    logo: null as File | null,
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleCauseAreaChange = (causeArea: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      causeAreas: checked ? [...prev.causeAreas, causeArea] : prev.causeAreas.filter((area) => area !== causeArea),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Store user data in localStorage for demo purposes
    localStorage.setItem(
      "ngoUser",
      JSON.stringify({
        id: Date.now(),
        ngoName: formData.ngoName,
        email: formData.email,
        location: formData.location,
        causeAreas: formData.causeAreas,
        isAuthenticated: true,
      }),
    )

    setIsLoading(false)
    router.push("/dashboard")
  }

  return (
    <Card className="border-border bg-card shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-foreground font-sans">Create NGO Account</CardTitle>
        <CardDescription className="text-secondary font-mono">
          Fill in your organization details to get started
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* NGO Name */}
          <div className="space-y-2">
            <Label htmlFor="ngoName" className="text-foreground font-mono">
              NGO Name *
            </Label>
            <Input
              id="ngoName"
              type="text"
              required
              value={formData.ngoName}
              onChange={(e) => setFormData((prev) => ({ ...prev, ngoName: e.target.value }))}
              className="bg-input border-border focus:ring-primary"
              placeholder="Enter your organization name"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground font-mono">
              Email Address *
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

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location" className="text-foreground font-mono">
              Location *
            </Label>
            <Input
              id="location"
              type="text"
              required
              value={formData.location}
              onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
              className="bg-input border-border focus:ring-primary"
              placeholder="City, Country"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-foreground font-mono">
              Password *
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                className="bg-input border-border focus:ring-primary pr-10"
                placeholder="Create a strong password"
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

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-foreground font-mono">
              Confirm Password *
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              required
              value={formData.confirmPassword}
              onChange={(e) => setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
              className="bg-input border-border focus:ring-primary"
              placeholder="Confirm your password"
            />
          </div>

          {/* Cause Areas */}
          <div className="space-y-3">
            <Label className="text-foreground font-mono">Cause Areas *</Label>
            <p className="text-sm text-secondary">Select the areas your NGO focuses on (select at least one)</p>
            <div className="grid grid-cols-2 gap-3">
              {causeAreas.map((area) => (
                <div key={area} className="flex items-center space-x-2">
                  <Checkbox
                    id={area}
                    checked={formData.causeAreas.includes(area)}
                    onCheckedChange={(checked) => handleCauseAreaChange(area, checked as boolean)}
                    className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <Label htmlFor={area} className="text-sm text-foreground font-mono cursor-pointer">
                    {area}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Logo Upload */}
          <div className="space-y-2">
            <Label htmlFor="logo" className="text-foreground font-mono">
              Organization Logo (Optional)
            </Label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors duration-200">
              <Upload className="h-8 w-8 text-secondary mx-auto mb-2" />
              <p className="text-sm text-secondary font-mono">Click to upload or drag and drop</p>
              <p className="text-xs text-muted-foreground">PNG, JPG up to 2MB</p>
              <Input
                id="logo"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setFormData((prev) => ({ ...prev, logo: e.target.files?.[0] || null }))}
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 text-lg font-semibold"
            disabled={isLoading || formData.causeAreas.length === 0}
          >
            {isLoading ? "Creating Account..." : "Create NGO Account"}
          </Button>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-secondary font-mono">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:text-primary/80 font-semibold">
                Sign in here
              </Link>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
