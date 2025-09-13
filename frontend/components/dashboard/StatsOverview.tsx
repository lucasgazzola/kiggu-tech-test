'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, AlertTriangle, CheckCircle, Eye } from 'lucide-react'

interface StatsOverviewProps {
  stats: {
    total: number
    severityCounts: Record<string, number>
    statusCounts: Record<string, number>
    activeWatchLists: number
    totalWatchLists: number
  }
}

export function StatsOverview({ stats }: StatsOverviewProps) {
  const criticalCount = stats.severityCounts.CRITICAL || 0
  const highCount = stats.severityCounts.HIGH || 0
  const newCount = stats.statusCounts.new || 0

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Events</CardTitle>
          <Shield className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.total}</div>
          <p className="text-xs text-muted-foreground">All security events</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Critical & High</CardTitle>
          <AlertTriangle className="h-4 w-4 text-destructive" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-destructive">
            {criticalCount + highCount}
          </div>
          <p className="text-xs text-muted-foreground">
            Require immediate attention
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">New Events</CardTitle>
          <CheckCircle className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">{newCount}</div>
          <p className="text-xs text-muted-foreground">Awaiting analysis</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Watch Lists</CardTitle>
          <Eye className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.activeWatchLists}</div>
          <p className="text-xs text-muted-foreground">
            Active monitoring ({stats.totalWatchLists} total)
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
