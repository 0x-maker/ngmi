"use client"

import { useState, useEffect, FormEvent, ChangeEvent } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { RequestSuggestionButton, ContentSuggestionCard } from '@/components/ai/content-suggestion'
import { useAI } from '@/hooks/useAI'
import { ContentSuggestion } from '@/lib/ai-service'

interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  summary: string;
  website: string;
  linkedin: string;
}

interface PersonalInfoFormProps {
  data: PersonalInfo;
  updateData: (data: PersonalInfo) => void;
}

export function PersonalInfoForm({ data, updateData }: PersonalInfoFormProps) {
  const [formData, setFormData] = useState<PersonalInfo>(data)
  const [summarySuggestion, setSummarySuggestion] = useState<ContentSuggestion | null>(null)
  const { getContentSuggestions, isLoadingSuggestions } = useAI()

  useEffect(() => {
    setFormData(data)
  }, [data])

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev: PersonalInfo) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    updateData(formData)
  }

  const handleRequestSummarySuggestion = async () => {
    if (!formData.summary.trim()) {
      // Can't suggest improvements for empty text
      return
    }
    
    const result = await getContentSuggestions(formData.summary, 'summary')
    if (result) {
      setSummarySuggestion(result)
    }
  }
  
  const handleAcceptSuggestion = (improved: string) => {
    setFormData((prev: PersonalInfo) => ({
      ...prev,
      summary: improved
    }))
    setSummarySuggestion(null)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold">Personal Information</h2>
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john.doe@example.com"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="(123) 456-7890" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input id="address" name="address" value={formData.address} onChange={handleChange} placeholder="City, State" />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="website">Website (Optional)</Label>
          <Input
            id="website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            placeholder="www.johndoe.com"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn (Optional)</Label>
          <Input
            id="linkedin"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            placeholder="linkedin.com/in/johndoe"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="summary">Professional Summary</Label>
        <Textarea
          id="summary"
          name="summary"
          value={formData.summary}
          onChange={handleChange}
          placeholder="Brief overview of your professional background and key strengths"
          className="min-h-[100px]"
        />
        <div className="flex justify-end mt-1">
          <RequestSuggestionButton
            onClick={handleRequestSummarySuggestion}
            loading={isLoadingSuggestions}
          />
        </div>
        
        {summarySuggestion && (
          <ContentSuggestionCard
            suggestion={summarySuggestion}
            onAccept={handleAcceptSuggestion}
            onReject={() => setSummarySuggestion(null)}
            loading={isLoadingSuggestions}
          />
        )}
      </div>
      <Button type="submit">Save</Button>
    </form>
  )
}

