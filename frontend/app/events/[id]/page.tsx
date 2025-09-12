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
          <p>No se encontró el evento.</p>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto py-8">
        <Card className="border border-gray-200 bg-white shadow-lg">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold text-gray-900 mb-1">
                  {event.title}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {event.summary}
                </CardDescription>
              </div>
              <div>
                {/* Botón para enriquecer con IA */}
                <Button
                  variant="outline"
                  size="sm"
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
            <div className="flex flex-wrap gap-2 mb-4">
              {event.severity && (
                <Badge
                  variant="outline"
                  className={
                    event.severity === 'LOW'
                      ? 'bg-green-100 text-green-800 font-semibold px-3 py-1 text-sm'
                      : event.severity === 'MED'
                      ? 'bg-yellow-100 text-yellow-800 font-semibold px-3 py-1 text-sm'
                      : event.severity === 'HIGH'
                      ? 'bg-orange-100 text-orange-800 font-semibold px-3 py-1 text-sm'
                      : 'bg-red-100 text-red-700 font-semibold px-3 py-1 text-sm'
                  }>
                  {event.severity}
                </Badge>
              )}
              <Badge
                variant="outline"
                className="bg-blue-100 text-blue-800 font-semibold px-3 py-1 text-sm">
                {event.status}
              </Badge>
            </div>
            <p className="mb-4 text-gray-800 text-base font-medium">
              {event.description}
            </p>
            <div className="mt-6">
              <h4 className="font-semibold mb-2 text-gray-900 text-lg">
                Listas relacionadas:
              </h4>
              <div className="flex flex-wrap gap-3">
                {relatedWatchlists.length > 0 ? (
                  relatedWatchlists.map(watchlist => (
                    <Link
                      key={watchlist.id}
                      href={`/watchlists/${watchlist.id}`}
                      className="bg-blue-50 border border-blue-200 text-blue-700 font-semibold px-4 py-2 rounded-lg shadow hover:bg-blue-100 transition-colors text-sm">
                      {watchlist.name}
                    </Link>
                  ))
                ) : (
                  <span className="text-gray-500">
                    Ninguna lista relacionada
                  </span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
