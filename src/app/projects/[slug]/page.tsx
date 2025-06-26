import TaskCreateForm from '@/components/tasks/task-create-form'

interface ProjectShowPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function ProjectShowPage({
  params,
}: ProjectShowPageProps) {
  const { slug } = await params

  return (
    <div className='grid grid-cols-4 gap-3 p-4'>
      <div className='col-span-3'>
        <h1 className='text-2xl font-bold mb-2'>{slug}</h1>
      </div>
      <div>
        <TaskCreateForm slug={slug} />
      </div>
    </div>
  )
}
