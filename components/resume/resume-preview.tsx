"use client"

import { ModernTemplate } from "./templates/modern-template"
import { ClassicTemplate } from "./templates/classic-template"
import { CreativeTemplate } from "./templates/creative-template"
import { MinimalTemplate } from "./templates/minimal-template"
import { ProfessionalTemplate } from "./templates/professional-template"
import { ExecutiveTemplate } from "./templates/executive-template"

interface ResumeData {
  personal: any;
  experience: any[];
  education: any[];
  skills: any[];
  projects: any[];
  template: string;
}

interface ResumePreviewProps {
  data: ResumeData;
}

export function ResumePreview({ data }: ResumePreviewProps) {
  const templates = {
    modern: ModernTemplate,
    classic: ClassicTemplate,
    creative: CreativeTemplate,
    minimal: MinimalTemplate,
    professional: ProfessionalTemplate,
    executive: ExecutiveTemplate,
  }

  const SelectedTemplate = templates[data.template as keyof typeof templates] || templates.modern

  return (
    <div className="bg-background p-2 md:p-4 shadow-sm overflow-hidden">
      <div className="mx-auto max-w-full overflow-hidden rounded border dark:border-gray-700">
        <div 
          style={{ backgroundColor: 'white', color: 'black' }} 
          className="w-full [&_*]:!text-black [&_*]:!bg-white [&_h1]:!text-black [&_h2]:!text-black [&_h3]:!text-black [&_p]:!text-black [&_span]:!text-gray-600 [&_.text-gray-600]:!text-gray-600 print:bg-white print:text-black"
        >
          <SelectedTemplate data={data} />
        </div>
      </div>
    </div>
  )
}

