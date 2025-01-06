"use client"

import { useEffect, useState } from 'react'
import { Folder, Hash, FileText, Plus } from 'lucide-react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"

interface FolderType {
  id: string
  name: string
}

interface TagType {
  id: string
  name: string
}

export function Sidebar() {
  const [folders, setFolders] = useState<FolderType[]>([])
  const [tags, setTags] = useState<TagType[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchFolders()
    fetchTags()
  }, [])

  async function fetchFolders() {
    try {
      const { data, error } = await supabase
        .from('folders')
        .select('id, name')
        .order('name')

      if (error) throw error

      setFolders(data || [])
    } catch (error) {
      console.error('Error fetching folders:', error)
      setError('Failed to fetch folders. Please try again later.')
    }
  }

  async function fetchTags() {
    try {
      const { data, error } = await supabase
        .from('tags')
        .select('id, name')
        .order('name')

      if (error) throw error

      setTags(data || [])
    } catch (error) {
      console.error('Error fetching tags:', error)
      setError('Failed to fetch tags. Please try again later.')
    }
  }

  return (
    <div className="w-[200px] border-r bg-muted/40 p-4">
      <div className="space-y-4">
        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}
        <div>
          <h2 className="mb-2 font-semibold flex justify-between items-center">
            Folders
            <Button variant="ghost" size="icon" className="h-5 w-5">
              <Plus className="h-4 w-4" />
            </Button>
          </h2>
          <div className="space-y-1">
            {folders.map(folder => (
              <button key={folder.id} className="w-full rounded-md px-2 py-1 text-left hover:bg-accent hover:text-accent-foreground">
                <Folder className="mr-2 inline-block h-4 w-4" />
                {folder.name}
              </button>
            ))}
          </div>
        </div>
        <div>
          <h2 className="mb-2 font-semibold flex justify-between items-center">
            Tags
            <Button variant="ghost" size="icon" className="h-5 w-5">
              <Plus className="h-4 w-4" />
            </Button>
          </h2>
          <div className="space-y-1">
            {tags.map(tag => (
              <button key={tag.id} className="w-full rounded-md px-2 py-1 text-left hover:bg-accent hover:text-accent-foreground">
                <Hash className="mr-2 inline-block h-4 w-4" />
                {tag.name}
              </button>
            ))}
          </div>
        </div>
        <div>
          <Link href="/notes/new" className="flex items-center rounded-md px-2 py-1 hover:bg-accent hover:text-accent-foreground">
            <FileText className="mr-2 h-4 w-4" />
            New Note
          </Link>
        </div>
      </div>
    </div>
  )
}

