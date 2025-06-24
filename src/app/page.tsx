import { auth } from '@/auth'
import Profile from '@/components/profile'
import ProjectCreateForm from '@/components/projects/project-create-form'

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
      <div className='grid grid-cols-4 gap-4 p-4'>
        <div className='col-span-3 bg-blue-300'>List of All Tasks</div>
        <div className='bg-red-300'>
          <ProjectCreateForm />
        </div>
      </div>
    </>
  )
}
