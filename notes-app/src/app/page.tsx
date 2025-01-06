import { Header } from "./components/header"
import { Sidebar } from "./components/sidebar"
import { ActionSidebar } from "./components/action-sidebar"
import { NoteList } from "./components/note-list"
import { Button } from "@/components/ui/button"
import { Plus } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex h-full flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <NoteList />
          <Button
            size="icon"
            className="fixed bottom-6 right-[320px] h-12 w-12 rounded-full shadow-lg"
          >
            <Plus className="h-6 w-6" />
            <span className="sr-only">New note</span>
          </Button>
        </main>
        <ActionSidebar />
      </div>
    </div>
  )
}

