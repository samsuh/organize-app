import { db } from '@/db'
import paths from '@/paths'
import { Chip } from '@nextui-org/react'
import Link from 'next/link'

//reach into db, get list of projects, then display it
export default async function ProjectList() {
  const projects = await db.project.findMany()

  const renderedProjects = projects.map((project) => {
    return (
      <div key={project.id}>
        <Link href={paths.projectShow(project.slug)}>
          <Chip color='warning' variant='shadow'>
            {project.slug}
          </Chip>
        </Link>
      </div>
    )
  })
  return <div className='flex flex-row flex-wrap gap-2'>{renderedProjects}</div>
}
