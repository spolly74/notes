"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { supabase } from "@/lib/supabase"

interface Note {
  id: string
  title: string
  content: string
  created_at: string
}

export function NoteList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [notes, setNotes] = useState<Note[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchNotes()
  }, [])

  async function fetchNotes() {
    try {
      const { data, error } = await supabase
        .from('notes')
        .select('id, title, content, created_at')
        .order('created_at', { ascending: false })

      if (error) throw error

      setNotes(data || [])
      setError(null)
    } catch (error) {
      console.error('Error fetching notes:', error)
      setError('Failed to fetch notes. Please try again later.')
    }
  }

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="h-full flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle>Recent Notes</CardTitle>
        <div className="mt-4">
          <Input
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        {error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <ScrollArea className="h-[calc(100vh-12rem)]">
            <div className="space-y-4">
              {filteredNotes.map(note => (
                <Link href={`/notes/${note.id}`} key={note.id}>
                  <div className="p-4 rounded-lg border hover:bg-accent/50 cursor-pointer">
                    <h3 className="font-semibold">{note.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {note.content.substring(0, 100)}...
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </div>
  )
}

