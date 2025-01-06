import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function NoteList() {
  return (
    <div className="flex-1 space-y-4 p-4">
      <h2 className="text-lg font-semibold">Recent Notes</h2>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="cursor-pointer hover:bg-accent/50">
            <CardHeader className="pb-2">
              <div className="font-medium">Note {i}</div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                This is a preview of note {i}...
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

