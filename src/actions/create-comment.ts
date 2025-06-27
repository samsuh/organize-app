'use server'

import { auth } from '@/auth'
import { db } from '@/db'
import paths from '@/paths'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const createCommentSchema = z.object({
  content: z.string().min(3),
})

interface CreateCommentFormState {
  errors: {
    content?: string[]
    _form?: string[]
  }
  success?: boolean
}

export async function createComment(
  { taskId, parentId }: { taskId: string; parentId?: string },
  formState: CreateCommentFormState,
  formData: FormData
): Promise<CreateCommentFormState> {
  const result = createCommentSchema.safeParse({
    content: formData.get('content'),
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
        _form: ['You must sign in to do this'],
      },
    }
  }

  try {
    await db.comment.create({
      data: {
        content: result.data.content,
        taskId: taskId,
        parentId: parentId,
        userId: session.user.id,
      },
    })
  } catch (error) {
    if (error instanceof Error) {
      return {
        errors: {
          _form: [error.message],
        },
      }
    } else {
      return {
        errors: {
          _form: ['Something went wrong'],
        },
      }
    }
  }

  const project = await db.project.findFirst({
    where: { tasks: { some: { id: taskId } } },
  })

  if (!project) {
    return {
      errors: {
        _form: ['Failed to revalidate project'],
      },
    }
  }

  //revalidate task show page
  revalidatePath(paths.taskShow(project.slug, taskId))
  return {
    errors: {},
    success: true,
  }
}
