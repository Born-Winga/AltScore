"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, Info } from "lucide-react"
import Link from "next/link"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { CreditScoreChart } from "@/components/credit-score-chart"
import { DocumentsBreakdownChart } from "@/components/documents-break-down-chart"
import { TransactionTrendsChart } from "@/components/transactions-trend-chart"

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("6m")

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center mb-8">
        <Link href="/">
          <Button variant="ghost" size="sm" className="mr-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Documents
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Financial Reports</h1>
        <Button variant="outline" size="sm" className="ml-auto border-green-200 text-green-700">
          <Download className="mr-2 h-4 w-4" />
          Export Reports
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
        <Card className="border-green-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center justify-between">
              Credit Score
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Your credit score based on financial activity</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardTitle>
            <CardDescription>Current score and history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center mb-4">
              <div className="relative w-32 h-32 flex items-center justify-center">
                {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    className="text-gray-200"
                    strokeWidth="10"
                    stroke="currentColor"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                  />
                  <circle
                    className="text-green-500"
                    strokeWidth="10"
                    strokeDasharray={250.8}
                    strokeDashoffset={250.8 * (1 - 0.78)}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold">780</span>
                  <span className="text-xs text-gray-500">Excellent</span>
                </div>
              </div>
            </div>
            <div className="h-[150px]">
              <CreditScoreChart period={selectedPeriod} />
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center justify-between">
              Transaction Trends
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Your income vs expenses over time</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardTitle>
            <CardDescription>Income vs Expenses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <TransactionTrendsChart period={selectedPeriod} />
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center justify-between">
              Documents Breakdown
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Distribution of your document types</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardTitle>
            <CardDescription>By type and status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <DocumentsBreakdownChart />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <div className="flex items-center justify-between mb-4">
          <TabsList className="bg-green-50">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="spending">Spending</TabsTrigger>
            <TabsTrigger value="savings">Savings</TabsTrigger>
          </TabsList>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              className={`border-green-200 ${selectedPeriod === "1m" ? "bg-green-100 text-green-800" : "text-gray-600"}`}
              onClick={() => setSelectedPeriod("1m")}
            >
              1M
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={`border-green-200 ${selectedPeriod === "3m" ? "bg-green-100 text-green-800" : "text-gray-600"}`}
              onClick={() => setSelectedPeriod("3m")}
            >
              3M
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={`border-green-200 ${selectedPeriod === "6m" ? "bg-green-100 text-green-800" : "text-gray-600"}`}
              onClick={() => setSelectedPeriod("6m")}
            >
              6M
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={`border-green-200 ${selectedPeriod === "1y" ? "bg-green-100 text-green-800" : "text-gray-600"}`}
              onClick={() => setSelectedPeriod("1y")}
            >
              1Y
            </Button>
          </div>
        </div>

        <TabsContent value="overview">
          <Card className="border-green-100">
            <CardHeader>
              <CardTitle>Financial Overview</CardTitle>
              <CardDescription>Summary of your financial health based on document analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="flex flex-col p-4 border rounded-lg border-green-100">
                  <span className="text-sm font-medium text-gray-500">Average Monthly Income</span>
                  <span className="text-2xl font-bold text-green-600">KSh 85,400</span>
                  <span className="text-xs text-green-500 mt-1">↑ 12% from last period</span>
                </div>

                <div className="flex flex-col p-4 border rounded-lg border-green-100">
                  <span className="text-sm font-medium text-gray-500">Average Monthly Expenses</span>
                  <span className="text-2xl font-bold text-red-600">KSh 62,300</span>
                  <span className="text-xs text-red-500 mt-1">↑ 5% from last period</span>
                </div>

                <div className="flex flex-col p-4 border rounded-lg border-green-100">
                  <span className="text-sm font-medium text-gray-500">Savings Rate</span>
                  <span className="text-2xl font-bold text-green-600">27%</span>
                  <span className="text-xs text-green-500 mt-1">↑ 3% from last period</span>
                </div>

                <div className="flex flex-col p-4 border rounded-lg border-green-100">
                  <span className="text-sm font-medium text-gray-500">Debt-to-Income Ratio</span>
                  <span className="text-2xl font-bold text-yellow-600">32%</span>
                  <span className="text-xs text-yellow-500 mt-1">↓ 2% from last period</span>
                </div>

                <div className="flex flex-col p-4 border rounded-lg border-green-100">
                  <span className="text-sm font-medium text-gray-500">Emergency Fund</span>
                  <span className="text-2xl font-bold text-green-600">3.2 months</span>
                  <span className="text-xs text-green-500 mt-1">↑ 0.5 months from last period</span>
                </div>

                <div className="flex flex-col p-4 border rounded-lg border-green-100">
                  <span className="text-sm font-medium text-gray-500">Credit Utilization</span>
                  <span className="text-2xl font-bold text-green-600">18%</span>
                  <span className="text-xs text-green-500 mt-1">↓ 7% from last period</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions">
          <Card className="border-green-100">
            <CardHeader>
              <CardTitle>Transaction Analysis</CardTitle>
              <CardDescription>Detailed breakdown of your transaction patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Transaction analysis content here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="spending">
          <Card className="border-green-100">
            <CardHeader>
              <CardTitle>Spending Categories</CardTitle>
              <CardDescription>Where your money goes each month</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Spending categories content here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="savings">
          <Card className="border-green-100">
            <CardHeader>
              <CardTitle>Savings Goals</CardTitle>
              <CardDescription>Track your progress towards financial goals</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Savings goals content here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
