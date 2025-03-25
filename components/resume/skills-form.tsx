"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Plus } from "lucide-react"

export function SkillsForm({ data, updateData }) {
  const [skills, setSkills] = useState(data || [])
  const [newSkill, setNewSkill] = useState("")

  useEffect(() => {
    setSkills(data || [])
  }, [data])

  const addSkill = () => {
    if (newSkill.trim() !== "" && !skills.includes(newSkill.trim())) {
      const updatedSkills = [...skills, newSkill.trim()]
      setSkills(updatedSkills)
      updateData(updatedSkills)
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove) => {
    const updatedSkills = skills.filter((skill) => skill !== skillToRemove)
    setSkills(updatedSkills)
    updateData(updatedSkills)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addSkill()
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Skills</h2>

      <div className="space-y-2">
        <Label htmlFor="new-skill">Add Skills</Label>
        <div className="flex gap-2">
          <Input
            id="new-skill"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter a skill (e.g., JavaScript, Project Management)"
          />
          <Button type="button" onClick={addSkill} className="gap-1">
            <Plus className="h-4 w-4" /> Add
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          {skills.length === 0 ? (
            <p className="text-center text-muted-foreground">No skills added yet</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="gap-1 px-2 py-1">
                  {skill}
                  <button type="button" onClick={() => removeSkill(skill)} className="ml-1 rounded-full hover:bg-muted">
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove {skill}</span>
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

