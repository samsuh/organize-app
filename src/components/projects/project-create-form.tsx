'use client'
import { useActionState, startTransition } from 'react'
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
  const [formState, action] = useActionState(actions.createProject, {
    errors: {},
  })

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    startTransition(() => {
      action(formData)
    })
  }

  return (
    <Popover placement='left'>
      <PopoverTrigger>
        <Button color='primary'>Add Project</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form onSubmit={handleSubmit} noValidate>
          <div className='flex flex-col gap-4 p-4 w-96'>
            <h3 className='text-lg'>Create a Project</h3>
            <Input
              name='name'
              label='Name'
              labelPlacement='outside'
              placeholder='Name'
              isInvalid={!!formState.errors.name}
              errorMessage={formState.errors.name?.join(', ')}
            />
            <Textarea
              name='description'
              label='Description'
              labelPlacement='outside'
              placeholder='Describe your Project'
              isInvalid={!!formState.errors.description}
              errorMessage={formState.errors.description?.join(', ')}
            />
            <Input
              name='balance'
              type='number'
              label='Initial Treasury Deposit (100 credits minimum)'
              labelPlacement='outside'
              placeholder='0'
              isInvalid={!!formState.errors.balance}
              errorMessage={formState.errors.balance?.join(', ')}
            />
            {formState.errors._form ? (
              <div className='text-red-600 border border-red-600 p-2 rounded-md bg-red-100'>
                {formState.errors._form.join(', ')}
              </div>
            ) : null}
            <Button type='submit'>Submit</Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  )
}
