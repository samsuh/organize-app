'use server'

import type { Task } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { auth } from '@/auth'
import { db } from '@/db'
import paths from '@/paths'

const createTaskSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  cost: z.number({ message: 'Must be greater than 0' }).gt(0),
})

interface CreateTaskFormState {
  errors: {
    title?: string[]
    description?: string[]
    cost?: string[]
    _form?: string[]
  }
}

export async function createTask(
  formState: CreateTaskFormState,
  formData: FormData
): Promise<CreateTaskFormState> {
  const result = createTaskSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    cost: Number(formData.get('cost')),
  })

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    }
  }

  const session = await auth()
  if (!session || !session.user) {
    return { errors: { _form: ['You must be signed in to do this'] } }
  }

  //actually create the task in the db
  //first we need to associate the task to the project. prop drill the slug down to the TaskCreateForm from ProjectShowPage as slug={slug}

  return { errors: {} }
  //todo: revalidate project show page
}
