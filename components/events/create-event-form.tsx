"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar, MapPin, Users, Clock, Tag } from "lucide-react"

const skillOptions = [
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
  "Cooking",
  "Childcare",
]

export function CreateEventForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    volunteersNeeded: "",
    requiredSkills: [] as string[],
    description: "",
    duration: "",
    contactEmail: "",
    specialInstructions: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSkillChange = (skill: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      requiredSkills: checked ? [...prev.requiredSkills, skill] : prev.requiredSkills.filter((s) => s !== skill),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Store event data in localStorage for demo purposes
    const existingEvents = JSON.parse(localStorage.getItem("events") || "[]")
    const newEvent = {
      id: Date.now(),
      ...formData,
      volunteersNeeded: Number.parseInt(formData.volunteersNeeded),
      volunteersRegistered: 0,
      status: "active",
      createdAt: new Date().toISOString(),
    }

    existingEvents.push(newEvent)
    localStorage.setItem("events", JSON.stringify(existingEvents))

    setIsLoading(false)
    router.push("/dashboard")
  }

  return (
    <Card className="border-border bg-card shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-foreground font-sans">Event Details</CardTitle>
        <CardDescription className="text-secondary font-mono">
          Fill in the information about your volunteer event
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Event Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-foreground font-mono flex items-center space-x-2">
              <Tag className="h-4 w-4" />
              <span>Event Title *</span>
            </Label>
            <Input
              id="title"
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              className="bg-input border-border focus:ring-primary"
              placeholder="e.g., Community Garden Cleanup"
            />
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="text-foreground font-mono flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>Date *</span>
              </Label>
              <Input
                id="date"
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                className="bg-input border-border focus:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time" className="text-foreground font-mono flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>Start Time *</span>
              </Label>
              <Input
                id="time"
                type="time"
                required
                value={formData.time}
                onChange={(e) => setFormData((prev) => ({ ...prev, time: e.target.value }))}
                className="bg-input border-border focus:ring-primary"
              />
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location" className="text-foreground font-mono flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>Location *</span>
            </Label>
            <Input
              id="location"
              type="text"
              required
              value={formData.location}
              onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
              className="bg-input border-border focus:ring-primary"
              placeholder="e.g., Central Park, 123 Main St, or Virtual Event"
            />
          </div>

          {/* Volunteers Needed and Duration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="volunteersNeeded" className="text-foreground font-mono flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>Volunteers Needed *</span>
              </Label>
              <Input
                id="volunteersNeeded"
                type="number"
                min="1"
                required
                value={formData.volunteersNeeded}
                onChange={(e) => setFormData((prev) => ({ ...prev, volunteersNeeded: e.target.value }))}
                className="bg-input border-border focus:ring-primary"
                placeholder="e.g., 15"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration" className="text-foreground font-mono">
                Duration
              </Label>
              <Input
                id="duration"
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData((prev) => ({ ...prev, duration: e.target.value }))}
                className="bg-input border-border focus:ring-primary"
                placeholder="e.g., 3 hours, Half day"
              />
            </div>
          </div>

          {/* Required Skills */}
          <div className="space-y-3">
            <Label className="text-foreground font-mono">Required Skills</Label>
            <p className="text-sm text-secondary">Select the skills that would be helpful for this event</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {skillOptions.map((skill) => (
                <div key={skill} className="flex items-center space-x-2">
                  <Checkbox
                    id={skill}
                    checked={formData.requiredSkills.includes(skill)}
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

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-foreground font-mono">
              Event Description *
            </Label>
            <Textarea
              id="description"
              required
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              className="bg-input border-border focus:ring-primary"
              placeholder="Describe what volunteers will be doing, what to expect, and any important details..."
              rows={4}
            />
          </div>

          {/* Contact Email */}
          <div className="space-y-2">
            <Label htmlFor="contactEmail" className="text-foreground font-mono">
              Contact Email
            </Label>
            <Input
              id="contactEmail"
              type="email"
              value={formData.contactEmail}
              onChange={(e) => setFormData((prev) => ({ ...prev, contactEmail: e.target.value }))}
              className="bg-input border-border focus:ring-primary"
              placeholder="coordinator@ngo.org"
            />
          </div>

          {/* Special Instructions */}
          <div className="space-y-2">
            <Label htmlFor="specialInstructions" className="text-foreground font-mono">
              Special Instructions
            </Label>
            <Textarea
              id="specialInstructions"
              value={formData.specialInstructions}
              onChange={(e) => setFormData((prev) => ({ ...prev, specialInstructions: e.target.value }))}
              className="bg-input border-border focus:ring-primary"
              placeholder="What should volunteers bring? Any special requirements or preparation needed?"
              rows={3}
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground py-3 text-lg font-semibold"
              disabled={isLoading}
            >
              {isLoading ? "Publishing Event..." : "Publish Event"}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1 py-3 text-lg border-2 bg-transparent"
              onClick={() => router.push("/dashboard")}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
