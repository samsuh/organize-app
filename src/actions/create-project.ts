'use server'

import type { Project } from '@prisma/client'
import { db } from '@/db'

export async function createProject(formData: FormData) {
  const name = formData.get('name')
  const description = formData.get('description')

  // console.log(name, title)
  try {
    await db.project.create({
      data: {
        slug: name,
        description: description,
      },
    })
  } catch (err) {}
  //todo: revalidate homepage
}
