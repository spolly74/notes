"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import ReactMarkdown from "react-markdown"
import { supabase } from "@/lib/supabase"

export default function NotePage({ params }: { params: { id: string } }) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [isPreview, setIsPreview] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (params.id !== 'new') {
      fetchNote()
    }
  }, [params.id])

  async function fetchNote() {
    const { data, error } = await supabase
      .from('notes')
      .select('title, content')
      .eq('id', params.id)
      .single()

    if (error) {
      console.error('Error fetching note:', error)
    } else if (data) {
      setTitle(data.title)
      setContent(data.content)
    }
  }

  async function handleSave() {
    const noteData = {
      title,
      content,
    }

    let error

    if (params.id === 'new') {
      const { error: insertError } = await supabase.from('notes').insert(noteData)
      error = insertError
    } else {
      const { error: updateError } = await supabase
        .from('notes')
        .update(noteData)
        .eq('id', params.id)
      error = updateError
    }

    if (error) {
      console.error('Error saving note:', error)
    } else {
      router.push('/')
    }
  }

  return (
    <div className="p-4">
      <Card className="h-full flex flex-col">
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
    </div>
  )
}

