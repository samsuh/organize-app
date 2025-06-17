import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
} from '@nextui-org/react'
import * as actions from '@/actions'

export default function ProjectCreateForm() {
  return (
    <Popover placement='left'>
      <PopoverTrigger>
        <Button color='primary'>Add Project</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={actions.createProject}>
          <div className='flex flex-col gap-4 p-4 w-80'>
            <h3 className='text-lg'>Create a Project</h3>
            <Input
              name='name'
              label='name'
              labelPlacement='outside'
              placeholder='Name'
            />
            <Textarea
              name='description'
              label='description'
              labelPlacement='outside'
              placeholder='Describe your Project'
            />
            <Button type='submit'>Submit</Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  )
}
