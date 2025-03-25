import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

export default function TemplatesPage() {
  const templates = [
    { 
      id: "modern", 
      name: "Modern", 
      description: "Clean and professional design with a modern touch" 
    },
    { 
      id: "classic", 
      name: "Classic", 
      description: "Traditional resume layout that works for any industry" 
    },
    { 
      id: "creative", 
      name: "Creative", 
      description: "Stand out with this unique and creative design" 
    },
    { 
      id: "minimal", 
      name: "Minimal", 
      description: "Simple and elegant design focusing on content" 
    },
    { 
      id: "professional", 
      name: "Professional", 
      description: "Sophisticated design for senior positions" 
    },
    { 
      id: "executive", 
      name: "Executive", 
      description: "Elegant design for executive and leadership roles" 
    },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between mx-auto px-4">
          <div className="flex">
            <Link href="/" className="flex items-center space-x-2">
              <img src="https://storage.verity.dev/storage/NGMI3.png" alt="ResumeBuilder" height={100} width={100} />
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button variant="outline" className="pointer-events-none opacity-70">Templates</Button>
            <Link href="/builder">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Templates</h1>
            <p className="text-muted-foreground">
              Cut through the noise. ATS-Friendly
              templates are made to pass through Applicant Tracking Systems.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <div key={template.id} className="flex flex-col border rounded-lg overflow-hidden bg-background shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-[3/4] border-b relative flex items-center justify-center p-4 bg-card dark:bg-card/80">
                  <div className="w-full h-full">
                    {template.id === "modern" && (
                      <div className="w-full h-full bg-white dark:bg-gray-900 p-4 flex flex-col shadow-sm overflow-hidden text-[0.55rem] sm:text-xs">
                        <div className="text-center mb-3">
                          <h1 className="text-sm sm:text-base font-bold text-gray-800 dark:text-gray-100">ALEX JOHNSON</h1>
                          <div className="flex flex-wrap justify-center gap-2 text-[0.5rem] sm:text-xs text-gray-600 dark:text-gray-400">
                            <div>(555) 123-4567</div>
                            <div>•</div>
                            <div>alex.johnson@email.com</div>
                            <div>•</div>
                            <div>San Francisco, CA</div>
                          </div>
                        </div>
                        <div className="mb-3">
                          <h2 className="text-xs font-semibold border-b border-gray-300 dark:border-gray-700 pb-1 mb-1 text-gray-800 dark:text-gray-200">PROFESSIONAL SUMMARY</h2>
                          <p className="text-[0.5rem] sm:text-xs text-gray-700 dark:text-gray-300">
                            Product Manager with 5+ years of experience leading cross-functional teams to develop innovative solutions. 
                            Skilled in user research, roadmap planning, and agile methodologies.
                          </p>
                        </div>
                        <div className="mb-3">
                          <h2 className="text-xs font-semibold border-b border-gray-300 dark:border-gray-700 pb-1 mb-1 text-gray-800 dark:text-gray-200">WORK EXPERIENCE</h2>
                          <div className="mb-2">
                            <div className="flex justify-between">
                              <div className="font-medium text-[0.55rem] sm:text-xs text-gray-800 dark:text-gray-200">Senior Product Manager</div>
                              <div className="text-[0.5rem] sm:text-xs text-gray-600 dark:text-gray-400">Jan 2020 - Present</div>
                            </div>
                            <div className="flex justify-between">
                              <div className="text-[0.55rem] sm:text-xs text-gray-700 dark:text-gray-300">TechCorp Inc.</div>
                              <div className="text-[0.5rem] sm:text-xs text-gray-600 dark:text-gray-400">San Francisco, CA</div>
                            </div>
                            <ul className="pl-3 list-disc text-[0.5rem] sm:text-xs text-gray-700 dark:text-gray-300 mt-1">
                              <li>Led product strategy for flagship SaaS platform resulting in 30% revenue growth</li>
                              <li>Managed a cross-functional team of 12 including designers and engineers</li>
                            </ul>
                          </div>
                          <div>
                            <div className="flex justify-between">
                              <div className="font-medium text-[0.55rem] sm:text-xs text-gray-800 dark:text-gray-200">Product Manager</div>
                              <div className="text-[0.5rem] sm:text-xs text-gray-600 dark:text-gray-400">Jun 2017 - Dec 2019</div>
                            </div>
                            <div className="flex justify-between">
                              <div className="text-[0.55rem] sm:text-xs text-gray-700 dark:text-gray-300">InnovateSoft</div>
                              <div className="text-[0.5rem] sm:text-xs text-gray-600 dark:text-gray-400">Oakland, CA</div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h2 className="text-xs font-semibold border-b border-gray-300 dark:border-gray-700 pb-1 mb-1 text-gray-800 dark:text-gray-200">SKILLS</h2>
                          <div className="flex flex-wrap gap-1">
                            <span className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-[0.5rem] sm:text-xs text-gray-800 dark:text-gray-200">Product Strategy</span>
                            <span className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-[0.5rem] sm:text-xs text-gray-800 dark:text-gray-200">Agile/Scrum</span>
                            <span className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-[0.5rem] sm:text-xs text-gray-800 dark:text-gray-200">User Research</span>
                            <span className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-[0.5rem] sm:text-xs text-gray-800 dark:text-gray-200">Data Analysis</span>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {template.id === "classic" && (
                      <div className="w-full h-full bg-white dark:bg-gray-900 p-4 flex flex-col shadow-sm overflow-hidden text-[0.55rem] sm:text-xs">
                        <div className="text-center mb-4 border-b-2 border-gray-400 dark:border-gray-600 pb-2">
                          <h1 className="text-sm sm:text-base font-bold text-gray-800 dark:text-gray-100 uppercase">Michael Williams</h1>
                          <div className="flex flex-wrap justify-center gap-2 text-[0.5rem] sm:text-xs text-gray-600 dark:text-gray-400">
                            <div>michael.williams@email.com</div>
                            <div>•</div>
                            <div>(555) 234-5678</div>
                            <div>•</div>
                            <div>Chicago, IL</div>
                          </div>
                        </div>
                        <div className="mb-3">
                          <h2 className="text-xs font-bold text-gray-800 dark:text-gray-200 uppercase">Summary</h2>
                          <p className="text-[0.5rem] sm:text-xs text-gray-700 dark:text-gray-300 mt-1">
                            Experienced Marketing Director with 8+ years specializing in digital marketing strategy, brand development, and team leadership. Proven track record of increasing market share and optimizing campaign ROI.
                          </p>
                        </div>
                        <div className="mb-3">
                          <h2 className="text-xs font-bold text-gray-800 dark:text-gray-200 uppercase">Experience</h2>
                          <div className="mt-1 mb-2">
                            <div className="font-semibold text-[0.55rem] sm:text-xs text-gray-800 dark:text-gray-200">Marketing Director</div>
                            <div className="italic text-[0.5rem] sm:text-xs text-gray-600 dark:text-gray-400">GlobalBrand Industries | Chicago, IL | 2019 - Present</div>
                            <ul className="pl-3 list-disc text-[0.5rem] sm:text-xs text-gray-700 dark:text-gray-300 mt-0.5">
                              <li>Directed comprehensive marketing strategies resulting in 45% growth in brand awareness</li>
                              <li>Managed $2M annual marketing budget and team of 12 marketing professionals</li>
                            </ul>
                          </div>
                          <div>
                            <div className="font-semibold text-[0.55rem] sm:text-xs text-gray-800 dark:text-gray-200">Senior Marketing Manager</div>
                            <div className="italic text-[0.5rem] sm:text-xs text-gray-600 dark:text-gray-400">Innovative Marketing Group | Chicago, IL | 2015 - 2019</div>
                          </div>
                        </div>
                        <div>
                          <h2 className="text-xs font-bold text-gray-800 dark:text-gray-200 uppercase">Education</h2>
                          <div className="mt-1">
                            <div className="font-semibold text-[0.55rem] sm:text-xs text-gray-800 dark:text-gray-200">MBA, Marketing</div>
                            <div className="text-[0.5rem] sm:text-xs text-gray-700 dark:text-gray-300">Northwestern University, Evanston, IL</div>
                            <div className="text-[0.5rem] sm:text-xs text-gray-600 dark:text-gray-400">2013</div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {template.id === "creative" && (
                      <div className="w-full h-full bg-white dark:bg-gray-900 p-2 flex shadow-sm overflow-hidden text-[0.55rem] sm:text-xs">
                        <div className="bg-indigo-100 dark:bg-indigo-900 w-1/3 p-2 flex flex-col">
                          <div className="mb-4 flex flex-col items-center">
                            <div className="w-10 h-10 bg-indigo-500 dark:bg-indigo-600 rounded-full mb-1 flex items-center justify-center text-white font-bold">SL</div>
                            <h1 className="font-bold text-xs text-center text-gray-800 dark:text-gray-100">SARAH LEE</h1>
                            <p className="text-[0.5rem] text-center text-gray-600 dark:text-gray-400">UX/UI Designer</p>
                          </div>
                          
                          <div className="mb-3">
                            <h2 className="font-bold text-[0.55rem] sm:text-xs text-indigo-700 dark:text-indigo-300 uppercase mb-1">Contact</h2>
                            <div className="text-[0.5rem] text-gray-700 dark:text-gray-300 mb-0.5">sarah.lee@email.com</div>
                            <div className="text-[0.5rem] text-gray-700 dark:text-gray-300 mb-0.5">(555) 345-6789</div>
                            <div className="text-[0.5rem] text-gray-700 dark:text-gray-300">New York, NY</div>
                          </div>
                          
                          <div className="mb-3">
                            <h2 className="font-bold text-[0.55rem] sm:text-xs text-indigo-700 dark:text-indigo-300 uppercase mb-1">Skills</h2>
                            <div className="text-[0.5rem] text-gray-700 dark:text-gray-300 mb-0.5">UI/UX Design</div>
                            <div className="text-[0.5rem] text-gray-700 dark:text-gray-300 mb-0.5">Figma & Adobe XD</div>
                            <div className="text-[0.5rem] text-gray-700 dark:text-gray-300 mb-0.5">Wireframing</div>
                            <div className="text-[0.5rem] text-gray-700 dark:text-gray-300 mb-0.5">Prototyping</div>
                            <div className="text-[0.5rem] text-gray-700 dark:text-gray-300">HTML/CSS</div>
                          </div>
                          
                          <div>
                            <h2 className="font-bold text-[0.55rem] sm:text-xs text-indigo-700 dark:text-indigo-300 uppercase mb-1">Education</h2>
                            <div className="font-medium text-[0.5rem] text-gray-800 dark:text-gray-200">BFA, Graphic Design</div>
                            <div className="text-[0.5rem] text-gray-700 dark:text-gray-300">Parsons School of Design</div>
                            <div className="text-[0.5rem] text-gray-600 dark:text-gray-400">2018</div>
                          </div>
                        </div>
                        
                        <div className="w-2/3 p-2">
                          <div className="mb-3">
                            <h2 className="font-bold text-[0.55rem] sm:text-xs text-indigo-600 dark:text-indigo-400 uppercase mb-1 pb-0.5 border-b border-indigo-200 dark:border-indigo-700">Profile</h2>
                            <p className="text-[0.5rem] text-gray-700 dark:text-gray-300">
                              Creative and user-focused UX/UI Designer with 4+ years of experience creating intuitive digital experiences. Passionate about accessible design and user-centered solutions.
                            </p>
                          </div>
                          
                          <div className="mb-3">
                            <h2 className="font-bold text-[0.55rem] sm:text-xs text-indigo-600 dark:text-indigo-400 uppercase mb-1 pb-0.5 border-b border-indigo-200 dark:border-indigo-700">Experience</h2>
                            <div className="mb-1.5">
                              <div className="font-medium text-[0.55rem] text-gray-800 dark:text-gray-200">Senior UX/UI Designer</div>
                              <div className="flex justify-between">
                                <div className="text-[0.5rem] text-gray-700 dark:text-gray-300">DigitalCraft Studio</div>
                                <div className="text-[0.5rem] text-gray-600 dark:text-gray-400">2020 - Present</div>
                              </div>
                              <ul className="list-disc pl-2.5 text-[0.5rem] text-gray-700 dark:text-gray-300 mt-0.5">
                                <li>Redesigned main product interface increasing user engagement by 35%</li>
                                <li>Lead design team of 5 across multiple client projects</li>
                              </ul>
                            </div>
                            <div>
                              <div className="font-medium text-[0.55rem] text-gray-800 dark:text-gray-200">UX Designer</div>
                              <div className="flex justify-between">
                                <div className="text-[0.5rem] text-gray-700 dark:text-gray-300">CreativeTech Inc.</div>
                                <div className="text-[0.5rem] text-gray-600 dark:text-gray-400">2018 - 2020</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {template.id === "minimal" && (
                      <div className="w-full h-full bg-white dark:bg-gray-900 p-4 flex flex-col shadow-sm overflow-hidden text-[0.55rem] sm:text-xs">
                        <div className="mb-4">
                          <h1 className="text-sm sm:text-base font-light text-gray-800 dark:text-gray-100">David Chen</h1>
                          <div className="flex gap-2 text-[0.5rem] sm:text-xs text-gray-600 dark:text-gray-400">
                            <div>david.chen@email.com</div>
                            <div>•</div>
                            <div>(555) 456-7890</div>
                            <div>•</div>
                            <div>Seattle, WA</div>
                          </div>
                        </div>
                        
                        <div className="mb-3">
                          <h2 className="text-[0.55rem] sm:text-xs font-medium text-gray-800 dark:text-gray-200 uppercase">About</h2>
                          <p className="text-[0.5rem] sm:text-xs text-gray-700 dark:text-gray-300 mt-1">
                            Software Engineer with expertise in backend development and distributed systems. 
                            6+ years of experience building scalable applications using cloud technologies.
                          </p>
                        </div>
                        
                        <div className="mb-3">
                          <h2 className="text-[0.55rem] sm:text-xs font-medium text-gray-800 dark:text-gray-200 uppercase">Experience</h2>
                          <div className="mt-1.5 mb-2">
                            <div className="text-[0.55rem] sm:text-xs font-medium text-gray-800 dark:text-gray-200">Senior Software Engineer</div>
                            <div className="text-[0.5rem] sm:text-xs text-gray-700 dark:text-gray-300">CloudScale Technologies</div>
                            <div className="text-[0.5rem] sm:text-xs text-gray-600 dark:text-gray-400">2019 - Present</div>
                            <p className="text-[0.5rem] sm:text-xs text-gray-700 dark:text-gray-300 mt-0.5">
                              Developed microservices architecture handling 5M+ daily transactions. Improved system performance by 60%.
                            </p>
                          </div>
                          <div>
                            <div className="text-[0.55rem] sm:text-xs font-medium text-gray-800 dark:text-gray-200">Software Engineer</div>
                            <div className="text-[0.5rem] sm:text-xs text-gray-700 dark:text-gray-300">TechInnovate Inc.</div>
                            <div className="text-[0.5rem] sm:text-xs text-gray-600 dark:text-gray-400">2016 - 2019</div>
                          </div>
                        </div>
                        
                        <div>
                          <h2 className="text-[0.55rem] sm:text-xs font-medium text-gray-800 dark:text-gray-200 uppercase">Skills</h2>
                          <div className="flex flex-wrap gap-1 mt-1">
                            <span className="text-[0.5rem] sm:text-xs text-gray-700 dark:text-gray-300">Java</span>
                            <span className="text-[0.5rem] sm:text-xs text-gray-700 dark:text-gray-300">•</span>
                            <span className="text-[0.5rem] sm:text-xs text-gray-700 dark:text-gray-300">Kubernetes</span>
                            <span className="text-[0.5rem] sm:text-xs text-gray-700 dark:text-gray-300">•</span>
                            <span className="text-[0.5rem] sm:text-xs text-gray-700 dark:text-gray-300">AWS</span>
                            <span className="text-[0.5rem] sm:text-xs text-gray-700 dark:text-gray-300">•</span>
                            <span className="text-[0.5rem] sm:text-xs text-gray-700 dark:text-gray-300">Microservices</span>
                            <span className="text-[0.5rem] sm:text-xs text-gray-700 dark:text-gray-300">•</span>
                            <span className="text-[0.5rem] sm:text-xs text-gray-700 dark:text-gray-300">Docker</span>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {template.id === "professional" && (
                      <div className="w-full h-full bg-white dark:bg-gray-900 p-4 flex flex-col shadow-sm overflow-hidden text-[0.55rem] sm:text-xs">
                        <div className="flex justify-between items-center border-b-2 border-gray-400 dark:border-gray-600 pb-2 mb-3">
                          <h1 className="text-sm sm:text-base font-bold text-gray-800 dark:text-gray-100">JENNIFER RODRIGUEZ</h1>
                          <div className="flex flex-col items-end">
                            <div className="text-[0.5rem] sm:text-xs text-gray-600 dark:text-gray-400">jennifer.r@email.com</div>
                            <div className="text-[0.5rem] sm:text-xs text-gray-600 dark:text-gray-400">(555) 567-8901</div>
                            <div className="text-[0.5rem] sm:text-xs text-gray-600 dark:text-gray-400">Boston, MA</div>
                          </div>
                        </div>
                        
                        <div className="mb-3">
                          <h2 className="text-xs font-bold text-gray-800 dark:text-gray-200">PROFESSIONAL SUMMARY</h2>
                          <p className="text-[0.5rem] sm:text-xs text-gray-700 dark:text-gray-300 mt-1">
                            Finance Director with 10+ years of experience in corporate finance, financial planning, and analysis. 
                            Expert in strategic financial management, budget oversight, and driving business growth. MBA with CPA certification.
                          </p>
                        </div>
                        
                        <div className="mb-3">
                          <h2 className="text-xs font-bold text-gray-800 dark:text-gray-200">PROFESSIONAL EXPERIENCE</h2>
                          <div className="mt-1.5">
                            <div className="flex justify-between items-center">
                              <div className="font-semibold text-[0.55rem] sm:text-xs text-gray-800 dark:text-gray-200">Director of Finance</div>
                              <div className="text-[0.5rem] sm:text-xs text-gray-600 dark:text-gray-400">Feb 2018 - Present</div>
                            </div>
                            <div className="flex justify-between items-center mb-1">
                              <div className="italic text-[0.5rem] sm:text-xs text-gray-700 dark:text-gray-300">Smith & Johnson Financial Group</div>
                              <div className="text-[0.5rem] sm:text-xs text-gray-600 dark:text-gray-400">Boston, MA</div>
                            </div>
                            <ul className="pl-3 list-disc text-[0.5rem] sm:text-xs text-gray-700 dark:text-gray-300">
                              <li>Oversee $50M annual budget and 15-person finance department</li>
                              <li>Implemented financial strategy resulting in 20% profit increase over 2 years</li>
                              <li>Lead financial planning and analysis for corporate strategic initiatives</li>
                            </ul>
                          </div>
                        </div>
                        
                        <div>
                          <h2 className="text-xs font-bold text-gray-800 dark:text-gray-200">EDUCATION</h2>
                          <div className="mt-1">
                            <div className="font-semibold text-[0.55rem] sm:text-xs text-gray-800 dark:text-gray-200">MBA, Finance</div>
                            <div className="text-[0.5rem] sm:text-xs text-gray-700 dark:text-gray-300">Harvard Business School</div>
                            <div className="text-[0.5rem] sm:text-xs text-gray-600 dark:text-gray-400">2012</div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {template.id === "executive" && (
                      <div className="w-full h-full bg-white dark:bg-gray-900 p-4 flex flex-col shadow-sm overflow-hidden text-[0.55rem] sm:text-xs">
                        <div className="border-b-4 border-gray-400 dark:border-gray-600 pb-2 mb-3">
                          <h1 className="text-sm sm:text-base font-bold text-gray-800 dark:text-gray-100">Thomas Wilson</h1>
                          <div className="text-[0.5rem] sm:text-xs uppercase tracking-wide text-gray-600 dark:text-gray-400">Chief Executive Officer</div>
                        </div>
                        
                        <div className="flex mb-3">
                          <div className="w-1/4 pr-2">
                            <div className="text-[0.55rem] sm:text-xs font-bold text-gray-800 dark:text-gray-200 uppercase mb-1">Contact</div>
                            <div className="text-[0.5rem] sm:text-xs text-gray-700 dark:text-gray-300 mb-0.5">thomas.wilson@email.com</div>
                            <div className="text-[0.5rem] sm:text-xs text-gray-700 dark:text-gray-300 mb-0.5">(555) 678-9012</div>
                            <div className="text-[0.5rem] sm:text-xs text-gray-700 dark:text-gray-300 mb-3">Dallas, TX</div>
                            
                            <div className="text-[0.55rem] sm:text-xs font-bold text-gray-800 dark:text-gray-200 uppercase mb-1">Education</div>
                            <div className="text-[0.5rem] sm:text-xs text-gray-700 dark:text-gray-300 mb-0.5">MBA, Business Admin</div>
                            <div className="text-[0.5rem] sm:text-xs text-gray-700 dark:text-gray-300 mb-0.5">Stanford University</div>
                            <div className="text-[0.5rem] sm:text-xs text-gray-600 dark:text-gray-400">2005</div>
                          </div>
                          
                          <div className="w-3/4 pl-2">
                            <div className="mb-2">
                              <p className="text-[0.5rem] sm:text-xs text-gray-700 dark:text-gray-300">
                                Visionary executive with 15+ years of experience leading global organizations. Proven track record of driving revenue growth, 
                                leading strategic transformations, and delivering shareholder value. Expert in building high-performing teams and organizational excellence.
                              </p>
                            </div>
                            
                            <div className="mb-2">
                              <h2 className="text-[0.55rem] sm:text-xs font-bold text-gray-800 dark:text-gray-200 uppercase mb-1">Executive Experience</h2>
                              <div className="mb-1.5">
                                <div className="flex justify-between items-center">
                                  <div className="font-semibold text-[0.55rem] sm:text-xs text-gray-800 dark:text-gray-200">Chief Executive Officer</div>
                                  <div className="text-[0.5rem] sm:text-xs text-gray-600 dark:text-gray-400">2018 - Present</div>
                                </div>
                                <div className="text-[0.5rem] sm:text-xs text-gray-700 dark:text-gray-300">Enterprise Solutions International</div>
                                <ul className="pl-3 list-disc text-[0.5rem] sm:text-xs text-gray-700 dark:text-gray-300 mt-0.5">
                                  <li>Led company through digital transformation increasing market cap by $1.2B</li>
                                  <li>Expanded into 7 new international markets driving 35% revenue growth</li>
                                </ul>
                              </div>
                              <div>
                                <div className="flex justify-between items-center">
                                  <div className="font-semibold text-[0.55rem] sm:text-xs text-gray-800 dark:text-gray-200">Chief Operating Officer</div>
                                  <div className="text-[0.5rem] sm:text-xs text-gray-600 dark:text-gray-400">2014 - 2018</div>
                                </div>
                                <div className="text-[0.5rem] sm:text-xs text-gray-700 dark:text-gray-300">Global Innovations Corp</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-4 flex flex-col flex-grow">
                  <h2 className="text-lg font-bold mb-1">{template.name}</h2>
                  <p className="text-sm text-muted-foreground mb-4 flex-grow">{template.description}</p>
                  <Link href={`/builder?template=${template.id}`} className="w-full">
                    <Button className="w-full">Use this template</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <footer className="border-t py-6 md:py-0">
        <div className="container mx-auto px-4 flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-x-2 text-sm text-muted-foreground">
            <span>© {new Date().getFullYear()}</span>
            <img src="https://storage.verity.dev/storage/NGMI3.png" alt="NGMI" className="h-8 w-8 inline-block" />
            <span>Maintained by <a href="https://praetorian.netlify.app/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center hover:opacity-80 transition-opacity">ᯅ ∴</a></span>
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

