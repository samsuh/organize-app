import ProjectCreateForm from '@/components/projects/project-create-form'

export default async function Home() {
  return (
    <div className='grid grid-cols-4 gap-4 p-4'>
      <div className='col-span-3 bg-blue-300'>List of All Tasks</div>
      <div className='bg-red-300'>
        <ProjectCreateForm />
      </div>
    </div>
  )
}
