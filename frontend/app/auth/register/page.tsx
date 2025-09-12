'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Shield } from 'lucide-react'
import LoadingSpinner from '@/components/LoadingSpinner'
import useToast from '@/hooks/useToast'
import { apiClient } from '@/lib/api'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !password) {
      toast({ type: 'error', title: 'Please fill in all fields' })
      return
    }
    setIsLoading(true)
    try {
      const res = await apiClient.register(name, email, password)
      // apiClient.setToken(res.token)
      localStorage.setItem('token', res.token)
      toast({ type: 'success', title: 'Registration successful!' })
      router.push('/dashboard')
    } catch (error: any) {
      toast({ type: 'error', title: error.message || 'Registration failed' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-10">
        <div className="text-center space-y-4">
          <div className="flex justify-center mb-2">
            <Shield className="h-12 w-12 text-blue-600" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">
            Create an account on Signal Watcher
          </h2>
          <p className="text-sm text-gray-600">
            Monitor security events with AI
          </p>
        </div>

        <Card>
          <CardHeader className="space-y-2">
            <CardTitle>Register</CardTitle>
            <CardDescription>
              Enter your details to create an account
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Your name"
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Your email"
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Create a password"
                  disabled={isLoading}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-6 mt-2">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    Creating account...
                  </>
                ) : (
                  'Sign up'
                )}
              </Button>
              <div className="text-center text-sm mt-2">
                <span className="text-gray-600">Already have an account? </span>
                <Link
                  href="/auth/login"
                  className="font-medium text-blue-600 hover:text-blue-500">
                  Log in
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
