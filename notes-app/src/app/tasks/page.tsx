"use client"

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Task, PriorityBadge, EffortBadge, DateBadge } from "../components/action-sidebar"
import { ArrowUpDown } from 'lucide-react'

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

type SortKey = 'status' | 'dueDate' | 'priority' | 'effort'

export default function TasksPage() {
  const [sortKey, setSortKey] = useState<SortKey>('dueDate')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortKey === 'dueDate') {
      return sortOrder === 'asc' 
        ? new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        : new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()
    }
    if (a[sortKey] < b[sortKey]) return sortOrder === 'asc' ? -1 : 1
    if (a[sortKey] > b[sortKey]) return sortOrder === 'asc' ? 1 : -1
    return 0
  })

  const toggleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortOrder('asc')
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">All Tasks</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => toggleSort('status')}>
                Status <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => toggleSort('priority')}>
                Priority <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => toggleSort('effort')}>
                Effort <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => toggleSort('dueDate')}>
                Due Date <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedTasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>{task.title}</TableCell>
              <TableCell>{task.status}</TableCell>
              <TableCell><PriorityBadge priority={task.priority} /></TableCell>
              <TableCell><EffortBadge effort={task.effort} /></TableCell>
              <TableCell><DateBadge date={task.dueDate} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

