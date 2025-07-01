'use server'

import type { Project, Task } from '@prisma/client'
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
  // let n8nWebhookResponse
  //Add Balance check
  console.log('session is:', session)
  console.log('userBalance is:', session.user)
  console.log('userBalance is:', session.user.userBalance)
  //Deduct Balance

  try {
    project = await db.project.create({
      data: {
        slug: result.data.name,
        description: result.data.description,
        balance: result.data.balance,
      },
    })

    //n8n call works and is submitted, but need to bring the result back into the codebase to populate tasks in db then render.
    const n8nWebhookResponse = await fetch(
      'http://localhost:5678/webhook-test/58cdf091-ac53-4b76-bc72-a16e8663e2e7',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData.get('description')),
      }
    )
    const tasks = await n8nWebhookResponse.json()
    console.log(
      'tasks destructured from n8nWebhookResponse after creating project and then doing the webhook POST:',
      tasks
    )

    // Exists in Task Schema
    // taskTitle: 'Analyze Competitor Accounts',
    // description: 'Conduct an analysis of other successful motorcycle Instagram accounts to identify best practices.',
    // taskCost: '45'

    // Not yet added to Task Schema
    // deliverable: 'A report summarizing key findings and strategies from competitor accounts.',
    // acceptanceCriteria: 'The report provides insights into at least 5 competitor accounts and includes actionable takeaways.',
    // dependencies: 'None',

    if (Array.isArray(tasks) && tasks.length > 0) {
      await db.task.createMany({
        data: tasks.map((task) => ({
          title: task.taskTitle,
          description: task.description,
          taskCost: Number(task.taskCost),
          projectId: project.id,
          userId: session.user.id,
        })),
      })
    }
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
