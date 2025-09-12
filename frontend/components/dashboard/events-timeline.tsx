'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Event } from '@/lib/types'
import { Clock, ArrowRight } from 'lucide-react'

interface EventsTimelineProps {
  events: Event[]
  onEventClick?: (event: Event) => void
}

const severityColors = {
  CRITICAL: 'bg-red-500 text-white border-red-500',
  HIGH: 'bg-orange-500 text-white border-orange-500',
  MED: 'bg-yellow-500 text-white border-yellow-500',
  LOW: 'bg-blue-500 text-white border-blue-500',
}

const statusColors = {
  new: 'bg-blue-100 text-blue-800 border-blue-200',
  investigating: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  resolved: 'bg-green-100 text-green-800 border-green-200',
  false_positive: 'bg-gray-100 text-gray-800 border-gray-200',
}

export function EventsTimeline({ events, onEventClick }: EventsTimelineProps) {
  const recentEvents = events.slice(0, 10)

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Recent Events
        </CardTitle>
        <CardDescription>
          Latest security events detected by the monitoring system
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentEvents.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No events detected yet. Create watch lists to start monitoring.
          </div>
        ) : (
          recentEvents.map(event => (
            <div
              key={event.id}
              className="border rounded-lg p-4 space-y-3 hover:bg-muted/50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge
                      className={
                        severityColors[
                          event.severity as keyof typeof severityColors
                        ]
                      }>
                      {event.severity}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={
                        statusColors[event.status as keyof typeof statusColors]
                      }>
                      {event.status.replace('_', ' ')}
                    </Badge>
                  </div>

                  <h4 className="font-semibold text-sm">{event.title}</h4>

                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {event.summary}
                  </p>
                </div>

                {onEventClick && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEventClick(event)}
                    className="ml-2 flex-shrink-0">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
