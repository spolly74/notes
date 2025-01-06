"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bot, CheckCircle, AlertTriangle, Clock, BarChart, Plus } from 'lucide-react'
import Link from 'next/link'
import { TaskDialog } from './task-dialog'
import { NewTaskDialog } from './new-task-dialog'

export type Priority = 'Low' | 'Medium' | 'High'
export type Effort = 'S' | 'M' | 'L'
export type Status = 'Not Started' | 'In Progress' | 'Completed'

export interface Task {
  id: string;
  title: string;
  status: Status;
  priority: Priority;
  effort: Effort;
  dueDate: string;
  description?: string;
}

const tasks: Task[] = [
  {
    id: "1",
    title: "Review project plan",
    status: "Completed",
    priority: "High",
    effort: "M",
    dueDate: "2023-06-15",
    description: "Go through the entire project plan and make notes on areas that need clarification or updates."
  },
  {
    id: "2",
    title: "Update documentation",
    status: "In Progress",
    priority: "Medium",
    effort: "L",
    dueDate: "2023-06-20",
    description: "Update the user guide and API documentation with the latest features and changes."
  },
  {
    id: "3",
    title: "Prepare presentation",
    status: "Not Started",
    priority: "Low",
    effort: "S",
    dueDate: "2023-06-25",
    description: "Create a presentation summarizing the project status and upcoming milestones for the stakeholder meeting."
  }
]

export function PriorityBadge({ priority }: { priority: Priority }) {
  const colorMap = {
    Low: "bg-green-100 text-green-800",
    Medium: "bg-yellow-100 text-yellow-800",
    High: "bg-red-100 text-red-800"
  }
  return (
    <Badge variant="outline" className={`${colorMap[priority]} font-semibold`}>
      <AlertTriangle className="w-3 h-3 mr-1" />
      {priority}
    </Badge>
  )
}

export function EffortBadge({ effort }: { effort: Effort }) {
  return (
    <Badge variant="outline" className="bg-blue-100 text-blue-800 font-semibold">
      <BarChart className="w-3 h-3 mr-1" />
      {effort}
    </Badge>
  )
}

export function DateBadge({ date }: { date: string }) {
  return (
    <Badge variant="outline" className="bg-purple-100 text-purple-800 font-semibold">
      <Clock className="w-3 h-3 mr-1" />
      {new Date(date).toLocaleDateString()}
    </Badge>
  )
}

export function ActionSidebar() {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [isNewTaskDialogOpen, setIsNewTaskDialogOpen] = useState(false)

  return (
    <div className="w-[300px] border-l bg-muted/40">
      <div className="flex h-full flex-col">
        <div className="flex-1 space-y-4 p-4">
          <Card>
            <CardHeader className="pb-2 flex justify-between items-center">
              <CardTitle className="text-sm font-medium">Action Items</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setIsNewTaskDialogOpen(true)}>
                <Plus className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {tasks.map((task) => (
                <div key={task.id} className="space-y-2 cursor-pointer" onClick={() => setSelectedTask(task)}>
                  <div className="flex items-start">
                    <CheckCircle className={`mr-2 h-4 w-4 flex-shrink-0 ${task.status === 'Completed' ? 'text-green-500' : 'text-muted-foreground'}`} />
                    <span className={`text-sm ${task.status === 'Completed' ? 'line-through text-muted-foreground' : ''}`}>
                      {task.title}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 ml-6">
                    <PriorityBadge priority={task.priority} />
                    <EffortBadge effort={task.effort} />
                    <DateBadge date={task.dueDate} />
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Link href="/tasks" className="w-full">
                <Button variant="outline" className="w-full">View All Tasks</Button>
              </Link>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">AI Chat</CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="secondary" className="w-full" size="sm">
                <Bot className="mr-2 h-4 w-4" />
                Start Chat
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      {selectedTask && (
        <TaskDialog task={selectedTask} open={!!selectedTask} onOpenChange={() => setSelectedTask(null)} />
      )}
      <NewTaskDialog open={isNewTaskDialogOpen} onOpenChange={setIsNewTaskDialogOpen} />
    </div>
  )
}

