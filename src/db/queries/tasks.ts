import type { Task } from '@prisma/client'
import { db } from '@/db'

export type TaskWithData = Task & {
  project: { slug: string }
  user: { name: string | null }
  _count: { comments: number }
}
export function fetchTasksByProjectSlug(slug: string): Promise<TaskWithData[]> {
  return db.task.findMany({
    where: {
      project: { slug },
    },
    include: {
      project: { select: { slug: true } },
      user: { select: { name: true } },
      _count: { select: { comments: true } },
    },
    orderBy: [{ taskCost: 'desc' }],
  })
}
