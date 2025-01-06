"use client"

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Priority, Effort, Status } from "./action-sidebar"

interface NewTaskDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NewTaskDialog({ open, onOpenChange }: NewTaskDialogProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<Priority>('Medium')
  const [effort, setEffort] = useState<Effort>('M')
  const [status, setStatus] = useState<Status>('Not Started')
  const [dueDate, setDueDate] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send this data to your backend or state management solution
    console.log({ title, description, priority, effort, status, dueDate })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input 
            placeholder="Task Title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
          <Textarea 
            placeholder="Task Description" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
          />
          <Select value={priority} onValueChange={(value: Priority) => setPriority(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Low">Low</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="High">High</SelectItem>
            </SelectContent>
          </Select>
          <Select value={effort} onValueChange={(value: Effort) => setEffort(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Effort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="S">Small</SelectItem>
              <SelectItem value="M">Medium</SelectItem>
              <SelectItem value="L">Large</SelectItem>
            </SelectContent>
          </Select>
          <Select value={status} onValueChange={(value: Status) => setStatus(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Not Started">Not Started</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <Input 
            type="date" 
            value={dueDate} 
            onChange={(e) => setDueDate(e.target.value)} 
            required 
          />
          <Button type="submit">Create Task</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

