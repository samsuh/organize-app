'use client'

import { useSession } from 'next-auth/react'

import {
  NavbarItem,
  Button,
  Avatar,
  PopoverTrigger,
  Popover,
  PopoverContent,
} from '@nextui-org/react'
import * as actions from '@/actions'

export function HeaderAuth() {
  const session = useSession()

  let authContent: React.ReactNode

  if (session.status === 'loading') {
    authContent = null
  } else if (session.data?.user) {
    authContent = (
      <Popover>
        <PopoverTrigger>
          <Avatar src={session.data.user.image || ''} />
        </PopoverTrigger>
        <PopoverContent>
          <form action={actions.signOut} className='px-4 py-2'>
            <Button type='submit'>Sign Out</Button>
          </form>
        </PopoverContent>
      </Popover>
    )
  } else {
    authContent = (
      <>
        <NavbarItem>
          <form action={actions.signIn}>
            <Button type='submit' variant='bordered' color='secondary'>
              Sign In
            </Button>
          </form>
        </NavbarItem>
        <NavbarItem>
          <form action={actions.signIn}>
            <Button type='submit' variant='solid' color='primary'>
              Sign Up
            </Button>
          </form>
        </NavbarItem>
      </>
    )
  }
  return authContent
}
