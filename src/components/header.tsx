import Link from 'next/link'

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Input,
} from '@nextui-org/react'

import { HeaderAuth } from '@/components/header-auth'

export default function Header() {
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
        <HeaderAuth />
      </NavbarContent>
    </Navbar>
  )
}
