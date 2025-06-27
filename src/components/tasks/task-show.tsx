//still need to complete this
interface TaskShowProps {}

export default function TaskShow({}: TaskShowProps) {
  return (
    <div className='m-4'>
      <h1 className='text-2xl font-bold my-2'>{task.title}</h1>
      <p className='p-4 border rounded'>{task.content}</p>
    </div>
  )
}
