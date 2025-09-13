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
import StatOverviewCard from '@/components/dashboard/StatOverviewCard'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Shield,
  Eye,
  AlertTriangle,
  Activity,
  Plus,
  TrendingUp,
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
    } catch (error) {
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
      <div className="min-h-screen bg-zinc-50">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="px-4 py-6 sm:px-0">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl text-center 2xl:text-startfont-bold text-zinc-900">
                  Welcome back, {user?.name}
                </h1>
                <p className="mt-1 text-sm text-center xl:text-start text-zinc-600">
                  Monitor your security watchlists and events
                </p>
              </div>
              <div className="flex flex-col gap-2 w-full md:w-auto md:flex-row md:space-x-3">
                <Button asChild variant="outline" className="w-full md:w-auto">
                  <Link href="/events">
                    <Activity className="h-4 w-4 mr-2" />
                    View Events
                  </Link>
                </Button>
                <Button
                  asChild
                  className="w-full md:w-auto bg-zinc-900 text-white font-semibold shadow-lg hover:bg-zinc-800 transition-colors">
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
            <StatOverviewCard
              icon={<Shield className="h-8 w-8 text-zinc-500" />}
              label="Total Watchlists"
              value={stats.totalWatchlists}
            />
            <StatOverviewCard
              icon={<Activity className="h-8 w-8 text-zinc-700" />}
              label="Total Events"
              value={stats.totalEvents}
            />
            <StatOverviewCard
              icon={<AlertTriangle className="h-8 w-8 text-orange-500" />}
              label="High Priority"
              value={stats.highEvents}
            />
            <StatOverviewCard
              icon={<TrendingUp className="h-8 w-8 text-red-500" />}
              label="Critical Events"
              value={stats.criticalEvents}
            />
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-2">
            {/* Recent Watchlists */}
            <Card className="bg-white border border-zinc-200 shadow-sm">
              <CardHeader>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <CardTitle className="flex items-center text-zinc-900">
                      <Eye className="h-5 w-5 mr-2 text-zinc-500" />
                      Your Watchlists
                    </CardTitle>
                    <CardDescription className="text-zinc-600">
                      Monitor your security terms and patterns
                    </CardDescription>
                  </div>
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="text-zinc-700">
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
                        className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 border border-zinc-100 rounded-lg hover:bg-zinc-50 transition-colors">
                        <div className="flex-1">
                          <h4 className="font-medium text-zinc-900">
                            {watchlist.name}
                          </h4>
                          <p className="text-sm text-zinc-500 mt-1">
                            {watchlist.description}
                          </p>
                          <div className="flex items-center mt-2 space-x-2">
                            <Badge
                              variant="secondary"
                              className="bg-zinc-200 text-zinc-900">
                              {watchlist.terms.length} terms
                            </Badge>
                          </div>
                        </div>
                        <Button
                          asChild
                          variant="ghost"
                          size="sm"
                          className="mt-2 sm:mt-0">
                          <Link href={`/watchlists/${watchlist.id}`}>
                            <Eye className="h-4 w-4 text-zinc-500" />
                          </Link>
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <FileText className="h-12 w-12 text-zinc-300 mx-auto mb-4" />
                    <h3 className="text-sm font-medium text-zinc-900 mb-2">
                      No watchlists yet
                    </h3>
                    <p className="text-sm text-zinc-500 mb-4">
                      Create your first watchlist to start monitoring security
                      events
                    </p>
                    <Button
                      asChild
                      size="sm"
                      className="bg-zinc-900 text-white font-semibold shadow-lg hover:bg-zinc-800 transition-colors">
                      <Link href="/watchlists">Create Watchlist</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Events */}
            <Card className="bg-white border border-zinc-200 shadow-sm">
              <CardHeader>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <CardTitle className="flex items-center text-zinc-900">
                      <Activity className="h-5 w-5 mr-2 text-zinc-700" />
                      Recent Events
                    </CardTitle>
                    <CardDescription className="text-zinc-600">
                      Latest security events and alerts
                    </CardDescription>
                  </div>
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="text-zinc-700">
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
                        className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 border border-zinc-100 rounded-lg hover:bg-zinc-50 transition-colors">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <SeverityBadge severity={event.severity} />
                            <span className="text-sm text-zinc-500">
                              {formatDate(event.createdAt)}
                            </span>
                          </div>
                          <h4 className="font-medium text-zinc-900">
                            {event.title}
                          </h4>
                          <p className="text-sm text-zinc-500 mt-1 line-clamp-2">
                            {event.summary || event.description}
                          </p>
                        </div>
                        <Button
                          asChild
                          variant="ghost"
                          size="sm"
                          className="mt-2 sm:mt-0">
                          <Link href={`/events/${event.id}`}>
                            <Eye className="h-4 w-4 text-zinc-700" />
                          </Link>
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <Activity className="h-12 w-12 text-zinc-300 mx-auto mb-4" />
                    <h3 className="text-sm font-medium text-zinc-900 mb-2">
                      No events yet
                    </h3>
                    <p className="text-sm text-zinc-500 mb-4">
                      Security events will appear here when detected
                    </p>
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="bg-zinc-900 text-white font-semibold shadow-lg hover:bg-zinc-800 transition-colors">
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
