import { auth } from '@/auth'
import Profile from '@/components/profile'
import ProjectCreateForm from '@/components/projects/project-create-form'
import ProjectList from '@/components/projects/project-list'

export default async function Home() {
  const session = await auth()
  return (
    <>
      <h2>
        {session?.user ? (
          <div>{JSON.stringify(session.user)}</div>
        ) : (
          <div>Signed Out</div>
        )}
        <Profile />
      </h2>
      <div className='grid grid-cols-4 gap-4 p-4 border'>
        <div className='col-span-3 bg-blue-300'>
          <h3 className='text-lg'>Projects</h3>
          <ProjectList />
        </div>
        <ProjectCreateForm />
      </div>
      <div className='col-span-3 p-2 bg-red-300'>List All Tasks</div>
    </>
  )
}
