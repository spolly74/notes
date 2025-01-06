"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Task, PriorityBadge, EffortBadge, DateBadge } from "./action-sidebar"

interface TaskDialogProps {
  task: Task
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TaskDialog({ task, open, onOpenChange }: TaskDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{task.title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <PriorityBadge priority={task.priority} />
            <EffortBadge effort={task.effort} />
            <DateBadge date={task.dueDate} />
          </div>
          <div>
            <h4 className="font-semibold">Status</h4>
            <p>{task.status}</p>
          </div>
          <div>
            <h4 className="font-semibold">Description</h4>
            <p>{task.description}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

