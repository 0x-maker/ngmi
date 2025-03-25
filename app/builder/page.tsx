"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PersonalInfoForm } from "@/components/resume/personal-info-form"
import { ExperienceForm } from "@/components/resume/experience-form"
import { EducationForm } from "@/components/resume/education-form"
import { SkillsForm } from "@/components/resume/skills-form"
import { ProjectsForm } from "@/components/resume/projects-form"
import { TemplateSelector } from "@/components/resume/template-selector"
import { ResumePreview } from "@/components/resume/resume-preview"
import { useToast } from "@/hooks/use-toast"
import { Download, Italic } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"

// Define TypeScript interfaces for our data
interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  summary: string;
  website: string;
  linkedin: string;
}

interface Experience {
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Education {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Skill {
  name: string;
  level: string;
}

interface Project {
  name: string;
  description: string;
  technologies: string;
  link: string;
}

interface ResumeData {
  personal: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  template: string;
}

export default function ResumeBuilder() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("personal")
  const resumeRef = useRef<HTMLDivElement>(null)
  const [resumeData, setResumeData] = useState<ResumeData>({
    personal: {
      name: "",
      email: "",
      phone: "",
      address: "",
      summary: "",
      website: "",
      linkedin: "",
    },
    experience: [],
    education: [],
    skills: [],
    projects: [],
    template: "modern",
  })

  const updateResumeData = (section: keyof ResumeData, data: any) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: data,
    }))
  }

  const handleExportPDF = async () => {
    toast({
      title: "Exporting PDF",
      description: "Your resume is being prepared for download.",
    })
    
    // Dynamically import html2pdf only in the client
    try {
      const html2pdfModule = await import('html2pdf.js')
      const html2pdf = html2pdfModule.default
      
      // Get the resume element
      const element = resumeRef.current
      
      if (!element) {
        toast({
          title: "Error",
          description: "Could not generate PDF. Please try again.",
        })
        return
      }
      
      // Configure pdf options
      const options = {
        margin: 10,
        filename: `${resumeData.personal.name || 'resume'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' as 'portrait' | 'landscape' }
      }
      
      // Generate and download PDF
      html2pdf().from(element).set(options).save()
        .then(() => {
          toast({
            title: "PDF Ready",
            description: "Your resume has been exported successfully.",
          })
        })
    } catch (error) {
      console.error("PDF generation error:", error)
      toast({
        title: "Error",
        description: "There was a problem generating your PDF. Please try again.",
      })
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="max-w-screen-md mx-auto px-4 flex h-16 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
            <img src="https://storage.verity.dev/storage/ngmi2.png" alt="ResumeBuilder" height={75} width={75} />
            </Link>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <ThemeToggle />
          </div>
        </div>
      </header>
      <div className="flex-1 py-8">
        <div className="max-w-screen-md mx-auto px-4">
          <h1 className="mb-6 text-3xl font-bold">Start Building Your Resume Bucko</h1>
          <p className="italic text-muted-foreground mb-4">This Job Ain't Gonna Find Itself</p>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="personal">Personal</TabsTrigger>
                  <TabsTrigger value="experience">Experience</TabsTrigger>
                  <TabsTrigger value="education">Education</TabsTrigger>
                  <TabsTrigger value="skills">Skills</TabsTrigger>
                  <TabsTrigger value="projects">Projects</TabsTrigger>
                </TabsList>
                <Card className="mt-4 p-4">
                  <TabsContent value="personal">
                    <PersonalInfoForm
                      data={resumeData.personal}
                      updateData={(data: PersonalInfo) => updateResumeData("personal", data)}
                    />
                  </TabsContent>
                  <TabsContent value="experience">
                    <ExperienceForm
                      data={resumeData.experience}
                      updateData={(data: Experience[]) => updateResumeData("experience", data)}
                    />
                  </TabsContent>
                  <TabsContent value="education">
                    <EducationForm 
                      data={resumeData.education} 
                      updateData={(data: Education[]) => updateResumeData("education", data)} 
                    />
                  </TabsContent>
                  <TabsContent value="skills">
                    <SkillsForm 
                      data={resumeData.skills} 
                      updateData={(data: Skill[]) => updateResumeData("skills", data)} 
                    />
                  </TabsContent>
                  <TabsContent value="projects">
                    <ProjectsForm 
                      data={resumeData.projects} 
                      updateData={(data: Project[]) => updateResumeData("projects", data)} 
                    />
                  </TabsContent>
                </Card>
              </Tabs>
              <div className="mt-6">
                <h2 className="mb-4 text-xl font-bold">Template</h2>
                <TemplateSelector
                  selectedTemplate={resumeData.template}
                  onSelectTemplate={(template: string) => updateResumeData("template", template)}
                />
              </div>
              <Button className="mt-4 w-full gap-2" size="lg" onClick={handleExportPDF}>
                <Download className="h-4 w-4" /> Export as PDF
              </Button>
            </div>
            <div className="sticky top-24 h-fit">
              <h2 className="mb-4 text-xl font-bold">Preview</h2>
              <div className="rounded-lg border bg-background p-1">
                <div ref={resumeRef}>
                  <ResumePreview data={resumeData} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="border-t py-6 md:py-0">
        <div className="max-w-screen-md mx-auto px-4 flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>© {new Date().getFullYear()}</span>
            <img src="https://storage.verity.dev/storage/ngmi2.png" alt="NGMI" className="h-8 w-8 inline-block" />
            <span>Maintained by</span>
            <a 
              href="https://twitter.com/0xPraetorian" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center hover:opacity-80 transition-opacity"
            >
              <img src="https://storage.verity.dev/storage/prae.png" alt="Praetorian" className="h-5 w-5 inline-block" />
            </a>
            <span>All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

