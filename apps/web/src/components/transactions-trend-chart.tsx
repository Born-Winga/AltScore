"use client"

import { Bar, BarChart, Tooltip, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

// Sample transaction data
const transactionData = {
  "1m": [
    { date: "Week 1", income: 25000, expenses: 18000 },
    { date: "Week 2", income: 22000, expenses: 16000 },
    { date: "Week 3", income: 20000, expenses: 15000 },
    { date: "Week 4", income: 28000, expenses: 19000 },
  ],
  "3m": [
    { date: "Jan", income: 85000, expenses: 62000 },
    { date: "Feb", income: 82000, expenses: 60000 },
    { date: "Mar", income: 88000, expenses: 65000 },
  ],
  "6m": [
    { date: "Jan", income: 85000, expenses: 62000 },
    { date: "Feb", income: 82000, expenses: 60000 },
    { date: "Mar", income: 88000, expenses: 65000 },
    { date: "Apr", income: 84000, expenses: 61000 },
    { date: "May", income: 86000, expenses: 63000 },
    { date: "Jun", income: 90000, expenses: 64000 },
  ],
  "1y": [
    { date: "Jan", income: 85000, expenses: 62000 },
    { date: "Feb", income: 82000, expenses: 60000 },
    { date: "Mar", income: 88000, expenses: 65000 },
    { date: "Apr", income: 84000, expenses: 61000 },
    { date: "May", income: 86000, expenses: 63000 },
    { date: "Jun", income: 90000, expenses: 64000 },
    { date: "Jul", income: 87000, expenses: 62000 },
    { date: "Aug", income: 89000, expenses: 65000 },
    { date: "Sep", income: 91000, expenses: 66000 },
    { date: "Oct", income: 88000, expenses: 64000 },
    { date: "Nov", income: 92000, expenses: 67000 },
    { date: "Dec", income: 95000, expenses: 68000 },
  ],
}

export function TransactionTrendsChart({ period = "6m" }: { period: string }) {
  const data = transactionData[period as keyof typeof transactionData] || transactionData["6m"]

  return (
    <ChartContainer
      config={{
        income: {
          label: "Income",
          color: "hsl(142, 76%, 36%)",
        },
        expenses: {
          label: "Expenses",
          color: "hsl(346, 87%, 43%)",
        },
      }}
      className="h-full"
    >
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 10,
          left: 10,
          bottom: 0,
        }}
      >
        <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
        <YAxis hide />
        <Tooltip content={<ChartTooltipContent />} />
        <Bar dataKey="income" fill="var(--color-income)" radius={[4, 4, 0, 0]} />
        <Bar dataKey="expenses" fill="var(--color-expenses)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ChartContainer>
  )
}
