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
  taskCost: z.number({ message: 'Must be greater than 0' }).gt(0),
})

interface CreateTaskFormState {
  errors: {
    title?: string[]
    description?: string[]
    taskCost?: string[]
    _form?: string[]
  }
}

export async function createTask(
  slug: string,
  formState: CreateTaskFormState,
  formData: FormData
): Promise<CreateTaskFormState> {
  const result = createTaskSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    taskCost: Number(formData.get('taskCost')),
  })

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    }
  }

  const session = await auth()
  if (!session || !session.user || !session.user.id) {
    return {
      errors: {
        _form: ['You must be signed in to do this'],
      },
    }
  }

  //actually create the task in the db
  //first we need to associate the task to the project. prop drill the slug down to the TaskCreateForm from ProjectShowPage as slug={slug}
  const project = await db.project.findFirst({
    where: { slug },
  })

  if (!project) {
    return {
      errors: {
        _form: ['Cannot find project'],
      },
    }
  }

  //actually create the task in the db
  let task: Task
  try {
    task = await db.task.create({
      data: {
        title: result.data.title,
        description: result.data.description,
        taskCost: result.data.taskCost,
        userId: session.user.id,
        projectId: project.id,
      },
    })
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { errors: { _form: [error.message] } }
    } else {
      return { errors: { _form: ['Failed to create Task'] } }
    }
  }

  //todo: revalidate project show page
  revalidatePath(paths.projectShow(slug))
  redirect(paths.taskShow(slug, task.id))
}
