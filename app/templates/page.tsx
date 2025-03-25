import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function TemplatesPage() {
  const templates = [
    { id: "modern", name: "Modern", description: "Clean and professional design with a modern touch" },
    { id: "classic", name: "Classic", description: "Traditional resume layout that works for any industry" },
    { id: "creative", name: "Creative", description: "Stand out with this unique and creative design" },
    { id: "minimal", name: "Minimal", description: "Simple and elegant design focusing on content" },
    { id: "professional", name: "Professional", description: "Sophisticated design for senior positions" },
    { id: "executive", name: "Executive", description: "Elegant design for executive and leadership roles" },
  ]

  return (
    <div className="container py-8">
      <h1 className="mb-6 text-3xl font-bold">Resume Templates</h1>
      <p className="mb-8 text-muted-foreground">
        Choose from our collection of professionally designed resume templates
      </p>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => (
          <Card key={template.id} className="overflow-hidden">
            <div className="aspect-[3/4] bg-muted">
              <div className="flex h-full items-center justify-center">
                <div className="p-4 text-center">
                  <div className="mb-2 h-6 w-24 rounded bg-primary/20 mx-auto"></div>
                  <div className="mb-4 h-3 w-32 rounded bg-muted-foreground/20 mx-auto"></div>
                  <div className="space-y-2">
                    <div className="h-2 w-full rounded bg-muted-foreground/20"></div>
                    <div className="h-2 w-full rounded bg-muted-foreground/20"></div>
                    <div className="h-2 w-3/4 rounded bg-muted-foreground/20"></div>
                  </div>
                </div>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="mb-2 text-lg font-medium">{template.name}</div>
              <p className="mb-4 text-sm text-muted-foreground">{template.description}</p>
              <Link href={`/builder?template=${template.id}`}>
                <Button className="w-full">Use this template</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

