"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Trash2, ChevronUp, ChevronDown } from "lucide-react"

export function EducationForm({ data, updateData }) {
  const [educations, setEducations] = useState(data || [])

  useEffect(() => {
    setEducations(data || [])
  }, [data])

  const addEducation = () => {
    setEducations([
      ...educations,
      {
        id: Date.now(),
        institution: "",
        degree: "",
        field: "",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ])
  }

  const updateEducation = (index, field, value) => {
    const updatedEducations = [...educations]
    updatedEducations[index][field] = value
    setEducations(updatedEducations)
    updateData(updatedEducations)
  }

  const removeEducation = (index) => {
    const updatedEducations = educations.filter((_, i) => i !== index)
    setEducations(updatedEducations)
    updateData(updatedEducations)
  }

  const moveEducation = (index, direction) => {
    if ((direction === "up" && index === 0) || (direction === "down" && index === educations.length - 1)) {
      return
    }

    const newIndex = direction === "up" ? index - 1 : index + 1
    const updatedEducations = [...educations]
    const temp = updatedEducations[index]
    updatedEducations[index] = updatedEducations[newIndex]
    updatedEducations[newIndex] = temp

    setEducations(updatedEducations)
    updateData(updatedEducations)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Education</h2>
        <Button onClick={addEducation} size="sm" className="gap-1">
          <Plus className="h-4 w-4" /> Add Education
        </Button>
      </div>

      {educations.length === 0 ? (
        <div className="rounded-lg border border-dashed p-6 text-center">
          <p className="text-muted-foreground">No education added yet</p>
          <Button onClick={addEducation} variant="outline" className="mt-2">
            Add Education
          </Button>
        </div>
      ) : (
        educations.map((education, index) => (
          <Card key={education.id || index}>
            <CardContent className="pt-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-medium">Education {index + 1}</h3>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" onClick={() => moveEducation(index, "up")} disabled={index === 0}>
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => moveEducation(index, "down")}
                    disabled={index === educations.length - 1}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => removeEducation(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor={`institution-${index}`}>Institution</Label>
                  <Input
                    id={`institution-${index}`}
                    value={education.institution}
                    onChange={(e) => updateEducation(index, "institution", e.target.value)}
                    placeholder="University or School Name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`degree-${index}`}>Degree</Label>
                  <Input
                    id={`degree-${index}`}
                    value={education.degree}
                    onChange={(e) => updateEducation(index, "degree", e.target.value)}
                    placeholder="Bachelor's, Master's, etc."
                  />
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor={`field-${index}`}>Field of Study</Label>
                  <Input
                    id={`field-${index}`}
                    value={education.field}
                    onChange={(e) => updateEducation(index, "field", e.target.value)}
                    placeholder="Computer Science, Business, etc."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`startDate-${index}`}>Start Date</Label>
                  <Input
                    id={`startDate-${index}`}
                    value={education.startDate}
                    onChange={(e) => updateEducation(index, "startDate", e.target.value)}
                    placeholder="MM/YYYY"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`endDate-${index}`}>End Date</Label>
                  <Input
                    id={`endDate-${index}`}
                    value={education.endDate}
                    onChange={(e) => updateEducation(index, "endDate", e.target.value)}
                    placeholder="MM/YYYY or Present"
                  />
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <Label htmlFor={`location-${index}`}>Location</Label>
                <Input
                  id={`location-${index}`}
                  value={education.location}
                  onChange={(e) => updateEducation(index, "location", e.target.value)}
                  placeholder="City, State"
                />
              </div>

              <div className="mt-4 space-y-2">
                <Label htmlFor={`description-${index}`}>Description (Optional)</Label>
                <Textarea
                  id={`description-${index}`}
                  value={education.description}
                  onChange={(e) => updateEducation(index, "description", e.target.value)}
                  placeholder="Honors, relevant coursework, achievements, etc."
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

