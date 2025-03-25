"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Trash2, ChevronUp, ChevronDown } from "lucide-react"

export function ProjectsForm({ data, updateData }) {
  const [projects, setProjects] = useState(data || [])

  useEffect(() => {
    setProjects(data || [])
  }, [data])

  const addProject = () => {
    setProjects([
      ...projects,
      {
        id: Date.now(),
        name: "",
        role: "",
        url: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ])
  }

  const updateProject = (index, field, value) => {
    const updatedProjects = [...projects]
    updatedProjects[index][field] = value
    setProjects(updatedProjects)
    updateData(updatedProjects)
  }

  const removeProject = (index) => {
    const updatedProjects = projects.filter((_, i) => i !== index)
    setProjects(updatedProjects)
    updateData(updatedProjects)
  }

  const moveProject = (index, direction) => {
    if ((direction === "up" && index === 0) || (direction === "down" && index === projects.length - 1)) {
      return
    }

    const newIndex = direction === "up" ? index - 1 : index + 1
    const updatedProjects = [...projects]
    const temp = updatedProjects[index]
    updatedProjects[index] = updatedProjects[newIndex]
    updatedProjects[newIndex] = temp

    setProjects(updatedProjects)
    updateData(updatedProjects)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Projects</h2>
        <Button onClick={addProject} size="sm" className="gap-1">
          <Plus className="h-4 w-4" /> Add Project
        </Button>
      </div>

      {projects.length === 0 ? (
        <div className="rounded-lg border border-dashed p-6 text-center">
          <p className="text-muted-foreground">No projects added yet</p>
          <Button onClick={addProject} variant="outline" className="mt-2">
            Add Project
          </Button>
        </div>
      ) : (
        projects.map((project, index) => (
          <Card key={project.id || index}>
            <CardContent className="pt-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-medium">Project {index + 1}</h3>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" onClick={() => moveProject(index, "up")} disabled={index === 0}>
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => moveProject(index, "down")}
                    disabled={index === projects.length - 1}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => removeProject(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor={`name-${index}`}>Project Name</Label>
                  <Input
                    id={`name-${index}`}
                    value={project.name}
                    onChange={(e) => updateProject(index, "name", e.target.value)}
                    placeholder="Project Name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`role-${index}`}>Your Role</Label>
                  <Input
                    id={`role-${index}`}
                    value={project.role}
                    onChange={(e) => updateProject(index, "role", e.target.value)}
                    placeholder="Developer, Designer, etc."
                  />
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor={`url-${index}`}>Project URL (Optional)</Label>
                  <Input
                    id={`url-${index}`}
                    value={project.url}
                    onChange={(e) => updateProject(index, "url", e.target.value)}
                    placeholder="https://example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`startDate-${index}`}>Start Date</Label>
                  <Input
                    id={`startDate-${index}`}
                    value={project.startDate}
                    onChange={(e) => updateProject(index, "startDate", e.target.value)}
                    placeholder="MM/YYYY"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`endDate-${index}`}>End Date</Label>
                  <Input
                    id={`endDate-${index}`}
                    value={project.endDate}
                    onChange={(e) => updateProject(index, "endDate", e.target.value)}
                    placeholder="MM/YYYY or Present"
                  />
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <Label htmlFor={`description-${index}`}>Description</Label>
                <Textarea
                  id={`description-${index}`}
                  value={project.description}
                  onChange={(e) => updateProject(index, "description", e.target.value)}
                  placeholder="Describe the project, your role, and key achievements"
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

