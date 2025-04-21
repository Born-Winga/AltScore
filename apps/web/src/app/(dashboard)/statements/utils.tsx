import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"
import { CheckCircle, Clock, HourglassIcon, StopCircleIcon } from "lucide-react"

import { cn } from "@/lib/utils";
import {DocStatus, type Document } from "@altscore/gql-types"
// Status badge component
export function StatusBadge({ status }: { status: Document["status"] }) {
    const statusConfig = {
      PROCESSED: { color: "bg-green-100 text-green-800 border-green-200", icon: <CheckCircle className="h-3 w-3 mr-1"/>},
      REJECTED: { color: "bg-red-100 text-red-800 border-red-200", icon: <StopCircleIcon className="h-3 w-3 mr-1"/> },
      PROCESSING: { color: "bg-yellow-100 text-yellow-800 border-yellow-200", icon: <Clock className="h-3 w-3 mr-1" /> },
      SUBMITTED: { color: "bg-gray-100 text-gray-800 border-gray-200", icon: <HourglassIcon className="h-3 w-3 mr-1"/> },
    }
    if(!status){
      status = DocStatus.SUBMITTED
    }
    return (
      <Badge variant="outline" className={cn("font-medium flex items-center", statusConfig[status].color)}>
        {statusConfig[status].icon}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }
  
  // DocType badge component
  export function DocTypeBadge({ type }: { type: Document["type"] }) {
    if (!type)  type ="other"
    
    const typeConfig = {
      bank: { color: "bg-blue-100 text-blue-800 border-blue-200" },
      mpesa: { color: "bg-green-100 text-green-800 border-green-200" },
      other: { color: "bg-purple-100 text-purple-800 border-purple-200" },
    }
    
    return (
      //@ts-expect-error
      <Badge variant="outline" className={cn("font-medium", typeConfig[type].color)}>
        {type === "mpesa" ? "M-Pesa" : type.charAt(0).toUpperCase() + type.slice(1)}
      </Badge>
    )
  }
  
  // Time remaining component
  export function TimeRemaining({ expiresAt }: { expiresAt: Date }) {
    const now = new Date()
    const isExpired = expiresAt < now
  
    if (isExpired) {
      return <span className="text-red-500 font-medium">Expired</span>
    }
  
     const timeLeft = formatDistanceToNow(expiresAt, { addSuffix: true })
  
    // Calculate days remaining
    const daysRemaining = Math.ceil((expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  
    let colorClass = "text-green-600"
    if (daysRemaining < 7) colorClass = "text-yellow-600"
    if (daysRemaining < 3) colorClass = "text-orange-600"
  
    return <span className={cn("font-medium", colorClass)}>{timeLeft}</span>
  }
  