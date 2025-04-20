"use client"

import { Cell, Pie, PieChart, Tooltip } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

// Sample document breakdown data
const documentsData = [
  { name: "Bank Statements", value: 60, color: "#3b82f6" },
  { name: "M-Pesa Statements", value: 30, color: "#22c55e" },
  { name: "Other Documents", value: 10, color: "#a855f7" },
]

// Sample document status data
const statusData = [
  { name: "Active", value: 70, color: "#22c55e" },
  { name: "Pending", value: 15, color: "#eab308" },
  { name: "Expired", value: 10, color: "#ef4444" },
  { name: "Rejected", value: 5, color: "#6b7280" },
]

export function DocumentsBreakdownChart() {
  return (
    <div className="grid grid-cols-2 h-full">
      <ChartContainer
        config={{
          documents: {
            label: "Documents",
            color: "hsl(var(--chart-1))",
          },
        }}
        className="h-full"
      >
        <PieChart>
          <Pie
            data={documentsData}
            cx="50%"
            cy="50%"
            innerRadius={30}
            outerRadius={60}
            paddingAngle={2}
            dataKey="value"
          >
            {documentsData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<ChartTooltipContent />} />
        </PieChart>
      </ChartContainer>

      <ChartContainer
        config={{
          status: {
            label: "Status",
            color: "hsl(var(--chart-2))",
          },
        }}
        className="h-full"
      >
        <PieChart>
          <Pie data={statusData} cx="50%" cy="50%" innerRadius={30} outerRadius={60} paddingAngle={2} dataKey="value">
            {statusData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<ChartTooltipContent />} />
        </PieChart>
      </ChartContainer>
    </div>
  )
}
