import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center max-w-screen-sm mx-auto px-4">
          <div className="mr-4 flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <img src="https://storage.verity.dev/storage/ngmi2.png" alt="ResumeBuilder" height={75} width={75} />
            </Link>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <ThemeToggle />
            <Link href="/builder">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="container flex flex-col items-center gap-4 text-center max-w-screen-sm mx-auto px-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Create professional resumes in minutes
            </h1>
            <p className="max-w-md leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Don't you think it's time you quit begging for whitelists and asking for "hey bro can you add me to the fnf chat?". stop it. get a job and come back and buy a ticket if you wanna play
            </p>
            <div className="space-x-4 mt-4">
              <Link href="/builder">
                <Button size="lg" className="gap-2">
                  Start Building <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/templates">
                <Button size="lg" variant="outline">
                  View Templates
                </Button>
              </Link>
            </div>
          </div>
        </section>
        <section className="py-8 md:py-12 lg:py-24">
          <div className="max-w-screen-sm mx-auto px-4">
            <div className="flex flex-col items-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">Features</h2>
              <p className="max-w-md leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                Everything you need to create a resume that'll get you a job but you'll probably still get rejected. "just keep applying"
              </p>
              <br></br>
            </div>
            <div className="grid grid-cols-1 justify-center gap-6 sm:grid-cols-2 mx-auto">
              <div className="relative overflow-hidden rounded-lg border bg-background p-6">
                <div className="space-y-2">
                  <h3 className="font-bold">Multiple Templates</h3>
                  <p className="text-sm text-muted-foreground">
                    Choose from a variety of professional templates to make your resume stand out.
                  </p>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-lg border bg-background p-6">
                <div className="space-y-2">
                  <h3 className="font-bold">Real-time Preview</h3>
                  <p className="text-sm text-muted-foreground">See changes to your resume in real-time as you edit.</p>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-lg border bg-background p-6">
                <div className="space-y-2">
                  <h3 className="font-bold">PDF Export</h3>
                  <p className="text-sm text-muted-foreground">Export your resume as a PDF to share with employers.</p>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-lg border bg-background p-6">
                <div className="space-y-2">
                  <h3 className="font-bold">Customizable Sections</h3>
                  <p className="text-sm text-muted-foreground">Add, remove, and rearrange sections to fit your needs.</p>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-lg border bg-background p-6">
                <div className="space-y-2">
                  <h3 className="font-bold">Responsive Design</h3>
                  <p className="text-sm text-muted-foreground">
                    Build your resume on any device with our responsive interface.
                  </p>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-lg border bg-background p-6">
                <div className="space-y-2">
                  <h3 className="font-bold">ATS-Friendly</h3>
                  <p className="text-sm text-muted-foreground">
                    Our templates are designed to pass through Applicant Tracking Systems.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="max-w-screen-sm mx-auto px-4 flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
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

