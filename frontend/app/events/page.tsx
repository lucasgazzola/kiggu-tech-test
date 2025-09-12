'use client'

import { useState, useEffect } from 'react'
import { apiClient } from '@/lib/api'
import { Event, EventSeverity } from '@/lib/types'
import ProtectedRoute from '@/components/ProtectedRoute'
import Navbar from '@/components/Navbar'
import LoadingSpinner from '@/components/LoadingSpinner'
import SeverityBadge from '@/components/SeverityBadge'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
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
  Plus,
  Search,
  Activity,
  Brain,
  Eye,
  RefreshCw,
  Filter,
  AlertCircle,
} from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [severityFilter, setSeverityFilter] = useState<EventSeverity | 'ALL'>(
    'ALL'
  )
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [enrichingEvents, setEnrichingEvents] = useState<Set<string>>(new Set())

  // Create form state
  const [createForm, setCreateForm] = useState({
    title: '',
    description: '',
  })

  const loadData = async () => {
    try {
      setLoading(true)
      const eventsData = await apiClient.getEvents()
      setEvents(eventsData)
    } catch (error) {
      toast.error('Failed to load data')
      console.error('Data loading error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!createForm.title.trim() || !createForm.description.trim()) {
      toast.error('Please fill in all required fields')
      return
    }

    setIsCreating(true)

    try {
      await apiClient.createEvent({
        title: createForm.title.trim(),
        description: createForm.description.trim(),
      })
      toast.success('Event created successfully')
      setIsCreateDialogOpen(false)
      setCreateForm({ title: '', description: '' })
      loadData()
    } catch (error) {
      toast.error(typeof error === 'object' && error && 'message' in error ? (error as { message?: string }).message || 'Failed to create event' : 'Failed to create event')
    } finally {
      setIsCreating(false)
    }
  }

  const handleEnrichEvent = async (eventId: string) => {
    setEnrichingEvents(prev => new Set(prev).add(eventId))

    try {
      const enrichedEvent = await apiClient.enrichEvent(eventId)
      setEvents(prev =>
        prev.map(event => (event.id === eventId ? enrichedEvent : event))
      )
      toast.success('Event enriched successfully')
    } catch (error) {
      toast.error(typeof error === 'object' && error && 'message' in error ? (error as { message?: string }).message || 'Failed to enrich event' : 'Failed to enrich event')
    } finally {
      setEnrichingEvents(prev => {
        const newSet = new Set(prev)
        newSet.delete(eventId)
        return newSet
      })
    }
  }

  const filteredEvents = events.filter(event => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (event.summary &&
        event.summary.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesSeverity =
      severityFilter === 'ALL' || event.severity === severityFilter

    return matchesSearch && matchesSeverity
  })

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Unknown'
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (loading) {
    return (
      <ProtectedRoute>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <LoadingSpinner size="lg" />
            <p className="mt-2 text-sm text-gray-600">Loading events...</p>
          </div>
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="px-4 py-6 sm:px-0">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Security Events
                </h1>
                <p className="mt-1 text-sm text-gray-600">
                  Monitor and analyze security events across your watchlists
                </p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="flex gap-2">
                  <Button onClick={loadData} variant="secondary">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                  </Button>
                  <Dialog
                    open={isCreateDialogOpen}
                    onOpenChange={setIsCreateDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="default">
                        <Plus className="h-4 w-4 mr-2" />
                        Simulate Event
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <form onSubmit={handleCreateEvent}>
                        <DialogHeader>
                          <DialogTitle>Simulate Security Event</DialogTitle>
                          <DialogDescription>
                            Create a simulated security event for testing and
                            training purposes.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="title">Event Title *</Label>
                            <Input
                              id="title"
                              value={createForm.title}
                              onChange={e =>
                                setCreateForm(prev => ({
                                  ...prev,
                                  title: e.target.value,
                                }))
                              }
                              placeholder="e.g., Suspicious domain detected"
                              disabled={isCreating}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="description">Description *</Label>
                            <Textarea
                              id="description"
                              value={createForm.description}
                              onChange={e =>
                                setCreateForm(prev => ({
                                  ...prev,
                                  description: e.target.value,
                                }))
                              }
                              placeholder="Detailed description of the security event"
                              disabled={isCreating}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button
                            type="button"
                            variant="destructive"
                            onClick={() => setIsCreateDialogOpen(false)}
                            disabled={isCreating}
                            className="bg-red-600 text-white hover:bg-red-700 focus:ring-red-500">
                            Cancel
                          </Button>
                          <Button type="submit" disabled={isCreating}>
                            {isCreating ? (
                              <>
                                <LoadingSpinner size="sm" className="mr-2" />
                                Creating...
                              </>
                            ) : (
                              'Create Event'
                            )}
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="px-4 sm:px-0 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search events..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="w-full text-gray-950 sm:w-48">
                <Select
                  value={severityFilter}
                  onValueChange={value =>
                    setSeverityFilter(value as EventSeverity | 'ALL')
                  }>
                  <SelectTrigger className="text-xs font-normal text-gray-900">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">All Severities</SelectItem>
                    <SelectItem value="LOW">Low</SelectItem>
                    <SelectItem value="MED">Medium</SelectItem>
                    <SelectItem value="HIGH">High</SelectItem>
                    <SelectItem value="CRITICAL">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Events List */}
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredEvents.map(event => (
                <Card
                  key={event.id}
                  className="hover:shadow-md transition-shadow border border-gray-200 bg-white">
                  <CardContent className="p-5">
                    <div className="flex flex-col h-full">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex flex-col items-center gap-2">
                            <SeverityBadge severity={event.severity} />
                            <span className="text-xs text-gray-500">
                              {formatDate(event.createdAt)}
                            </span>
                          </div>
                          <h3 className="text-base font-semibold text-gray-900 mt-1 truncate">
                            {event.title}
                          </h3>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            asChild
                            variant="ghost"
                            size="sm"
                            className="hover:bg-gray-100">
                            <Link href={`/events/${event.id}`}>
                              <Eye className="h-4 w-4 mr-1 text-gray-500" />
                              <span className="text-xs">View</span>
                            </Link>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEnrichEvent(event.id)}
                            disabled={enrichingEvents.has(event.id)}>
                            {enrichingEvents.has(event.id) ? (
                              <>
                                <LoadingSpinner size="sm" className="mr-2" />
                                <span className="text-xs">Enriching...</span>
                              </>
                            ) : (
                              <>
                                <Brain className="h-4 w-4 mr-1" />
                                <span className="text-xs">AI Enrich</span>
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-3">
                          {event.description}
                        </p>
                        {event.summary && (
                          <div className="mb-2">
                            <h4 className="text-xs font-medium text-gray-700 mb-1">
                              AI Summary:
                            </h4>
                            <p className="text-xs text-gray-600 bg-blue-50 p-2 rounded">
                              {event.summary}
                            </p>
                          </div>
                        )}
                        {event.suggestedAction && (
                          <div className="mb-2">
                            <h4 className="text-xs font-medium text-gray-700 mb-1">
                              Suggested Action:
                            </h4>
                            <p className="text-xs text-gray-600 bg-green-50 p-2 rounded">
                              {event.suggestedAction}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Activity className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchQuery || severityFilter !== 'ALL'
                  ? 'No events found'
                  : 'No events yet'}
              </h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                {searchQuery || severityFilter !== 'ALL'
                  ? "Try adjusting your search terms or filters to find what you're looking for."
                  : 'Security events will appear here when detected or simulated. Create a test event to get started.'}
              </p>
              {/* {!searchQuery &&
                severityFilter === 'ALL' &&
                watchlists.length > 0 && (
                  <Dialog
                    open={isCreateDialogOpen}
                    onOpenChange={setIsCreateDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Simulate Your First Event
                      </Button>
                    </DialogTrigger>
                  </Dialog>
                )} */}
              {/* {watchlists.length === 0 && (
                <Button asChild variant="outline">
                  <Link href="/watchlists">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Create a Watchlist First
                  </Link>
                </Button>
              )} */}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  )
}
