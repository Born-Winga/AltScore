import { DialogHeader } from "@/components/ui/dialog";
import { TableHeader } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
	TableRow,
	TableHead,
	TableBody,
	TableCell,
	Table,
} from "@/components/ui/table";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuItem,
	DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import type { ColumnDef } from "@tanstack/react-table";
import {
	ArrowUpDown,
	FileText,
	MoreHorizontal,
	Eye,
	Download,
	Trash2,
} from "lucide-react";
import type { Document } from "./utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DocTypeBadge, StatusBadge, TimeRemaining } from "./utils";
import { endOfTomorrow, format } from "date-fns";

export const columns: ColumnDef<Document>[] = [
	{
		accessorKey: "createdAt",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					className="pl-0"
				>
					Created At
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const date = row.getValue("createdAt") as Date;
			return <div>{format(date, "MMM d, yyyy")}</div>;
		},
	},
	{
		accessorKey: "shortId",
		header: "ID",
		cell: ({ row }) => {
			return <div className="font-medium uppercase">{row.getValue("shortId")}</div>;
		},
	},
	{
		accessorKey: "name",
		header: "File Name",
		cell: ({ row }) => {
            const name = row.getValue("name") as string
			return (
				<div className="flex items-center">
					<FileText className="h-4 w-4 mr-2 text-green-600" />
					<span className="font-medium truncate">{name.substring(0,10)}</span>
				</div>
			);
		},
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => {
			return <StatusBadge status={row.getValue("status")} />;
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
	},
	{
		accessorKey: "expiresAt",
		header: "Valid Until",
		cell: ({ row }) => {
            const time =  endOfTomorrow()
			return (
				<TimeRemaining expiresAt={time} />
			);
		},
	},
	{
		accessorKey: "type",
		header: "Doc Type",
		cell: ({ row }) => {
			return <DocTypeBadge type={row.getValue("type")} />;
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id));
		},
	},
	{
		accessorKey: "issuer",
		header: "Issuer",
		cell: ({ row }) => {
			return <div className="uppercase">{row.getValue("issuer")}</div>;
		},
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const document = row.original;
			const [showTransactions, setShowTransactions] = useState(false);

			return (
				<div className="flex justify-end">
					<Dialog open={showTransactions} onOpenChange={setShowTransactions}>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" className="h-8 w-8 p-0">
									<span className="sr-only">Open menu</span>
									<MoreHorizontal className="h-4 w-4" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuLabel>Actions</DropdownMenuLabel>
								<DropdownMenuItem onClick={() => setShowTransactions(true)}>
									<Eye className="mr-2 h-4 w-4" />
									View Transactions
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Download className="mr-2 h-4 w-4" />
									Download
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem className="text-red-600">
									<Trash2 className="mr-2 h-4 w-4" />
									Delete
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>

						<DialogContent className="sm:max-w-[600px]">
							<DialogHeader>
								<DialogTitle>Transactions for {document.name}</DialogTitle>
								<DialogDescription>
									Showing all transactions associated with this document.
								</DialogDescription>
							</DialogHeader>
							<div className="mt-4" />
						</DialogContent>
					</Dialog>
				</div>
			);
		},
	},
];
