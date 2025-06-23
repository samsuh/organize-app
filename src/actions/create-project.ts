'use server'

import type { Project } from '@prisma/client'
import { z } from 'zod'
import { auth } from '@/auth'
import { db } from '@/db'
import paths from '@/paths'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

const createProjectSchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/^[a-z-]+$/, {
      message: 'Must be lowercase letters or dashes without spaces',
    }),
  description: z.string().min(10),
  balance: z
    .number({ message: 'Initial Deposit must be at least 100 credits' })
    .min(100),
})

interface CreateProjectFormState {
  errors: {
    name?: string[]
    description?: string[]
    balance?: string[]
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
    balance: Number(formData.get('balance')),
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

  let project: Project
  //Add Balance check
  //Deduct Balance
  try {
    project = await db.project.create({
      data: {
        slug: result.data.name,
        description: result.data.description,
        balance: result.data.balance,
      },
    })
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      }
    } else {
      return {
        errors: {
          _form: ['Something went wrong.'],
        },
      }
    }
  }
  revalidatePath('/')
  redirect(paths.projectShow(project.slug))
}
