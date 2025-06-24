// next-auth.d.ts
import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      // default fields
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      // your custom field
      userBalance: number
    }
  }
}
