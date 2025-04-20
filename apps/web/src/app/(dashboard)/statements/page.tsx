"use client";
import { DocumentsTable } from "@/app/(dashboard)/statements/table";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { listDocuments } from "./actions";
import type { Document } from "./utils";

export default function HomePage() {
	const [data, setData] = useState<Document[]>([]);
	// load the ddocuments

	async function init() {
		const response = await listDocuments();
		setData(response?.data ?? []);
	}
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		init();
	}, []);
	return (
		<div className="container mx-auto py-8 px-4">
			<div className="flex items-center justify-between mb-8">
				<h1 className="text-2xl font-bold">Document Management</h1>
				<div className="flex gap-4">
					<Link href="/reports">
						<Button
							variant="outline"
							className="border-green-200 text-green-700 hover:bg-green-50"
						>
							View Reports
						</Button>
					</Link>
					<Link href="/upload">
						<Button className="bg-green-500 hover:bg-green-600 text-white">
							<PlusCircle className="mr-2 h-4 w-4" />
							Upload Document
						</Button>
					</Link>
				</div>
			</div>

			<DocumentsTable documents={data} />
		</div>
	);
}
