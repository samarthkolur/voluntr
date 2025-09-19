"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Search, Filter, X } from "lucide-react"

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
  "Cooking",
  "Childcare",
  "Administration",
  "Social Media",
]

const availabilityOptions = ["Weekdays", "Weekends", "Evenings", "Mornings", "Flexible"]

export function VolunteerFilters() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([])
  const [experienceRange, setExperienceRange] = useState([0])
  const [location, setLocation] = useState("")

  const handleSkillChange = (skill: string, checked: boolean) => {
    setSelectedSkills((prev) => (checked ? [...prev, skill] : prev.filter((s) => s !== skill)))
  }

  const handleAvailabilityChange = (availability: string, checked: boolean) => {
    setSelectedAvailability((prev) => (checked ? [...prev, availability] : prev.filter((a) => a !== availability)))
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedSkills([])
    setSelectedAvailability([])
    setExperienceRange([0])
    setLocation("")
  }

  const hasActiveFilters =
    searchTerm || selectedSkills.length > 0 || selectedAvailability.length > 0 || experienceRange[0] > 0 || location

  return (
    <Card className="border-border bg-card sticky top-24">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-foreground font-sans flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Filters</span>
          </CardTitle>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search */}
        <div className="space-y-2">
          <Label htmlFor="search" className="text-foreground font-mono">
            Search
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-secondary" />
            <Input
              id="search"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-input border-border focus:ring-primary"
              placeholder="Search volunteers..."
            />
          </div>
        </div>

        {/* Location */}
        <div className="space-y-2">
          <Label htmlFor="location" className="text-foreground font-mono">
            Location
          </Label>
          <Input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="bg-input border-border focus:ring-primary"
            placeholder="City, State"
          />
        </div>

        {/* Skills */}
        <div className="space-y-3">
          <Label className="text-foreground font-mono">Skills</Label>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {skills.map((skill) => (
              <div key={skill} className="flex items-center space-x-2">
                <Checkbox
                  id={skill}
                  checked={selectedSkills.includes(skill)}
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

        {/* Availability */}
        <div className="space-y-3">
          <Label className="text-foreground font-mono">Availability</Label>
          <div className="space-y-2">
            {availabilityOptions.map((availability) => (
              <div key={availability} className="flex items-center space-x-2">
                <Checkbox
                  id={availability}
                  checked={selectedAvailability.includes(availability)}
                  onCheckedChange={(checked) => handleAvailabilityChange(availability, checked as boolean)}
                  className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <Label htmlFor={availability} className="text-sm text-foreground font-mono cursor-pointer">
                  {availability}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Experience Level */}
        <div className="space-y-3">
          <Label className="text-foreground font-mono">Minimum Experience: {experienceRange[0]}+ hours</Label>
          <Slider value={experienceRange} onValueChange={setExperienceRange} max={500} step={25} className="w-full" />
          <div className="flex justify-between text-xs text-secondary">
            <span>0h</span>
            <span>500h+</span>
          </div>
        </div>

        {/* Apply Filters Button */}
        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Apply Filters</Button>
      </CardContent>
    </Card>
  )
}
