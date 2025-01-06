import { Card } from "@/components/ui/card"
import { NoteList } from "@/components/note-list"

export default function NotesPage() {
  return (
    <div className="p-4">
      <Card className="h-full">
        <NoteList />
      </Card>
    </div>
  )
}

