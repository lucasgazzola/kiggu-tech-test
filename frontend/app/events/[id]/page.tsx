'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { apiClient } from '@/lib/api'
import { Event, Watchlist } from '@/lib/types'
import Navbar from '@/components/Navbar'
import LoadingSpinner from '@/components/LoadingSpinner'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { Brain } from 'lucide-react'

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [event, setEvent] = useState<Event | null>(null)
  const [isEnrichingEvent, setIsEnrichingEvent] = useState<boolean>(false)
  const [loading, setLoading] = useState(true)
  const [relatedWatchlists, setRelatedWatchlists] = useState<Watchlist[]>([])

  useEffect(() => {
    async function fetchEventAndWatchlists() {
      setLoading(true)
      try {
        const data = await apiClient.getEvent(id)
        setEvent(data)
        // Obtener listas relacionadas usando el endpoint correcto
        const watchlists = await apiClient.getEventMatchedWatchlists(id)
        console.log({ watchlists })
        setRelatedWatchlists(Array.isArray(watchlists) ? watchlists : [])
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message || 'Failed to load event')
        } else {
          toast.error('Failed to load event')
        }
      } finally {
        setLoading(false)
      }
    }
    fetchEventAndWatchlists()
  }, [id])

  const handleEnrichEvent = async (eventId: string) => {
    setIsEnrichingEvent(true)
    try {
      const enrichedEvent = await apiClient.enrichEvent(eventId)
      setEvent(enrichedEvent)
      toast.success('Event enriched successfully')
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || 'Failed to enrich event')
      } else {
        toast.error('Failed to enrich event')
      }
    } finally {
      setIsEnrichingEvent(false)
    }
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <LoadingSpinner size="lg" />
        </div>
      </>
    )
  }

  if (!event) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <p>Event not found.</p>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto py-12">
        <Card className="border border-zinc-100 bg-white shadow-sm rounded-3xl">
          <CardHeader className="pb-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle className="text-3xl font-extrabold text-zinc-900 mb-2 tracking-tight flex items-center gap-3">
                  <span role="img" aria-label="Event">
                    🔎
                  </span>
                  {event.title}
                </CardTitle>
                {event.summary && (
                  <CardDescription className="text-zinc-500 mb-2 text-base italic">
                    {event.summary}
                  </CardDescription>
                )}
              </div>
              <div className="flex gap-2 items-center mt-2 sm:mt-0">
                <Button
                  variant="default"
                  size="sm"
                  className="font-semibold shadow-lg rounded-full px-5"
                  onClick={() => handleEnrichEvent(event.id)}
                  disabled={isEnrichingEvent}>
                  {isEnrichingEvent ? (
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
          </CardHeader>
          <CardContent>
            {/* Badges and dates */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-2">
              <div className="flex gap-2">
                {event.severity && (
                  <Badge
                    variant="outline"
                    className={
                      event.severity === 'LOW'
                        ? 'bg-green-200 text-green-900 font-bold px-5 py-1 text-sm shadow-sm rounded-full'
                        : event.severity === 'MED'
                        ? 'bg-yellow-200 text-yellow-900 font-bold px-5 py-1 text-sm shadow-sm rounded-full'
                        : event.severity === 'HIGH'
                        ? 'bg-orange-200 text-orange-900 font-bold px-5 py-1 text-sm shadow-sm rounded-full'
                        : 'bg-red-200 text-red-900 font-bold px-5 py-1 text-sm shadow-sm rounded-full'
                    }>
                    {event.severity}
                  </Badge>
                )}
                <Badge
                  variant="outline"
                  className="bg-blue-200 text-blue-900 font-bold px-5 py-1 text-sm shadow-sm rounded-full">
                  {event.status}
                </Badge>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-xs text-zinc-400 font-medium">
                <span>
                  <strong>Created:</strong>{' '}
                  {event.createdAt
                    ? new Date(event.createdAt).toLocaleString()
                    : 'Unknown'}
                </span>
                <span>
                  <strong>Updated:</strong>{' '}
                  {event.updatedAt
                    ? new Date(event.updatedAt).toLocaleString()
                    : 'Unknown'}
                </span>
              </div>
            </div>
            {/* Description */}
            <div className="mb-6 p-6 rounded-2xl bg-zinc-50 border border-zinc-100">
              <h4 className="font-semibold text-zinc-900 text-lg mb-2 flex items-center gap-2">
                <span role="img" aria-label="Description">
                  📝
                </span>
                Description
              </h4>
              <p className="text-zinc-800 text-base font-medium">
                {event.description}
              </p>
            </div>
            {/* Suggested Action */}
            {event.suggestedAction && (
              <div className="mb-6 p-6 rounded-2xl bg-green-50 border border-green-100">
                <h4 className="font-semibold text-zinc-900 text-lg mb-2 flex items-center gap-2">
                  <span role="img" aria-label="Action">
                    💡
                  </span>
                  Suggested Action
                </h4>
                <p className="text-zinc-800 text-base font-medium">
                  {event.suggestedAction}
                </p>
              </div>
            )}
            {/* AI Summary */}
            <div className="mb-6 p-6 rounded-2xl bg-blue-50 border border-blue-100">
              <h4 className="font-semibold text-zinc-900 text-lg mb-2 flex items-center gap-2">
                <span role="img" aria-label="AI">
                  🤖
                </span>
                AI Summary
              </h4>
              <p className="text-zinc-800 text-base font-medium">
                {event.summary ? event.summary : 'Not available'}
              </p>
            </div>
            {/* Related Watchlists */}
            <div className="mt-10">
              <h4 className="font-semibold mb-4 text-zinc-900 text-lg flex items-center gap-2">
                <span role="img" aria-label="Lists">
                  📋
                </span>
                Related Watchlists:
              </h4>
              <div className="flex flex-wrap gap-3">
                {relatedWatchlists.length > 0 ? (
                  relatedWatchlists.map(watchlist => (
                    <Link
                      key={watchlist.id}
                      href={`/watchlists/${watchlist.id}`}
                      className="bg-blue-50 border border-blue-200 text-blue-700 font-semibold px-4 py-2 rounded-xl shadow hover:bg-blue-100 hover:scale-105 transition-all text-sm">
                      {watchlist.name}
                    </Link>
                  ))
                ) : (
                  <span className="text-zinc-400">No related watchlists</span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
