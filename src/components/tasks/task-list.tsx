import paths from '@/paths'
import Link from 'next/link'

//still have to get the list of tasks into here
export default function TaskList() {
  const renderedTasks = tasks.map((task) => {
    const projectSlug = task.project.slug

    if (!projectSlug) {
      throw new Error('Project slug needed to link to a task')
    }
    return (
      <div key={task.id} className='border rounded p-2'>
        <Link href={paths.taskShow(projectSlug, task.id)}>
          <h3 className='text-lg font-bold'>{task.title}</h3>
          <div className='flex flex-row gap-8'>
            <p>By {task.user.name}</p>
            <p>{task._count.comments}</p>
          </div>
        </Link>
      </div>
    )
  })
}
