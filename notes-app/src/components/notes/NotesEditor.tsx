// File: src/components/notes/NoteEditor.tsx

import { useState } from 'react'
import { useEditor } from '@tiptap/react'
import { Note, Tag } from '@/types'

interface NoteEditorProps {
  initialNote?: Note
  tags?: Tag[]
  onSave?: (note: Note) => void
}

export default function NoteEditor({ initialNote, tags, onSave }: NoteEditorProps) {
  // TODO: Initialize TipTap editor with custom extensions
  // TODO: Implement file attachment handling
  // TODO: Implement tag management
  // TODO: Add todo conversion functionality

  return (
    <div className="w-full h-full">
      {/* TODO: Implement toolbar */}
      <div className="min-h-[500px]">
        {/* TODO: Add editor content */}
      </div>
      {/* TODO: Add tag selection */}
      {/* TODO: Add file attachment UI */}
    </div>
  )
}
