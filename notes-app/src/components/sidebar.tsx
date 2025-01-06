import { Folder, Hash } from 'lucide-react'

export function Sidebar() {
  return (
    <div className="w-[200px] border-r bg-muted/40 p-4">
      <div className="space-y-4">
        <div>
          <h2 className="mb-2 font-semibold">Folders</h2>
          <div className="space-y-1">
            <button className="w-full rounded-md px-2 py-1 text-left hover:bg-accent hover:text-accent-foreground">
              <Folder className="mr-2 inline-block h-4 w-4" />
              Personal
            </button>
            <button className="w-full rounded-md px-2 py-1 text-left hover:bg-accent hover:text-accent-foreground">
              <Folder className="mr-2 inline-block h-4 w-4" />
              Work
            </button>
          </div>
        </div>
        <div>
          <h2 className="mb-2 font-semibold">Tags</h2>
          <div className="space-y-1">
            <button className="w-full rounded-md px-2 py-1 text-left hover:bg-accent hover:text-accent-foreground">
              <Hash className="mr-2 inline-block h-4 w-4" />
              important
            </button>
            <button className="w-full rounded-md px-2 py-1 text-left hover:bg-accent hover:text-accent-foreground">
              <Hash className="mr-2 inline-block h-4 w-4" />
              todo
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

