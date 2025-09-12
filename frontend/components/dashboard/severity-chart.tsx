'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

interface SeverityChartProps {
  severityCounts: Record<string, number>
}

const COLORS = {
  CRITICAL: '#dc2626',
  HIGH: '#ea580c',
  MED: '#d97706',
  LOW: '#2563eb',
}

export function SeverityChart({ severityCounts }: SeverityChartProps) {
  const barData = Object.entries(severityCounts).map(([severity, count]) => ({
    severity,
    count,
    fill: COLORS[severity as keyof typeof COLORS],
  }))

  const pieData = Object.entries(severityCounts)
    .filter(([_, count]) => count > 0)
    .map(([severity, count]) => ({
      name: severity,
      value: count,
      fill: COLORS[severity as keyof typeof COLORS],
    }))

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Severity Distribution</CardTitle>
          <CardDescription>Events by severity level</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="severity" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Severity Breakdown</CardTitle>
          <CardDescription>Percentage distribution</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, value }) => {
                  const total = pieData.reduce(
                    (sum, entry) => sum + entry.value,
                    0
                  )
                  const percent = (Number(value) / total) * 100
                  return `${name}: ${value} (${percent.toFixed(0)}%)`
                }}>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
