"use client"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import React, { useMemo } from "react"

interface TemplateSelectorProps {
  selectedTemplate: string;
  onSelectTemplate: (template: string) => void;
}

export const TemplateSelector = React.memo(function TemplateSelector({ 
  selectedTemplate, 
  onSelectTemplate 
}: TemplateSelectorProps) {
  // Memoize the templates array so it doesn't cause re-renders
  const templates = useMemo(() => [
    { id: "modern", name: "Modern" },
    { id: "classic", name: "Classic" },
    { id: "creative", name: "Creative" },
    { id: "minimal", name: "Minimal" },
    { id: "professional", name: "Professional" },
    { id: "executive", name: "Executive" },
  ], []);

  return (
    <RadioGroup
      value={selectedTemplate}
      onValueChange={onSelectTemplate}
      className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6"
    >
      {templates.map((template) => (
        <div key={template.id} className="space-y-2">
          <RadioGroupItem value={template.id} id={template.id} className="peer sr-only" />
          <Label
            htmlFor={template.id}
            className="flex cursor-pointer flex-col items-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            <div className="mb-2 aspect-[3/4] w-full rounded bg-muted">
              <div className="flex h-full flex-col p-2">
                <div className="h-4 w-1/2 rounded bg-primary/20"></div>
                <div className="mt-1 h-2 w-3/4 rounded bg-muted-foreground/20"></div>
                <div className="mt-2 space-y-1">
                  <div className="h-1 w-full rounded bg-muted-foreground/20"></div>
                  <div className="h-1 w-full rounded bg-muted-foreground/20"></div>
                  <div className="h-1 w-3/4 rounded bg-muted-foreground/20"></div>
                </div>
              </div>
            </div>
            <span className="text-center text-sm font-medium">{template.name}</span>
          </Label>
        </div>
      ))}
    </RadioGroup>
  )
})

