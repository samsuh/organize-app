'use server'

import { z } from 'zod'
import { db } from '@/db'
import { auth } from '@/auth'

const createProjectSchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/^[a-z-]+$/, {
      message: 'Must be lowercase letters or dashes without spaces',
    }),
  description: z.string().min(10),
})

interface CreateProjectFormState {
  errors: {
    name?: string[]
    description?: string[]
    _form?: string[]
  }
}

export async function createProject(
  formState: CreateProjectFormState,
  formData: FormData
): Promise<CreateProjectFormState> {
  const result = createProjectSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
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

  return {
    errors: {},
  }
  // const name = formData.get('name')
  // const description = formData.get('description')
  // console.log(name, title)
  // try {
  //   await db.project.create({
  //     data: {
  //       slug: name,
  //       description: description,
  //     },
  //   })
  // } catch (err) {}
  //todo: revalidate homepage
}
