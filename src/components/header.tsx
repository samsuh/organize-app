import Link from 'next/link'

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Input,
  Button,
  Avatar,
} from '@nextui-org/react'

import { auth } from '@/auth'

export default async function Header() {
  const session = await auth()

  return (
    <Navbar className='mb-6'>
      <NavbarBrand>
        <Link href='/' className='font-bold'>
          Organize App
        </Link>
      </NavbarBrand>
      <NavbarContent className='justify-center'>
        <NavbarItem>
          <Input />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent className='justify-end'>
        {session?.user ? <div>Signed In</div> : <div>Signed Out</div>}
      </NavbarContent>
    </Navbar>
  )
}
