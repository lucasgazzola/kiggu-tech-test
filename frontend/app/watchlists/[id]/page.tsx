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
import { toast } from 'sonner'

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
        if (error instanceof Error) {
          toast.error(error.message || 'Failed to load watchlist')
        } else {
          toast.error('Failed to load watchlist')
        }
      } finally {
        setLoading(false)
      }
    }
    fetchWatchlistAndEvents()
  }, [id])

  if (!watchlist) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <p>Watchlist not found.</p>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto py-12">
        <Card className="border border-zinc-100 bg-white shadow-md rounded-3xl px-6 py-8">
          <CardHeader className="pb-2">
            <div className="flex flex-col gap-2">
              <CardTitle className="text-3xl font-extrabold text-zinc-900 tracking-tight flex items-center gap-3">
                {watchlist.name}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-zinc-600 text-base italic pb-6">
              {watchlist.description}
            </CardDescription>
            <div className="mb-6 p-6 rounded-2xl bg-zinc-100 border border-zinc-100">
              <h4 className="font-semibold text-zinc-900 text-lg mb-2 flex items-center gap-2">
                <span role="img" aria-label="Terms">
                  🔍
                </span>
                Monitored Terms
              </h4>
              <div className="flex flex-wrap gap-2">
                {watchlist.terms && watchlist.terms.length > 0 ? (
                  watchlist.terms.map(term => (
                    <Badge
                      key={term.value}
                      variant="outline"
                      className="bg-zinc-100 text-zinc-900 font-semibold px-3 py-1 text-xs rounded-full shadow-sm">
                      {term.value}
                    </Badge>
                  ))
                ) : (
                  <span className="text-zinc-400 text-sm">No terms</span>
                )}
              </div>
            </div>
            <div className="mb-6 p-6 rounded-2xl bg-zinc-100 border border-zinc-100">
              <h4 className="font-semibold text-zinc-900 text-lg mb-2 flex items-center gap-2">
                <span role="img" aria-label="Events">
                  📊
                </span>
                Related Events
              </h4>
              <div className="flex flex-col gap-3">
                {relatedEvents.length > 0 ? (
                  relatedEvents.map(event => (
                    <Link
                      key={event.id}
                      href={`/events/${event.id}`}
                      className="block p-4 rounded-xl border border-zinc-100 bg-white hover:bg-zinc-100 transition-all shadow text-zinc-900 font-semibold">
                      <span className="text-base font-bold flex items-center gap-2">
                        <span role="img" aria-label="Event">
                          🔎
                        </span>
                        {event.title}
                      </span>
                    </Link>
                  ))
                ) : (
                  <span className="text-zinc-400 text-sm">
                    No related events
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              {watchlist.owner.name && (
                <div className="flex flex-col p-4 rounded-xl bg-zinc-50 border border-zinc-100">
                  <span className="font-semibold text-zinc-900">Owner:</span>
                  <span className="text-zinc-700">{watchlist.owner.name}</span>
                </div>
              )}
              {watchlist.createdAt && (
                <div className="flex flex-col p-4 rounded-xl bg-zinc-50 border border-zinc-100">
                  <span className="font-semibold text-zinc-900">Created:</span>
                  <span className="text-zinc-700">
                    {new Date(watchlist.createdAt).toLocaleString()}
                  </span>
                </div>
              )}
              {watchlist.updatedAt && (
                <div className="flex flex-col text-start p-4 rounded-xl bg-zinc-50 border border-zinc-100">
                  <span className="font-semibold text-zinc-900">Updated:</span>
                  <span className="text-zinc-700">
                    {new Date(watchlist.updatedAt).toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
