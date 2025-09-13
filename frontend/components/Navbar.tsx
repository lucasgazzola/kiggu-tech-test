'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Shield, Menu, X, LogOut, User, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Watchlists', href: '/watchlists' },
  { name: 'Events', href: '/events' },
]

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    router.push('/auth/login')
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/dashboard" className="flex items-center">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                Signal Watcher
              </span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map(item => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    pathname === item.href
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                    'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                  )}>
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-9 w-9 rounded-full border border-zinc-200 shadow-sm p-0">
                  <Avatar className="h-9 w-9 bg-zinc-100 border border-zinc-300">
                    <AvatarFallback className="flex items-center justify-center h-full w-full bg-zinc-200 text-zinc-700 font-semibold text-lg">
                      {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user?.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="-mr-2 flex items-center sm:hidden">
            <Button
              variant="ghost"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-zinc-700 border border-zinc-200 bg-white shadow-sm hover:bg-zinc-100 hover:text-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-300 transition-colors">
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navigation.map(item => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  pathname === item.href
                    ? 'bg-zinc-100 border-zinc-500 text-zinc-900'
                    : 'border-transparent text-zinc-600 hover:bg-zinc-50 hover:border-zinc-300 hover:text-zinc-900',
                  'block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-150'
                )}
                onClick={() => setMobileMenuOpen(false)}>
                {item.name}
              </Link>
            ))}
          </div>
          <div className="p-4 border-t flex items-center justify-between gap-2 border-zinc-200">
            <div className="flex items-center justify-center px-4">
              <div className="flex-shrink-0">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-zinc-900">
                  {user?.name}
                </div>
                <div className="text-sm font-medium text-zinc-500">
                  {user?.email}
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <Button
                variant="default"
                onClick={handleLogout}
                className="flex w-full max-w-[200px] text-left px-4 py-2 text-base font-medium text-zinc-300 hover:text-zinc-900 hover:bg-zinc-100 transition-colors">
                <span>Sign out</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
