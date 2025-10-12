import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Github } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import Image from "next/image"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between mx-auto px-4">
          <div className="flex">
            <Link href="/" className="flex items-center space-x-2">
              <img src="https://cdn2.verity.dev/storage/NGMI3.png" alt="ResumeBuilder" height={100} width={100} />
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link href="/templates">
              <Button variant="outline">Templates</Button>
            </Link>
            <Link href="/import-export" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400">
              Import
            </Link>
            <Link href="/review" className="text-sm font-medium text-purple-600 hover:underline dark:text-purple-400">
              AI Review
            </Link>
            <Link
              href="/builder"
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-700 dark:hover:bg-blue-600"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="container flex flex-col items-center gap-4 text-center mx-auto px-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Create professional resumes in minutes 🗿
            </h1>
            <p className="max-w-md text-sm md:text-base leading-normal text-muted-foreground sm:text-lg sm:leading-8">
              Don't you think it's time you quit begging for whitelists and asking for "hey bro can you add me to the fnf chat?". stop it. get a job and come back and buy a ticket if you wanna play
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:space-x-4 mt-4">
              <Link href="/builder">
                <Button size="lg" className="w-full sm:w-auto gap-2">
                  Start Building <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
        <section className="py-8 md:py-12 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center space-y-4 text-center mb-8 md:mb-12">
              <h2 className="text-2xl font-bold leading-[1.1] sm:text-3xl md:text-4xl">Features</h2>
              <p className="max-w-md text-sm md:text-base leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                "just keep applying" 🗿
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mx-auto">
              <div className="relative overflow-hidden rounded-lg border bg-background p-4 md:p-6">
                <div className="space-y-2">
                  <h3 className="font-bold">Multiple Templates</h3>
                  <p className="text-sm text-muted-foreground">
                    Choose from a variety of templates.
                  </p>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-lg border bg-background p-4 md:p-6">
                <div className="space-y-2">
                  <h3 className="font-bold">Real-time Preview</h3>
                  <p className="text-sm text-muted-foreground">See changes to your resume in real-time as you edit.</p>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-lg border bg-background p-4 md:p-6">
                <div className="space-y-2">
                  <h3 className="font-bold">Import & Export</h3>
                  <p className="text-sm text-muted-foreground">Upload existing resumes and export in various formats (PDF, DOCX, MD).</p>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-lg border bg-background p-4 md:p-6">
                <div className="space-y-2">
                  <h3 className="font-bold">Customizable Sections</h3>
                  <p className="text-sm text-muted-foreground">Add, remove, and rearrange sections to fit your needs.</p>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-lg border bg-background p-4 md:p-6">
                <div className="space-y-2">
                  <h3 className="font-bold">Responsive Design</h3>
                  <p className="text-sm text-muted-foreground">
                    Build your resume on any device with our responsive interface.
                  </p>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-lg border bg-background p-4 md:p-6">
                <div className="space-y-2">
                  <h3 className="font-bold">ATS-Friendly</h3>
                  <p className="text-sm text-muted-foreground">
                    templates are designed to pass through Applicant Tracking Systems.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-center w-full mt-12">
              <p className="text-sm text-muted-foreground">It's Free. And Open Source.</p>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container mx-auto px-4 flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-x-2 text-sm text-muted-foreground">
            <span>© {new Date().getFullYear()}</span>
            <a 
              href="https://github.com/0x-maker/ngmi" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center hover:opacity-80 transition-opacity ml-2"
            >
              <Github className="h-5 w-5" />
            </a>
            <img src="https://cdn2.verity.dev/storage/NGMI3.png" alt="NGMI" className="h-8 w-8 inline-block" />
            <span>Maintained by <a href="https://praetorian.netlify.app/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center hover:opacity-80 transition-opacity">ᯅ ∴</a></span>
            <a 
              href="https://twitter.com/0xPraetorian" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center hover:opacity-80 transition-opacity"
            >
              <img src="https://cdn2.verity.dev/storage/prae.png" alt="Praetorian" className="h-5 w-5 inline-block" />
            </a>
           
            <span>All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

