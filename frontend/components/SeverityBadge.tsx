import { EventSeverity } from '@/lib/types'
import { Badge } from '@/components/ui/badge'
import { Shield, AlertTriangle, AlertCircle, Zap } from 'lucide-react'

interface SeverityBadgeProps {
  severity: EventSeverity
  showIcon?: boolean
}

export default function SeverityBadge({
  severity,
  showIcon = true,
}: SeverityBadgeProps) {
  const getSeverityConfig = (severity: EventSeverity) => {
    switch (severity) {
      case 'LOW':
        return {
          className: 'bg-green-100 text-green-800 hover:bg-green-200',
          icon: Shield,
          label: 'Low',
        }
      case 'MED':
        return {
          className: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
          icon: AlertTriangle,
          label: 'Medium',
        }
      case 'HIGH':
        return {
          className: 'bg-orange-100 text-orange-800 hover:bg-orange-200',
          icon: AlertCircle,
          label: 'High',
        }
      case 'CRITICAL':
        return {
          className: 'bg-red-100 text-red-800 hover:bg-red-200',
          icon: Zap,
          label: 'Critical',
        }
      default:
        return {
          className: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
          icon: Shield,
          label: 'Unknown',
        }
    }
  }

  const config = getSeverityConfig(severity)
  const Icon = config.icon

  return (
    <Badge className={config.className}>
      {showIcon && <Icon className="h-3 w-3 mr-1" />}
      {config.label}
    </Badge>
  )
}
