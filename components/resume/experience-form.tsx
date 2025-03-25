"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Trash2, ChevronUp, ChevronDown } from "lucide-react"

export function ExperienceForm({ data, updateData }) {
  const [experiences, setExperiences] = useState(data || [])

  useEffect(() => {
    setExperiences(data || [])
  }, [data])

  const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        id: Date.now(),
        company: "",
        position: "",
        location: "",
        startDate: "",
        endDate: "",
        current: false,
        description: "",
      },
    ])
  }

  const updateExperience = (index, field, value) => {
    const updatedExperiences = [...experiences]
    updatedExperiences[index][field] = value
    setExperiences(updatedExperiences)
    updateData(updatedExperiences)
  }

  const removeExperience = (index) => {
    const updatedExperiences = experiences.filter((_, i) => i !== index)
    setExperiences(updatedExperiences)
    updateData(updatedExperiences)
  }

  const moveExperience = (index, direction) => {
    if ((direction === "up" && index === 0) || (direction === "down" && index === experiences.length - 1)) {
      return
    }

    const newIndex = direction === "up" ? index - 1 : index + 1
    const updatedExperiences = [...experiences]
    const temp = updatedExperiences[index]
    updatedExperiences[index] = updatedExperiences[newIndex]
    updatedExperiences[newIndex] = temp

    setExperiences(updatedExperiences)
    updateData(updatedExperiences)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Work Experience</h2>
        <Button onClick={addExperience} size="sm" className="gap-1">
          <Plus className="h-4 w-4" /> Add Experience
        </Button>
      </div>

      {experiences.length === 0 ? (
        <div className="rounded-lg border border-dashed p-6 text-center">
          <p className="text-muted-foreground">No work experience added yet</p>
          <Button onClick={addExperience} variant="outline" className="mt-2">
            Add Experience
          </Button>
        </div>
      ) : (
        experiences.map((experience, index) => (
          <Card key={experience.id || index}>
            <CardContent className="pt-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-medium">Experience {index + 1}</h3>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => moveExperience(index, "up")}
                    disabled={index === 0}
                  >
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => moveExperience(index, "down")}
                    disabled={index === experiences.length - 1}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => removeExperience(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor={`company-${index}`}>Company</Label>
                  <Input
                    id={`company-${index}`}
                    value={experience.company}
                    onChange={(e) => updateExperience(index, "company", e.target.value)}
                    placeholder="Company Name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`position-${index}`}>Position</Label>
                  <Input
                    id={`position-${index}`}
                    value={experience.position}
                    onChange={(e) => updateExperience(index, "position", e.target.value)}
                    placeholder="Job Title"
                  />
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor={`location-${index}`}>Location</Label>
                  <Input
                    id={`location-${index}`}
                    value={experience.location}
                    onChange={(e) => updateExperience(index, "location", e.target.value)}
                    placeholder="City, State"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`startDate-${index}`}>Start Date</Label>
                  <Input
                    id={`startDate-${index}`}
                    value={experience.startDate}
                    onChange={(e) => updateExperience(index, "startDate", e.target.value)}
                    placeholder="MM/YYYY"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`endDate-${index}`}>End Date</Label>
                  <Input
                    id={`endDate-${index}`}
                    value={experience.endDate}
                    onChange={(e) => updateExperience(index, "endDate", e.target.value)}
                    placeholder="MM/YYYY or Present"
                  />
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <Label htmlFor={`description-${index}`}>Description</Label>
                <Textarea
                  id={`description-${index}`}
                  value={experience.description}
                  onChange={(e) => updateExperience(index, "description", e.target.value)}
                  placeholder="Describe your responsibilities and achievements"
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}

