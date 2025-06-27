import paths from '@/paths'
import Link from 'next/link'

interface TaskShowPageProps {
  params: Promise<{
    slug: string
    taskId: string
  }>
}

export default async function TaskShowPage({ params }: TaskShowPageProps) {
  const { slug, taskId } = await params

  return (
    <div className='space-y-3'>
      <Link
        className='underline decoration-solid'
        href={paths.projectShow(slug)}
      >
        {'< '} Back to {slug}
      </Link>
    </div>
  )
}
