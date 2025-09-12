'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { apiClient } from '@/lib/api'
import { Watchlist, Event } from '@/lib/types'
import ProtectedRoute from '@/components/ProtectedRoute'
import Navbar from '@/components/Navbar'
import LoadingSpinner from '@/components/LoadingSpinner'
import SeverityBadge from '@/components/SeverityBadge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Shield,
  Eye,
  AlertTriangle,
  Activity,
  Plus,
  TrendingUp,
  Users,
  FileText,
} from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

export default function DashboardPage() {
  const { user } = useAuth()
  const [watchlists, setWatchlists] = useState<Watchlist[]>([])
  const [recentEvents, setRecentEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalWatchlists: 0,
    totalEvents: 0,
    criticalEvents: 0,
    highEvents: 0,
  })

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      const [watchlistsData, eventsData] = await Promise.all([
        apiClient.getWatchlists(),
        apiClient.getEvents(),
      ])

      setWatchlists(watchlistsData)
      setRecentEvents(eventsData.slice(0, 5)) // Show only recent 5 events

      // Calculate stats
      const criticalEvents = eventsData.filter(
        (e: Event) => e.severity === 'CRITICAL'
      ).length
      const highEvents = eventsData.filter(
        (e: Event) => e.severity === 'HIGH'
      ).length

      setStats({
        totalWatchlists: watchlistsData.length,
        totalEvents: eventsData.length,
        criticalEvents,
        highEvents,
      })
    } catch (error: any) {
      toast.error('Failed to load dashboard data')
      console.error('Dashboard data loading error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDashboardData()
  }, [])

  if (loading) {
    return (
      <ProtectedRoute>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <LoadingSpinner size="lg" />
            <p className="mt-2 text-sm text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </ProtectedRoute>
    )
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Unknown'
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <ProtectedRoute>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="px-4 py-6 sm:px-0">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Welcome back, {user?.name}
                </h1>
                <p className="mt-1 text-sm text-gray-600">
                  Monitor your security watchlists and events
                </p>
              </div>
              <div className="flex space-x-3">
                <Button asChild variant="outline">
                  <Link href="/events">
                    <Activity className="h-4 w-4 mr-2" />
                    View Events
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="/watchlists">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Watchlist
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Shield className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Total Watchlists
                      </dt>
                      <dd className="text-2xl font-bold text-gray-900">
                        {stats.totalWatchlists}
                      </dd>
                    </dl>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Activity className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Total Events
                      </dt>
                      <dd className="text-2xl font-bold text-gray-900">
                        {stats.totalEvents}
                      </dd>
                    </dl>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <AlertTriangle className="h-8 w-8 text-orange-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        High Priority
                      </dt>
                      <dd className="text-2xl font-bold text-gray-900">
                        {stats.highEvents}
                      </dd>
                    </dl>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <TrendingUp className="h-8 w-8 text-red-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Critical Events
                      </dt>
                      <dd className="text-2xl font-bold text-gray-900">
                        {stats.criticalEvents}
                      </dd>
                    </dl>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Recent Watchlists */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <Eye className="h-5 w-5 mr-2" />
                      Your Watchlists
                    </CardTitle>
                    <CardDescription>
                      Monitor your security terms and patterns
                    </CardDescription>
                  </div>
                  <Button asChild variant="ghost" size="sm">
                    <Link href="/watchlists">View all</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {watchlists.length > 0 ? (
                  <div className="space-y-4">
                    {watchlists.slice(0, 3).map(watchlist => (
                      <div
                        key={watchlist.id}
                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">
                            {watchlist.name}
                          </h4>
                          <p className="text-sm text-gray-500 mt-1">
                            {watchlist.description}
                          </p>
                          <div className="flex items-center mt-2 space-x-2">
                            <Badge variant="secondary">
                              {watchlist.terms.length} terms
                            </Badge>
                          </div>
                        </div>
                        <Button asChild variant="ghost" size="sm">
                          <Link href={`/watchlists/${watchlist.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-sm font-medium text-gray-900 mb-2">
                      No watchlists yet
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Create your first watchlist to start monitoring security
                      events
                    </p>
                    <Button asChild size="sm">
                      <Link href="/watchlists">Create Watchlist</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Events */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <Activity className="h-5 w-5 mr-2" />
                      Recent Events
                    </CardTitle>
                    <CardDescription>
                      Latest security events and alerts
                    </CardDescription>
                  </div>
                  <Button asChild variant="ghost" size="sm">
                    <Link href="/events">View all</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {recentEvents.length > 0 ? (
                  <div className="space-y-4">
                    {recentEvents.map(event => (
                      <div
                        key={event.id}
                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <SeverityBadge severity={event.severity} />
                            <span className="text-sm text-gray-500">
                              {formatDate(event.createdAt)}
                            </span>
                          </div>
                          <h4 className="font-medium text-gray-900">
                            {event.title}
                          </h4>
                          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                            {event.summary || event.description}
                          </p>
                        </div>
                        <Button asChild variant="ghost" size="sm">
                          <Link href={`/events/${event.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-sm font-medium text-gray-900 mb-2">
                      No events yet
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Security events will appear here when detected
                    </p>
                    <Button asChild size="sm" variant="outline">
                      <Link href="/events">View Events</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
