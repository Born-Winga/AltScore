import { CardContent, Card } from "@/components/ui/card";
import {
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
	Table,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	TooltipProvider,
	TooltipTrigger,
	TooltipContent,
	Tooltip,
} from "@/components/ui/tooltip";
import {
	type SortingState,
	type ColumnFiltersState,
	type VisibilityState,
	useReactTable,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	getFilteredRowModel,
	flexRender,
} from "@tanstack/react-table";
import { Search } from "lucide-react";
import React, { useState } from "react";
import type { Document } from "@altscore/gql-types";
import { columns } from "./columns";

export function DocumentsTable({
	documents,
}: {
	documents: Document[];
}) {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = useState({});
	const [statusFilter, setStatusFilter] = useState<string[]>([]);
	const [docTypeFilter, setDocTypeFilter] = useState<string[]>([]);

	const table = useReactTable({
		data: documents,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	});

	const handleStatusFilter = (status: Document["status"]) => {
		if (status == null) return; // Do nothing if status is null or undefined

		setStatusFilter((prev) => {
			if (prev.includes(status)) {
				// Using a type predicate to ensure filter returns only strings
				return prev.filter((s): s is string => s !== status);
			}
			return [...prev, status];
		});
	};

	const handleDocTypeFilter = (docType: Document["type"]) => {
		if (docType == null) return; // Do nothing if docType is null or undefined

		setDocTypeFilter((prev) => {
			if (prev.includes(docType)) {
				// Type predicate to ensure returned array is string[]
				return prev.filter((d): d is string => d !== docType);
			}
			return [...prev, docType];
		});
	};

	// Update table filters when our custom filters change
	React.useEffect(() => {
		if (statusFilter.length > 0) {
			table.getColumn("status")?.setFilterValue(statusFilter);
		} else {
			table.getColumn("status")?.setFilterValue(undefined);
		}

		if (docTypeFilter.length > 0) {
			table.getColumn("type")?.setFilterValue(docTypeFilter);
		} else {
			table.getColumn("type")?.setFilterValue(undefined);
		}
	}, [statusFilter, docTypeFilter, table]);

	return (
		<div>
			<Card className="border-green-100">
				<CardContent className="p-6">
					<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
						<div className="flex w-full max-w-sm items-center space-x-2">
							<Search className="h-4 w-4 text-gray-400" />
							<Input
								placeholder="Search files..."
								value={
									(table.getColumn("name")?.getFilterValue() as string) ?? ""
								}
								onChange={(event) =>
									table.getColumn("name")?.setFilterValue(event.target.value)
								}
								className="h-10"
							/>
						</div>

						<div className="flex flex-wrap gap-2">
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger asChild>
										<Button
											variant="outline"
											size="sm"
											onClick={() => handleStatusFilter("PROCESSED")}
											className={cn(
												"border-green-200",
												statusFilter.includes("PROCESSED") &&
													"bg-green-100 text-green-800",
											)}
										>
											Active
										</Button>
									</TooltipTrigger>
									<TooltipContent>
										<p>Filter by active documents</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>

							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger asChild>
										<Button
											variant="outline"
											size="sm"
											onClick={() => handleStatusFilter("PROCESSING")}
											className={cn(
												"border-yellow-200",
												statusFilter.includes("PROCESSING") &&
													"bg-yellow-100 text-yellow-800",
											)}
										>
											Pending
										</Button>
									</TooltipTrigger>
									<TooltipContent>
										<p>Filter by pending documents</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>

							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger asChild>
										<Button
											variant="outline"
											size="sm"
											onClick={() => handleStatusFilter("REJECTED")}
											className={cn(
												"border-red-200",
												statusFilter.includes("expired") &&
													"bg-red-100 text-red-800",
											)}
										>
											Expired
										</Button>
									</TooltipTrigger>
									<TooltipContent>
										<p>Filter by expired documents</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>

							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger asChild>
										<Button
											variant="outline"
											size="sm"
											onClick={() => handleDocTypeFilter("bank")}
											className={cn(
												"border-blue-200",
												docTypeFilter.includes("bank") &&
													"bg-blue-100 text-blue-800",
											)}
										>
											Bank
										</Button>
									</TooltipTrigger>
									<TooltipContent>
										<p>Filter by bank statements</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>

							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger asChild>
										<Button
											variant="outline"
											size="sm"
											onClick={() => handleDocTypeFilter("mpesa")}
											className={cn(
												"border-green-200",
												docTypeFilter.includes("mpesa") &&
													"bg-green-100 text-green-800",
											)}
										>
											M-Pesa
										</Button>
									</TooltipTrigger>
									<TooltipContent>
										<p>Filter by M-Pesa statements</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>

							{(statusFilter.length > 0 || docTypeFilter.length > 0) && (
								<Button
									variant="ghost"
									size="sm"
									onClick={() => {
										setStatusFilter([]);
										setDocTypeFilter([]);
									}}
									className="text-gray-500"
								>
									Clear Filters
								</Button>
							)}
						</div>
					</div>

					<div className="rounded-md border border-green-100">
						<Table>
							<TableHeader>
								{table.getHeaderGroups().map((headerGroup) => (
									<TableRow
										key={headerGroup.id}
										className="bg-green-50 border border-green-100 py-4"
									>
										{headerGroup.headers.map((header) => {
											return (
												<TableHead key={header.id}>
													{header.isPlaceholder
														? null
														: flexRender(
																header.column.columnDef.header,
																header.getContext(),
															)}
												</TableHead>
											);
										})}
									</TableRow>
								))}
							</TableHeader>
							<TableBody>
								{table.getRowModel().rows?.length ? (
									table.getRowModel().rows.map((row) => (
										<TableRow
											key={row.id}
											data-state={row.getIsSelected() && "selected"}
											className="hover:bg-green-50/50 border border-green-100 py-4"
										>
											{row.getVisibleCells().map((cell) => (
												<TableCell key={cell.id}>
													{flexRender(
														cell.column.columnDef.cell,
														cell.getContext(),
													)}
												</TableCell>
											))}
										</TableRow>
									))
								) : (
									<TableRow>
										<TableCell
											colSpan={columns.length}
											className="h-24 text-center"
										>
											No documents found.
										</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</div>

					<div className="flex items-center justify-between space-x-2 py-4">
						<div className="text-sm text-gray-500">
							Showing {table.getFilteredRowModel().rows.length} of{" "}
							{documents.length} documents
						</div>
						<div className="flex items-center space-x-2">
							<Button
								variant="outline"
								size="sm"
								onClick={() => table.previousPage()}
								disabled={!table.getCanPreviousPage()}
								className="border-green-200 text-green-700"
							>
								Previous
							</Button>
							<Button
								variant="outline"
								size="sm"
								onClick={() => table.nextPage()}
								disabled={!table.getCanNextPage()}
								className="border-green-200 text-green-700"
							>
								Next
							</Button>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
