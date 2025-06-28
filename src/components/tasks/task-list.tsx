import type { TaskWithData } from '@/db/queries/tasks'
import paths from '@/paths'
import Link from 'next/link'

interface TaskListProps {
  fetchData: () => Promise<TaskWithData[]>
}

export default async function TaskList({ fetchData }: TaskListProps) {
  const tasks = await fetchData()

  const renderedTasks = tasks.map((task) => {
    const projectSlug = task.project.slug

    if (!projectSlug) {
      throw new Error('Project slug needed to link to a task')
    }

    return (
      <div key={task.id} className='border rounded p-2'>
        <Link href={paths.taskShow(projectSlug, task.id)}>
          <h3 className='text-lg font-bold'>{task.title}</h3>
          <p className='text-xs'>Task Value: {task.taskCost} credits</p>
          <div className='flex flex-row gap-8'>
            <p className='text-xs text-gray-400'>By {task.user.name}</p>
            <p className='text-xs text-gray-400'>
              {task._count.comments} comments
            </p>
            <p className='text-xs text-gray-400'>
              Created {JSON.stringify(task.createdAt)}
            </p>
          </div>
        </Link>
      </div>
    )
  })
  return <div className='space-y-2'>{renderedTasks}</div>
}
