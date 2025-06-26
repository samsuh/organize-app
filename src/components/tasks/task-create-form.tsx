'use client'

import { useActionState, startTransition } from 'react'
import * as actions from '@/actions'
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
} from '@nextui-org/react'
import FormButton from '@/components/common/form-button'

export default function TaskCreateForm() {
  const [formState, action, isPending] = useActionState(actions.createTask, {
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
    <Popover placement='left-start'>
      <PopoverTrigger>
        <Button color='primary'>Add New Task</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form onSubmit={handleSubmit} noValidate>
          <div className='flex flex-col gap-4 p-4 w-96'>
            <h3 className='text-lg'>Create a Task</h3>
            <Input
              name='title'
              label='Title'
              labelPlacement='outside'
              placeholder='Title'
              isInvalid={!!formState.errors.title}
              errorMessage={formState.errors.title?.join(', ')}
            />
            <Textarea
              name='description'
              label='Description'
              labelPlacement='outside'
              placeholder='Describe the Task'
              isInvalid={!!formState.errors.description}
              errorMessage={formState.errors.description?.join(', ')}
            />
            <Input
              name='cost'
              type='number'
              label='Estimated Cost to complete Task (in credits)'
              labelPlacement='outside'
              placeholder='5'
              isInvalid={!!formState.errors.cost}
              errorMessage={formState.errors.cost?.join(', ')}
            />
            {formState.errors._form ? (
              <div className='text-red-600 border border-red-600 p-2 rounded-md bg-red-100'>
                {formState.errors._form.join(', ')}
              </div>
            ) : null}
            <FormButton isLoading={isPending}>Create Task</FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  )
}
