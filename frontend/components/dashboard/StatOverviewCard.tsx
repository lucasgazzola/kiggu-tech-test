import React from 'react'
import { Card, CardContent } from '@/components/ui/card'

interface StatOverviewCardProps {
  icon: React.ReactNode
  label: string
  value: number
}

const StatOverviewCard: React.FC<StatOverviewCardProps> = ({
  icon,
  label,
  value,
}) => (
  <Card className="bg-white flex justify-center border border-zinc-200 shadow-sm">
    <CardContent className="flex flex-col items-center justify-center py-6">
      <div className="flex flex-col items-center gap-2">
        <div className="flex-shrink-0">{icon}</div>
        <dl className="flex flex-col items-center">
          <dt className="text-sm font-medium text-zinc-500 truncate">
            {label}
          </dt>
          <dd className="text-2xl font-bold text-zinc-900">{value}</dd>
        </dl>
      </div>
    </CardContent>
  </Card>
)

export default StatOverviewCard
