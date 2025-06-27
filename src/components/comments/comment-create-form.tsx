'use client'

import { useActionState, useEffect, useRef, useState } from 'react'
import * as actions from '@/actions'
import { Button, Textarea } from '@nextui-org/react'
import FormButton from '../common/form-button'

interface CommentCreateFormProps {
  taskId: string
  parentId?: string
  startOpen?: boolean
}

export default function CommentCreateForm({
  taskId,
  parentId,
  startOpen,
}: CommentCreateFormProps) {
  const [open, setOpen] = useState(startOpen)
  const ref = useRef<HTMLFormElement | null>(null)
  const [formState, action, isPending] = useActionState(
    actions.createComment.bind(null, { taskId, parentId }),
    { errors: {} }
  )

  useEffect(() => {
    if (formState.success) {
      ref.current?.reset()
    }
    if (!startOpen) {
      setOpen(false)
    }
  }, [formState, startOpen])

  const form = (
    <form action={action} ref={ref}>
      <Textarea
        name='content'
        label='Reply'
        placeholder='Enter your comment'
        isInvalid={!!formState.errors.content}
        errorMessage={!!formState.errors.content?.join(', ')}
      />

      {formState.errors._form ? (
        <div className='text-red-600 border border-red-600 p-2 rounded-md bg-red-100'>
          {formState.errors._form.join(', ')}
        </div>
      ) : null}
      <FormButton isLoading={isPending}>Create Comment</FormButton>
    </form>
  )

  return (
    <div>
      <Button size='sm' variant='light' onClick={() => setOpen(!open)}>
        Reply
      </Button>
      {open && form}
    </div>
  )
}
