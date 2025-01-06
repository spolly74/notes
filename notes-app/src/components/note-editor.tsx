"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import ReactMarkdown from "react-markdown"

export function NoteEditor() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [isPreview, setIsPreview] = useState(false)

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log("Saving note:", { title, content })
  }

  return (
    <Card className="flex-1 m-4 flex flex-col">
      <CardHeader>
        <CardTitle>
          <Input
            placeholder="Note Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-lg font-bold"
          />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        {isPreview ? (
          <div className="prose max-w-none">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        ) : (
          <Textarea
            placeholder="Write your note here (Markdown supported)"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-full min-h-[500px] resize-none"
          />
        )}
      </CardContent>
      <CardFooter className="justify-between">
        <Button variant="outline" onClick={() => setIsPreview(!isPreview)}>
          {isPreview ? "Edit" : "Preview"}
        </Button>
        <Button onClick={handleSave}>Save</Button>
      </CardFooter>
    </Card>
  )
}

