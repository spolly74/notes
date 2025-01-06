// File: src/app/page.tsx

import { Suspense } from 'react'
import { NoteList, TodoList, TagCloud } from '@/components'

export default async function HomePage() {
  return (
    <div className="flex min-h-screen">
      {/* Left Sidebar */}
      <div className="w-64 border-r">
        <button className="w-full p-4 text-left font-medium">
          + New Note
        </button>
        <nav>
          {/* TODO: Add navigation items */}
        </nav>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Suspense fallback={<div>Loading...</div>}>
          <section>
            <h2 className="text-xl font-semibold mb-4">Recent Notes</h2>
            {/* TODO: Add NoteList component */}
          </section>

          <section className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Upcoming Tasks</h2>
            {/* TODO: Add TodoList component */}
          </section>
        </Suspense>
      </main>

      {/* Right Sidebar */}
      <div className="w-64 border-l p-4">
        {/* TODO: Add TagCloud component */}
      </div>
    </div>
  )
}
