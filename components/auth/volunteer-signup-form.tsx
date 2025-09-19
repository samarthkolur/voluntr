"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Eye, EyeOff } from "lucide-react"
import Link from "next/link"

const skills = [
  "Teaching",
  "Healthcare",
  "Technology",
  "Marketing",
  "Event Planning",
  "Fundraising",
  "Photography",
  "Writing",
  "Translation",
  "Manual Labor",
]

export function VolunteerSignUpForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    location: "",
    skills: [] as string[],
    bio: "",
    availability: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSkillChange = (skill: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      skills: checked ? [...prev.skills, skill] : prev.skills.filter((s) => s !== skill),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Store volunteer data in localStorage for demo purposes
    localStorage.setItem(
      "volunteerUser",
      JSON.stringify({
        id: Date.now(),
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        location: formData.location,
        skills: formData.skills,
        bio: formData.bio,
        availability: formData.availability,
        isAuthenticated: true,
        userType: "volunteer",
      }),
    )

    setIsLoading(false)
    router.push("/volunteer-dashboard")
  }

  return (
    <Card className="border-border bg-card shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-foreground font-sans">Create Volunteer Account</CardTitle>
        <CardDescription className="text-secondary font-mono">
          Join our community of passionate volunteers
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-foreground font-mono">
                First Name *
              </Label>
              <Input
                id="firstName"
                type="text"
                required
                value={formData.firstName}
                onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
                className="bg-input border-border focus:ring-primary"
                placeholder="John"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-foreground font-mono">
                Last Name *
              </Label>
              <Input
                id="lastName"
                type="text"
                required
                value={formData.lastName}
                onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
                className="bg-input border-border focus:ring-primary"
                placeholder="Doe"
              />
            </div>
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
              placeholder="john.doe@example.com"
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

          {/* Skills */}
          <div className="space-y-3">
            <Label className="text-foreground font-mono">Skills & Interests</Label>
            <p className="text-sm text-secondary">Select your skills and areas of interest</p>
            <div className="grid grid-cols-2 gap-3">
              {skills.map((skill) => (
                <div key={skill} className="flex items-center space-x-2">
                  <Checkbox
                    id={skill}
                    checked={formData.skills.includes(skill)}
                    onCheckedChange={(checked) => handleSkillChange(skill, checked as boolean)}
                    className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <Label htmlFor={skill} className="text-sm text-foreground font-mono cursor-pointer">
                    {skill}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <Label htmlFor="bio" className="text-foreground font-mono">
              About You (Optional)
            </Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData((prev) => ({ ...prev, bio: e.target.value }))}
              className="bg-input border-border focus:ring-primary"
              placeholder="Tell us about yourself and why you want to volunteer..."
              rows={3}
            />
          </div>

          {/* Availability */}
          <div className="space-y-2">
            <Label htmlFor="availability" className="text-foreground font-mono">
              Availability
            </Label>
            <Input
              id="availability"
              type="text"
              value={formData.availability}
              onChange={(e) => setFormData((prev) => ({ ...prev, availability: e.target.value }))}
              className="bg-input border-border focus:ring-primary"
              placeholder="e.g., Weekends, Evenings, Flexible"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 text-lg font-semibold"
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Create Volunteer Account"}
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
