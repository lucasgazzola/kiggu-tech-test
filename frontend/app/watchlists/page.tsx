'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { apiClient } from '@/lib/api'
import { Watchlist, WatchlistTerm } from '@/lib/types'
import ProtectedRoute from '@/components/ProtectedRoute'
import Navbar from '@/components/Navbar'
import LoadingSpinner from '@/components/LoadingSpinner'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Plus, Eye, Trash2, Search, FileText, X } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

export default function WatchlistsPage() {
  const { user } = useAuth()
  const [watchlists, setWatchlists] = useState<Watchlist[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isCreating, setIsCreating] = useState(false)

  // Create form state
  const [createForm, setCreateForm] = useState<{
    name: string
    description: string
    terms: WatchlistTerm[]
  }>({
    name: '',
    description: '',
    terms: [],
  })

  const loadWatchlists = async () => {
    try {
      setLoading(true)
      const data = await apiClient.getWatchlists()
      setWatchlists(data)
    } catch (error) {
      toast.error(
        typeof error === 'object' && error && 'message' in error
          ? (error as { message?: string }).message ||
              'Failed to load watchlists'
          : 'Failed to load watchlists'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadWatchlists()
  }, [])

  const handleCreateWatchlist = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!createForm.name.trim()) {
      toast.error('Please enter a name for the watchlist')
      return
    }

    if (!user?.id) {
      toast.error('User not found')
      return
    }

    // Filter out empty terms
    const validTerms = createForm.terms.filter(term => term.value.trim() !== '')

    if (validTerms.length === 0) {
      toast.error('Please add at least one term')
      return
    }

    setIsCreating(true)

    try {
      await apiClient.createWatchlist({
        name: createForm.name.trim(),
        description: createForm.description.trim(),
        ownerId: user.id,
        terms: validTerms,
      })

      toast.success('Watchlist created successfully')
      setIsCreateDialogOpen(false)
      setCreateForm({ name: '', description: '', terms: [] })
      loadWatchlists()
    } catch (error) {
      toast.error(
        typeof error === 'object' && error && 'message' in error
          ? (error as { message?: string }).message ||
              'Failed to create watchlist'
          : 'Failed to create watchlist'
      )
    } finally {
      setIsCreating(false)
    }
  }

  const handleDeleteWatchlist = async (id: string, name: string) => {
    try {
      await apiClient.deleteWatchlist(id)
      toast.success(`Watchlist ${name} deleted successfully`)
      loadWatchlists()
    } catch (error) {
      toast.error(
        typeof error === 'object' && error && 'message' in error
          ? (error as { message?: string }).message ||
              'Failed to delete watchlist'
          : 'Failed to delete watchlist'
      )
    }
  }

  const addTerm = () => {
    setCreateForm(prev => ({
      ...prev,
      terms: [...prev.terms, { value: '' }],
    }))
  }

  const removeTerm = (index: number) => {
    setCreateForm(prev => ({
      ...prev,
      terms: prev.terms.filter((_, i) => i !== index),
    }))
  }

  const updateTerm = (index: number, value: string) => {
    setCreateForm(prev => ({
      ...prev,
      terms: prev.terms.map((term, i) => (i === index ? { value } : term)),
    }))
  }

  const filteredWatchlists = watchlists.filter(
    watchlist =>
      watchlist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      watchlist.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) {
    return (
      <ProtectedRoute>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <LoadingSpinner size="lg" />
            <p className="mt-2 text-sm text-zinc-600">Loading watchlists...</p>
          </div>
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <Navbar />
      <div className="min-h-screen bg-zinc-50">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="px-4 py-8 sm:px-0">
            <div className="flex flex-col items-center justify-between xl:flex-row gap-4">
              <div>
                <h1 className="text-3xl text-center 2xl:text-start font-bold text-zinc-900">
                  Watchlists
                </h1>
                <p className="mt-1 text-sm text-zinc-600">
                  Organize and monitor your custom security watchlists
                </p>
              </div>
              <Dialog
                open={isCreateDialogOpen}
                onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-zinc-900 text-white font-semibold shadow-lg hover:bg-zinc-800 transition-colors px-5 py-2 rounded-lg w-full max-w-[200px]">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Watchlist
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <form onSubmit={handleCreateWatchlist}>
                    <DialogHeader>
                      <DialogTitle>Create New Watchlist</DialogTitle>
                      <DialogDescription>
                        Create a new watchlist to monitor specific terms and
                        patterns.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          value={createForm.name}
                          onChange={e =>
                            setCreateForm(prev => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                          placeholder="Enter watchlist name"
                          disabled={isCreating}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={createForm.description}
                          onChange={e =>
                            setCreateForm(prev => ({
                              ...prev,
                              description: e.target.value,
                            }))
                          }
                          placeholder="Describe what this watchlist monitors"
                          disabled={isCreating}
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label>Terms to monitor</Label>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={addTerm}
                            disabled={isCreating}>
                            Add Term
                          </Button>
                        </div>
                        {createForm.terms.map((term, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2">
                            <Input
                              value={term.value}
                              onChange={e => updateTerm(index, e.target.value)}
                              placeholder="Enter term (e.g., domain, keyword, IP)"
                              disabled={isCreating}
                            />
                            {createForm.terms.length > 1 && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeTerm(index)}
                                disabled={isCreating}>
                                <X className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsCreateDialogOpen(false)}
                        disabled={isCreating}>
                        Cancel
                      </Button>
                      <Button type="submit" disabled={isCreating}>
                        {isCreating ? (
                          <>
                            <LoadingSpinner size="sm" className="mr-2" />
                            Creating...
                          </>
                        ) : (
                          'Create Watchlist'
                        )}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Search */}
          <div className="px-4 sm:px-0 mb-6">
            <div className="max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search watchlists..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          {/* Watchlists Grid */}
          {filteredWatchlists.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
              {filteredWatchlists.map(watchlist => (
                <Card
                  key={watchlist.id}
                  className="relative overflow-hidden border border-zinc-200 bg-white rounded-xl shadow-sm hover:shadow-xl transition-shadow duration-200 group">
                  <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-zinc-400 to-zinc-200 group-hover:from-zinc-700 group-hover:to-zinc-400 transition-all" />
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg font-bold text-zinc-900 mb-1 flex items-center gap-2">
                          <FileText className="h-5 w-5 text-zinc-500 group-hover:text-zinc-700 transition-colors" />
                          <span className="group-hover:text-zinc-700 transition-colors">
                            {watchlist.name}
                          </span>
                        </CardTitle>
                        <CardDescription className="mt-1 text-zinc-600 group-hover:text-zinc-800 transition-colors">
                          {watchlist.description || 'No description provided'}
                        </CardDescription>
                      </div>
                      <div className="flex flex-col md:flex-row 2xl:flex-col gap-2">
                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                          className="border-zinc-300 text-zinc-700 font-medium hover:bg-zinc-100">
                          <Link href={`/watchlists/${watchlist.id}`}>
                            <Eye className="h-4 w-4 mr-1 text-zinc-500" />
                            <span className="text-xs">View</span>
                          </Link>
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="destructive"
                              size="sm"
                              className="font-medium">
                              <Trash2 className="h-4 w-4" />
                              <span className="text-xs">Delete</span>
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Delete Watchlist
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                {`Are you sure you want to delete "${watchlist.name}"? This action cannot be undone.`}
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 hover:shadow-red-700/50"
                                onClick={() =>
                                  handleDeleteWatchlist(
                                    watchlist.id,
                                    watchlist.name
                                  )
                                }>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="secondary"
                          className="px-2 py-1 text-xs font-semibold bg-zinc-200 text-zinc-900 border-zinc-300 shadow-sm">
                          {watchlist.terms.length} terms
                        </Badge>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-zinc-700 mb-2">
                          Monitored terms
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {watchlist.terms.slice(0, 3).map((term, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs px-2 py-1 font-medium border-zinc-300 text-zinc-700 bg-zinc-50">
                              {term.value}
                            </Badge>
                          ))}
                          {watchlist.terms.length > 3 && (
                            <Badge
                              variant="outline"
                              className="text-xs px-2 py-1 font-medium border-zinc-300 text-zinc-700 bg-zinc-50">
                              +{watchlist.terms.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="h-16 w-16 text-zinc-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-zinc-900 mb-2">
                {searchQuery ? 'No watchlists found' : 'No watchlists yet'}
              </h3>
              <p className="text-zinc-500 mb-6 max-w-md mx-auto">
                {searchQuery
                  ? "Try adjusting your search terms to find what you're looking for."
                  : 'Create your first watchlist to start monitoring security events and patterns.'}
              </p>
              {!searchQuery && (
                <Dialog
                  open={isCreateDialogOpen}
                  onOpenChange={setIsCreateDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="secondary">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Your First Watchlist
                    </Button>
                  </DialogTrigger>
                </Dialog>
              )}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  )
}
