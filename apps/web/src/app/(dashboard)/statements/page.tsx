"use client";
import { DocumentsTable } from "@/app/(dashboard)/statements/table";
import { Button } from "@/components/ui/button";
import { PlusCircle, RefreshCcw } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getDocuments } from "./actions";
import type { Document } from "@altscore/gql-types";

export default function HomePage() {
  // Use React Query for data fetching with built-in caching & state management
  const { 
    data: documents = [],
    isLoading,
    isError,
    error,
    refetch,
    isFetching
  } = useQuery<Document[], Error>({
    queryKey: ['documents'],
    queryFn: async () => {
      const response = await getDocuments();
      return response;
    },
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    refetchOnWindowFocus: true, // Auto-refresh when the window regains focus
  });

  return (
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Document Management</h1>
        <div className="flex gap-4">
          <Button
            variant="outline"
            className="border-gray-200 text-gray-700 hover:bg-gray-50"
            onClick={() => refetch()}
            disabled={isLoading || isFetching}
          >
            <RefreshCcw className={`mr-2 h-4 w-4 ${isFetching ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Link href="/reports">
            <Button
              variant="outline"
              className="border-green-200 text-green-700 hover:bg-green-50"
            >
              View Reports
            </Button>
          </Link>
          <Link href="/statements/upload">
            <Button className="bg-green-500 hover:bg-green-600 text-white">
              <PlusCircle className="mr-2 h-4 w-4" />
              Upload Document
            </Button>
          </Link>
        </div>
      </div>

      {isError && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-md mb-6">
          {error instanceof Error ? error.message : "Failed to load documents"}
          <Button
            variant="link"
            className="text-red-700 ml-2 p-0 underline"
            onClick={() => refetch()}
          >
            Try again
          </Button>
        </div>
      )}

      {isLoading || isFetching && documents.length === 0 ? (
        <div className="py-16 flex justify-center items-center">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mb-4" />
            <p className="text-gray-500">Loading documents...</p>
          </div>
        </div>
      ) : documents.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
          <h3 className="text-lg font-medium text-gray-700 mb-2">No documents found</h3>
          <p className="text-gray-500 mb-6">Upload your first document to get started</p>
          <Link href="/statements/upload">
            <Button className="bg-green-500 hover:bg-green-600 text-white">
              <PlusCircle className="mr-2 h-4 w-4" />
              Upload Document
            </Button>
          </Link>
        </div>
      ) : (
        <div className={isFetching ? "opacity-60 transition-opacity" : ""}>
          <DocumentsTable documents={documents} />
          {isFetching && (
            <div className="absolute top-4 right-4">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-green-500" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}