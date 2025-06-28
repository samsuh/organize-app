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
import FormButton from '../common/form-button'

export default function ProjectCreateForm() {
  const [formState, action, isPending] = useActionState(actions.createProject, {
    errors: {},
  })

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    let n8nWebhookResponse = await fetch(
      'http://localhost:5678/webhook-test/58cdf091-ac53-4b76-bc72-a16e8663e2e7',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData.get('description')),
      }
    )
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
            <FormButton isLoading={isPending}>Save</FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  )
}
