"use client"

import { Line, LineChart, Tooltip, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

// Sample credit score data
const creditScoreData = {
  "1m": [
    { date: "Week 1", score: 750 },
    { date: "Week 2", score: 755 },
    { date: "Week 3", score: 760 },
    { date: "Week 4", score: 780 },
  ],
  "3m": [
    { date: "Jan", score: 720 },
    { date: "Feb", score: 740 },
    { date: "Mar", score: 780 },
  ],
  "6m": [
    { date: "Jan", score: 700 },
    { date: "Feb", score: 710 },
    { date: "Mar", score: 730 },
    { date: "Apr", score: 745 },
    { date: "May", score: 760 },
    { date: "Jun", score: 780 },
  ],
  "1y": [
    { date: "Jan", score: 650 },
    { date: "Feb", score: 670 },
    { date: "Mar", score: 685 },
    { date: "Apr", score: 700 },
    { date: "May", score: 710 },
    { date: "Jun", score: 725 },
    { date: "Jul", score: 735 },
    { date: "Aug", score: 745 },
    { date: "Sep", score: 755 },
    { date: "Oct", score: 765 },
    { date: "Nov", score: 775 },
    { date: "Dec", score: 780 },
  ],
}

export function CreditScoreChart({ period = "6m" }: { period: string }) {
  const data = creditScoreData[period as keyof typeof creditScoreData] || creditScoreData["6m"]

  return (
    <ChartContainer
      config={{
        score: {
          label: "Credit Score",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-full"
    >
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 10,
          left: 10,
          bottom: 0,
        }}
      >
        <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
        <YAxis domain={[600, 850]} hide />
        <Tooltip content={<ChartTooltipContent hideLabel />} />
        <Line
          type="monotone"
          dataKey="score"
          stroke="var(--color-score)"
          strokeWidth={2}
          dot={{
            r: 3,
            fill: "var(--color-score)",
            strokeWidth: 0,
          }}
          activeDot={{
            r: 5,
            fill: "#fff",
            stroke: "var(--color-score)",
            strokeWidth: 2,
          }}
        />
      </LineChart>
    </ChartContainer>
  )
}
