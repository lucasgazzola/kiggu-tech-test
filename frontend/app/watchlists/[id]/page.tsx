'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { apiClient } from '@/lib/api'
import { Watchlist, Event } from '@/lib/types'
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

export default function WatchlistDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [watchlist, setWatchlist] = useState<Watchlist | null>(null)
  const [loading, setLoading] = useState(true)
  const [relatedEvents, setRelatedEvents] = useState<Event[]>([])

  useEffect(() => {
    async function fetchWatchlistAndEvents() {
      setLoading(true)
      try {
        const data = await apiClient.getWatchlist(id)
        setWatchlist(data)
        // Obtener eventos relacionados usando el endpoint correcto
        const events = await apiClient.getWatchlistMatchedEvents(id)
        setRelatedEvents(Array.isArray(events) ? events : [])
      } catch (error) {
        // Manejo de error
      } finally {
        setLoading(false)
      }
    }
    fetchWatchlistAndEvents()
  }, [id])

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

  if (!watchlist) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <p>No se encontró la watchlist.</p>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto py-8">
        <Card className="border border-gray-200 bg-white shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold text-gray-900 mb-1">
              {watchlist.name}
            </CardTitle>
            <CardDescription className="text-gray-600">
              {watchlist.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <h4 className="font-semibold mb-2 text-gray-800">
              Términos monitoreados:
            </h4>
            <div className="flex flex-wrap gap-2 mb-4">
              {watchlist.terms.map(term => (
                <Badge
                  key={term.value}
                  variant="outline"
                  className="text-xs px-2 py-1 font-normal">
                  {term.value}
                </Badge>
              ))}
            </div>
            <div className="mt-6">
              <h4 className="font-semibold mb-2 text-gray-800">
                Eventos relacionados:
              </h4>
              <div className="flex flex-col gap-3">
                {relatedEvents.length > 0 ? (
                  relatedEvents.map(event => (
                    <Link
                      key={event.id}
                      href={`/events/${event.id}`}
                      className="block p-4 rounded-lg border border-gray-100 bg-blue-50 hover:bg-blue-100 transition-colors shadow-sm text-gray-900 font-medium">
                      <span className="text-base font-semibold">
                        {event.title}
                      </span>
                    </Link>
                  ))
                ) : (
                  <span className="text-gray-500 text-sm">
                    Ningún evento relacionado
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
