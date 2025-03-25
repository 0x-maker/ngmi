"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Trash2, ChevronUp, ChevronDown } from "lucide-react"
import { RequestSuggestionButton, ContentSuggestionCard } from '@/components/ai/content-suggestion'
import { AchievementFormatter } from '@/components/ai/achievement-formatter'
import { useAI } from '@/hooks/useAI'
import { ContentSuggestion } from '@/lib/ai-service'

interface Experience {
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface ExperienceFormProps {
  data: Experience[];
  updateData: (data: Experience[]) => void;
}

export function ExperienceForm({ data, updateData }: ExperienceFormProps) {
  const [experiences, setExperiences] = useState<Experience[]>(data || [])
  const [suggestions, setSuggestions] = useState<{[key: number]: ContentSuggestion}>({})
  const [showAchievementFormatter, setShowAchievementFormatter] = useState<number | null>(null)
  const { getContentSuggestions, isLoadingSuggestions } = useAI()

  useEffect(() => {
    updateData(experiences)
  }, [experiences, updateData])

  const addExperience = () => {
    setExperiences([
      ...experiences,
      { company: "", position: "", location: "", startDate: "", endDate: "", description: "" },
    ])
  }

  const updateExperience = (index: number, field: keyof Experience, value: string) => {
    const updatedExperiences = [...experiences]
    updatedExperiences[index] = { ...updatedExperiences[index], [field]: value }
    setExperiences(updatedExperiences)
  }

  const removeExperience = (index: number) => {
    const filteredExperiences = experiences.filter((_, i) => i !== index)
    setExperiences(filteredExperiences)
    updateData(filteredExperiences)
  }

  const moveExperience = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === experiences.length - 1)
    ) {
      return
    }

    const updatedExperiences = [...experiences]
    const targetIndex = direction === "up" ? index - 1 : index + 1
    const temp = updatedExperiences[index]
    updatedExperiences[index] = updatedExperiences[targetIndex]
    updatedExperiences[targetIndex] = temp
    setExperiences(updatedExperiences)
    updateData(updatedExperiences)
  }

  const handleRequestSuggestion = async (index: number) => {
    const experience = experiences[index]
    if (!experience.description.trim()) {
      // Can't suggest improvements for empty text
      return
    }
    
    const result = await getContentSuggestions(experience.description, 'experience')
    if (result) {
      setSuggestions(prev => ({ ...prev, [index]: result }))
    }
  }
  
  const handleAcceptSuggestion = (index: number, improved: string) => {
    const newExperiences = [...experiences]
    newExperiences[index] = {
      ...newExperiences[index],
      description: improved
    }
    setExperiences(newExperiences)
    
    setSuggestions(prev => {
      const newSuggestions = { ...prev }
      delete newSuggestions[index]
      return newSuggestions
    })
  }
  
  const handleSelectAchievement = (index: number, achievement: string) => {
    const newExperiences = [...experiences]
    const currentDescription = newExperiences[index].description
    newExperiences[index] = {
      ...newExperiences[index],
      description: currentDescription 
        ? `${currentDescription}\n• ${achievement}`
        : `• ${achievement}`
    }
    setExperiences(newExperiences)
  }

  return (
    <div className="space-y-4">
      {experiences.map((experience, index) => (
        <Card key={index} className="relative">
          <div className="absolute right-2 top-2 flex space-x-1">
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={() => moveExperience(index, "up")}
              disabled={index === 0}
            >
              <ChevronUp className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={() => moveExperience(index, "down")}
              disabled={index === experiences.length - 1}
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={() => removeExperience(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <CardContent className="pt-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor={`company-${index}`}>Company</Label>
                <Input
                  id={`company-${index}`}
                  value={experience.company}
                  onChange={(e) => updateExperience(index, "company", e.target.value)}
                  placeholder="Company name"
                />
              </div>
              <div>
                <Label htmlFor={`position-${index}`}>Position</Label>
                <Input
                  id={`position-${index}`}
                  value={experience.position}
                  onChange={(e) => updateExperience(index, "position", e.target.value)}
                  placeholder="Your title"
                />
              </div>
              <div>
                <Label htmlFor={`location-${index}`}>Location</Label>
                <Input
                  id={`location-${index}`}
                  value={experience.location}
                  onChange={(e) => updateExperience(index, "location", e.target.value)}
                  placeholder="City, State or Remote"
                />
              </div>
              <div>
                <Label htmlFor={`startDate-${index}`}>Start Date</Label>
                <Input
                  id={`startDate-${index}`}
                  value={experience.startDate}
                  onChange={(e) => updateExperience(index, "startDate", e.target.value)}
                  placeholder="MM/YYYY"
                />
              </div>
              <div>
                <Label htmlFor={`endDate-${index}`}>End Date</Label>
                <Input
                  id={`endDate-${index}`}
                  value={experience.endDate}
                  onChange={(e) => updateExperience(index, "endDate", e.target.value)}
                  placeholder="MM/YYYY or Present"
                />
              </div>
              <div className="mt-4 space-y-2 sm:col-span-2">
                <Label htmlFor={`description-${index}`}>Description</Label>
                <div className="relative">
                  <textarea
                    id={`description-${index}`}
                    placeholder="Describe your responsibilities and achievements..."
                    value={experience.description}
                    onChange={(e) => {
                      updateExperience(index, "description", e.target.value);
                    }}
                    className="w-full px-3 py-2 border rounded-md resize-vertical min-h-[100px]"
                  />
                  
                  <div className="flex justify-between mt-1">
                    <button
                      type="button"
                      onClick={() => setShowAchievementFormatter(showAchievementFormatter === index ? null : index)}
                      className="text-xs text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300"
                    >
                      {showAchievementFormatter === index ? 'Hide Achievement Helper' : 'Enhance Suggestions'}
                    </button>
                    
                    <RequestSuggestionButton
                      onClick={() => handleRequestSuggestion(index)}
                      loading={isLoadingSuggestions}
                    />
                  </div>
                  
                  {suggestions[index] && (
                    <ContentSuggestionCard
                      suggestion={suggestions[index]}
                      onAccept={(improved) => handleAcceptSuggestion(index, improved)}
                      onReject={() => {
                        setSuggestions(prev => {
                          const newSuggestions = { ...prev }
                          delete newSuggestions[index]
                          return newSuggestions
                        })
                      }}
                      loading={isLoadingSuggestions}
                    />
                  )}
                </div>
              </div>

              {showAchievementFormatter === index && (
                <div className="mt-4 sm:col-span-2">
                  <AchievementFormatter 
                    onSelectAchievement={(achievement) => handleSelectAchievement(index, achievement)} 
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
      <Button
        variant="outline"
        className="w-full"
        onClick={addExperience}
      >
        <Plus className="mr-2 h-4 w-4" /> Add Experience
      </Button>
    </div>
  )
}

