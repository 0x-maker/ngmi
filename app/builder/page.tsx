"use client"

import { useState, useRef, useEffect, useCallback } from "react"
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
import { Download, Italic, ChevronDown, Upload } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"
import { loadResumeData, saveResumeData } from "@/lib/local-storage"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { exportResumeToPDF, exportResumeToDocx, exportResumeToMarkdown } from '@/lib/file-service'

// Define TypeScript interfaces for our data
interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  summary: string;
  website: string;
  linkedin: string;
  location?: string;
  title?: string;
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
  description?: string;
}

interface Skill {
  name: string;
  level: string;
}

interface Project {
  name: string;
  description: string;
  technologies: string;
  link?: string;
}

// Type for the component's internal state
interface ResumeBuilderState {
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
  const [resumeData, setResumeData] = useState<ResumeBuilderState>({
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

  // Load resume data from localStorage on initial render
  useEffect(() => {
    const savedData = loadResumeData()
    if (savedData) {
      // Convert the ResumeData from localStorage to ResumeBuilderState format
      const compatibleData: ResumeBuilderState = {
        personal: {
          name: savedData.personal.name || "",
          email: savedData.personal.email || "",
          phone: savedData.personal.phone || "",
          address: savedData.personal.address || "",
          summary: savedData.personal.summary || "",
          website: savedData.personal.website || "",
          linkedin: savedData.personal.linkedin || "",
          location: savedData.personal.location,
          title: savedData.personal.title,
        },
        experience: savedData.experience || [],
        education: savedData.education || [],
        skills: Array.isArray(savedData.skills) ? 
          (typeof savedData.skills[0] === 'string' 
            ? (savedData.skills as string[]).map(skill => ({ name: skill, level: "" }))
            : (savedData.skills as Skill[])) 
          : [],
        projects: savedData.projects || [],
        template: savedData.template || "modern",
      }
      
      setResumeData(compatibleData)
    }
  }, [])

  // Memoize the updateResumeData function
  const updateResumeData = useCallback((section: keyof ResumeBuilderState, data: any) => {
    setResumeData((prev) => {
      const updatedData = {
        ...prev,
        [section]: data,
      }
      
      // Only save to localStorage if this isn't a template update
      // or if it's explicitly initiated (not during component initialization)
      if (section !== "template" || (section === "template" && typeof data === "string")) {
        // Convert ResumeBuilderState to ResumeData format for localStorage
        const storageData = {
          personal: {
            ...updatedData.personal,
            location: updatedData.personal.location || updatedData.personal.address,
            title: updatedData.personal.title || updatedData.personal.name,
          },
          experience: updatedData.experience,
          education: updatedData.education,
          skills: Array.isArray(updatedData.skills) && updatedData.skills.length > 0
            ? updatedData.skills.map(skill => skill.name)
            : [],
          projects: updatedData.projects,
          template: updatedData.template,
        }
        
        // Save to localStorage whenever data changes
        saveResumeData(storageData)
      }
      
      return updatedData
    })
  }, [])

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
        description: "Failed to generate PDF. Please try again.",
      })
    }
  }

  // Add handlers for other export formats
  const handleExportDOCX = async () => {
    toast({
      title: "Exporting DOCX",
      description: "Your resume is being prepared for download.",
    });
    
    try {
      // Convert resumeData to the expected format
      const exportData = {
        ...resumeData,
        personal: {
          ...resumeData.personal,
          location: resumeData.personal.location || resumeData.personal.address || '',
          title: resumeData.personal.title || resumeData.personal.name || '',
        },
        skills: Array.isArray(resumeData.skills) 
          ? resumeData.skills.map(skill => skill.name) 
          : []
      };
      
      await exportResumeToDocx(exportData);
      toast({
        title: "DOCX Ready",
        description: "Your resume has been exported successfully.",
      });
    } catch (error) {
      console.error("DOCX generation error:", error);
      toast({
        title: "Error",
        description: "Failed to generate DOCX. Please try again.",
      });
    }
  };

  const handleExportMD = () => {
    toast({
      title: "Exporting Markdown",
      description: "Your resume is being prepared for download.",
    });
    
    try {
      // Convert resumeData to the expected format
      const exportData = {
        ...resumeData,
        personal: {
          ...resumeData.personal,
          location: resumeData.personal.location || resumeData.personal.address || '',
          title: resumeData.personal.title || resumeData.personal.name || '',
        },
        skills: Array.isArray(resumeData.skills) 
          ? resumeData.skills.map(skill => skill.name) 
          : []
      };
      
      exportResumeToMarkdown(exportData);
      toast({
        title: "Markdown Ready",
        description: "Your resume has been exported successfully.",
      });
    } catch (error) {
      console.error("Markdown generation error:", error);
      toast({
        title: "Error",
        description: "Failed to generate Markdown. Please try again.",
      });
    }
  };

  // Add JSON export handler
  const handleExportJSON = () => {
    toast({
      title: "Exporting JSON",
      description: "Your resume is being prepared for download.",
    });
    
    try {
      // Prepare data as JSON string
      const jsonData = JSON.stringify(resumeData, null, 2);
      
      // Create and trigger download
      const blob = new Blob([jsonData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${resumeData.personal.name || 'resume'}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast({
        title: "JSON Ready",
        description: "Your resume has been exported as JSON successfully.",
      });
    } catch (error) {
      console.error("JSON generation error:", error);
      toast({
        title: "Error",
        description: "Failed to generate JSON. Please try again.",
      });
    }
  };

  // Add plain text export handler
  const handleExportTXT = () => {
    toast({
      title: "Exporting TXT",
      description: "Your resume is being prepared for download.",
    });
    
    try {
      // Format resume as plain text
      const { personal, experience, education, skills, projects } = resumeData;
      
      let textContent = `# ${personal.name}\n`;
      textContent += `${personal.email} | ${personal.phone} | ${personal.address}\n`;
      if (personal.website) textContent += `Website: ${personal.website}\n`;
      if (personal.linkedin) textContent += `LinkedIn: ${personal.linkedin}\n\n`;
      
      textContent += `## Summary\n${personal.summary}\n\n`;
      
      if (experience.length) {
        textContent += "## Experience\n";
        experience.forEach(exp => {
          textContent += `${exp.position} at ${exp.company}, ${exp.location}\n`;
          textContent += `${exp.startDate} - ${exp.endDate}\n`;
          textContent += `${exp.description}\n\n`;
        });
      }
      
      if (education.length) {
        textContent += "## Education\n";
        education.forEach(edu => {
          textContent += `${edu.degree} in ${edu.field}, ${edu.institution}\n`;
          textContent += `${edu.startDate} - ${edu.endDate}\n`;
          if (edu.description) textContent += `${edu.description}\n`;
          textContent += "\n";
        });
      }
      
      if (skills.length) {
        textContent += "## Skills\n";
        textContent += skills.map(skill => skill.name).join(", ") + "\n\n";
      }
      
      if (projects.length) {
        textContent += "## Projects\n";
        projects.forEach(proj => {
          textContent += `${proj.name}\n`;
          textContent += `${proj.description}\n`;
          textContent += `Technologies: ${proj.technologies}\n`;
          if (proj.link) textContent += `Link: ${proj.link}\n`;
          textContent += "\n";
        });
      }
      
      // Create and trigger download
      const blob = new Blob([textContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${personal.name || 'resume'}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast({
        title: "TXT Ready",
        description: "Your resume has been exported as plain text successfully.",
      });
    } catch (error) {
      console.error("TXT generation error:", error);
      toast({
        title: "Error",
        description: "Failed to generate TXT. Please try again.",
      });
    }
  };

  // Memoize the handleTemplateSelection function
  const handleTemplateSelection = useCallback((template: string) => {
    updateResumeData("template", template)
  }, [updateResumeData])

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex">
            <Link href="/" className="flex items-center space-x-2">
              <img src="https://cdn.verity.dev/storage/NGMI3.png" alt="ResumeBuilder" height={100} width={100} />
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link href="/templates">
              <Button variant="outline">Templates</Button>
            </Link>
            <Link href="/import-export">
              <Button variant="outline" size="sm">
                <Upload className="mr-2 h-4 w-4" />
                Import
              </Button>
            </Link>
            
            {/* Replace the Export PDF button with a dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleExportPDF}>
                  PDF (.pdf)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleExportDOCX}>
                  Microsoft Word (.docx)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleExportMD}>
                  Markdown (.md)
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleExportJSON}>
                  JSON (.json)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleExportTXT}>
                  Plain Text (.txt)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <div className="flex-1 py-6 md:py-8">
        <div className="container mx-auto px-4">
          <h1 className="mb-4 md:mb-6 text-2xl md:text-3xl font-bold">Start Building Your Resume Bucko</h1>
          <p className="italic text-muted-foreground mb-4">This Job Ain't Gonna Find Itself</p>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full overflow-x-auto flex md:grid md:grid-cols-5">
                  <TabsTrigger value="personal" className="flex-1">Personal</TabsTrigger>
                  <TabsTrigger value="experience" className="flex-1">Experience</TabsTrigger>
                  <TabsTrigger value="education" className="flex-1">Education</TabsTrigger>
                  <TabsTrigger value="skills" className="flex-1">Skills</TabsTrigger>
                  <TabsTrigger value="projects" className="flex-1">Projects</TabsTrigger>
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
                  onSelectTemplate={handleTemplateSelection}
                />
              </div>
              <div className="flex justify-between">
              
                <div className="space-x-3">
                  <br></br>
                  <Link
                    href="/review"
                    className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                  >
                    AI Review
                  </Link>
                </div>
              </div>
            </div>
            <div className="hidden lg:block lg:sticky lg:top-24 lg:h-fit">
              <h2 className="mb-4 text-xl font-bold">Preview</h2>
              <div className="rounded-lg border bg-background p-1">
                <div ref={resumeRef}>
                  <ResumePreview data={resumeData} />
                </div>
              </div>
            </div>
            <div className="lg:hidden mt-6">
              <h2 className="mb-4 text-xl font-bold">Preview</h2>
              <div className="rounded-lg border bg-background p-1 overflow-auto">
                <div ref={resumeRef} className="transform scale-[0.65] origin-top-left h-[153.85%] w-[153.85%]">
                  <ResumePreview data={resumeData} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="border-t py-6 md:py-0">
        <div className="container mx-auto px-4 flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-x-2 text-sm text-muted-foreground">
            <span>© {new Date().getFullYear()}</span>
            <img src="https://cdn.verity.dev/storage/NGMI3.png" alt="NGMI" className="h-8 w-8 inline-block" />
            <span>Maintained by <a href="https://praetorian.netlify.app/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center hover:opacity-80 transition-opacity">ᯅ ∴</a></span>
            <a 
              href="https://twitter.com/0xPraetorian" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center hover:opacity-80 transition-opacity"
            >
              <img src="https://cdn.verity.dev/storage/prae.png" alt="Praetorian" className="h-5 w-5 inline-block" />
            </a>
            <span>All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

