"use client";

import type React from "react";
import { uploadData } from "aws-amplify/storage";
import { generateClient } from "aws-amplify/data";
import type { SchemaType } from "../../../../../../../infra/amplify/data/schema"; // Path to your backend resource definition
import ShortUniqueId from "short-unique-id";
import { toast } from "sonner"; // make sure this import exists
import { useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Upload, FileText, ArrowLeft } from "lucide-react";
import {
	Select,
	SelectTrigger,
	SelectContent,
	SelectItem,
	SelectValue,
} from "@/components/ui/select";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/lib/auth/authStore";
import { Amplify } from "aws-amplify";
// Submit button

import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
import Link from "next/link";

const banks = [
	{ name: "KCB", value: "kcb" },
	{ name: "Equity", value: "equity" },
	{ name: "NCBK", value: "ncbk" },
	{ name: "Cooperative", value: "cooperative" },
	{ name: "Standard Chartered", value: "standard-chartered" },
	{ name: "I&M", value: "im" },
	{ name: "Family", value: "family" },
	{ name: "DTB", value: "dtb" },
	{ name: "ABSA", value: "absa" },
	{ name: "Other", value: "other" },
];

const uid = new ShortUniqueId({
	length: 6,
	dictionary: "hex",
	shuffle: true,
});

// Schema
const formSchema = z.object({
	doc_type: z.string(),
	bank: z.string().optional(),
	custom_bank: z.string().optional(),
	file: z
		.instanceof(File)
		.refine((f) => f.type === "application/pdf", "Only PDF files allowed"),
	password: z.string().optional(),
});

const fileDbRefSchema = z.object({
	file_name: z.string().min(1, "File name is required"),
	url: z.string().url("Must be a valid URL"),
	userId: z.string().min(1, "User ID is required"),
	type: z.string().min(1, "Type is required"),
	bank: z.string().min(1, "Bank is required"),
	custom_bank: z.string().optional().nullable(), // use `.optional()` if sometimes omitted
	password: z.string().optional().nullable(), // optional password
});

export default function AnalysisPage() {
	const bucket = Amplify.getConfig().Storage?.S3.bucket;
	const client = generateClient<SchemaType>({
		authMode: "userPool",
	});
	console.log();
	const { authUser } = useAuthStore();
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [uploading, setUploading] = useState<boolean>(false);
	const [fileDbRef, setFileDbRef] = useState<z.infer<typeof fileDbRefSchema>>();
	const [uploadProgress, setUploadProgress] = useState<number>(0);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			doc_type: undefined,
			bank: undefined,
			file: undefined,
			custom_bank: undefined,
			password: undefined,
		},
	});

	const docType = useWatch({ control: form.control, name: "doc_type" });
	const bank = useWatch({ control: form.control, name: "bank" });

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		console.log("Form submitted:", values);
		const path = await handleFileUpload(values.file);
		const payload = {
			bank: values.bank,
			custom_bank: values.custom_bank,
			password: values.password,
			file_name: values.file.name,
			type: values.doc_type,
			url: path ?? "",
			userId: authUser?.sub ?? "",
			shortId: uid.rnd(),
		} as z.infer<typeof fileDbRefSchema>;

		await createStatementObject(payload);
		console.log(payload);
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];

		if (!file) return;

		// Validate file type
		if (file.type !== "application/pdf") {
			console.log("Only PDF");
			toast.error("Only PDF files are allowed.");
			event.target.value = ""; // reset input
			return;
		}

		// Validate file size (20MB max)
		const maxSizeInBytes = 20 * 1024 * 1024; // 20MB
		if (file.size > maxSizeInBytes) {
			toast.error("File size must not exceed 20MB.");
			console.log("Size Error");
			event.target.value = ""; // reset input
			return;
		}

		// If valid, update state and form
		setSelectedFile(file);
		form.setValue("file", file, { shouldValidate: true });
	};

	async function handleFileUpload(file: File) {
		console.log(file);
		if (!file) return;

		const file_name = file.name;
		const file_type = file.type;
		console.log("Bucket: ", bucket);
		if (!bucket) {
			toast.error("Storage Bucket Not Defined");
			return;
		}

		console.log("Bucket 0: ", bucket);
		const key = uuidv4();
		const path = `private/statements/${key}.pdf`;

		try {
			setUploading(true);

			console.log("Bucket 1: ", bucket);
			const uploadTask = await uploadData({
				data: file,
				path,
				options: {
					bucket: {
						bucketName: bucket,
						region: "us-east-1",
					},
					contentType: file_type,
					onProgress: ({ transferredBytes, totalBytes }) => {
						if (totalBytes) {
							const percent = Math.round((transferredBytes / totalBytes) * 100);
							console.log("Progress: ", percent);
							setUploadProgress(percent);
						}
					},
					metadata: {
						name: file_name,
						userId: authUser?.sub ?? "",
					},
				},
			}).result;

			toast.success("Upload completed successfully");
			console.log("Uploaded path:", uploadTask.path);

			// build dynamodb object
			return uploadTask.path;
		} catch (err) {
			toast.error("Upload failed");
			console.error("Upload error:", err);
		} finally {
			console.log("Bucket 2: ", bucket);
			setUploading(false);
		}
	}

	async function createStatementObject(
		record: z.infer<typeof fileDbRefSchema>,
	) {
		try {
			let issuer = "N/A"
			if(record.type === "mpesa") issuer = "mpesa"
			if(record.type === "bank"){
				if(record.bank === "other") issuer = record.custom_bank ?? "N/A"
				if(record.bank === "bank") issuer = record.bank ?? "N/A"
			}
					
			setUploading(true);
			const { errors, data: doc } = await client.models.Document.create({
				id: uuidv4(),
				type: record.type,
				name: record.file_name,
				issuer,
				password: record.password,
				userId: record.userId,
				status: "SUBMITTED",
				createdAt: Date.now(),
				updatedAt: Date.now(),
				shortId: uid.rnd(),
				url: record.url
			});

			console.log({ errors, doc });
		} catch (err) {
			console.log(err);
		} finally {
			setUploading(false);
		}
	}

	useEffect(() => {
		const bucket = Amplify.getConfig().Storage?.S3.bucket;
		console.log("BUCKO: ", bucket);
	}, []);
	return (
		<div className="container mx-auto py-8 px-4 max-w-3xl">
			<div className="container mx-auto py-8 px-4 max-w-3xl">
				<div className="flex items-center mb-8">
					<Link href="/">
						<Button variant="ghost" size="sm" className="mr-4">
							<ArrowLeft className="mr-2 h-4 w-4" />
							Back to Documents
						</Button>
					</Link>
					<h1 className="text-2xl font-bold">Upload Document</h1>
				</div>
			</div>

			<Card className="shadow-lg rounded-xl w-full">
				<CardHeader className="pb-2">
					<CardTitle>Upload Statement</CardTitle>
					{!uploading && (
						<CardDescription>
							Upload a PDF M-Pesa or Bank statement for automated analysis.
						</CardDescription>
					)}
					{uploading && <CardDescription>Uploading Statement.</CardDescription>}
				</CardHeader>

				<CardContent className="w-full">
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-6 w-full"
						>
							{/* Document Type */}
							<FormField
								control={form.control}
								name="doc_type"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>Statement Type</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
											disabled={uploading}
										>
											<FormControl className="w-full">
												<SelectTrigger>
													<SelectValue placeholder="Select type" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="mpesa">M-Pesa</SelectItem>
												<SelectItem value="bank">Bank</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Bank Selection */}
							{docType === "bank" && (
								<FormField
									control={form.control}
									name="bank"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Select Bank</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
												disabled={uploading}
											>
												<FormControl className="w-full">
													<SelectTrigger disabled={uploading}>
														<SelectValue placeholder="Select your bank" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{banks.map((bank) => (
														<SelectItem key={bank.value} value={bank.value}>
															{bank.name}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
							)}

							{/* Custom Bank Field */}
							{docType === "bank" && bank === "other" && (
								<FormField
									control={form.control}
									name="custom_bank"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Your Bank</FormLabel>
											<FormControl className="w-full">
												<Input
													disabled={uploading}
													placeholder="Enter your bank name"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							)}

							{/* File Upload */}
							<FormField
								control={form.control}
								name="file"
								render={() => (
									<FormItem>
										<FormLabel>Upload Document</FormLabel>
										<div
											className={cn(
												"border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer",
												selectedFile
													? "border-green-400 bg-green-50"
													: "border-gray-200 hover:border-green-300 hover:bg-green-50",
											)}
											// onClick={() =>
											// 	!selectedFile && fileInputRef.current?.click()
											// }
										>
											{selectedFile ? (
												<>
													<FileText className="mx-auto h-10 w-10 text-green-500" />
													<p className="font-medium text-green-600">
														{selectedFile.name}
													</p>
													<p className="text-sm text-gray-500">
														{(selectedFile.size / 1024).toFixed(2)} KB
													</p>
													<Button
														type="button"
														variant="outline"
														className="mt-2"
														disabled={uploading}
														onClick={() => {
															setSelectedFile(null);
															//@ts-expect-error
															form.setValue("file", undefined);
															fileInputRef.current?.click();
														}}
													>
														Clear
													</Button>
												</>
											) : (
												<>
													<Upload className="mx-auto h-10 w-10 text-gray-400" />
													<p className="text-sm text-gray-500 mb-4">
														PDF only (Max 10MB)
													</p>
													<Button
														disabled={uploading}
														type="button"
														variant="outline"
														className="bg-green-50 text-green-600 border-green-200 hover:bg-green-100"
														onClick={() => fileInputRef.current?.click()}
													>
														Select File
													</Button>
													<Input
														ref={fileInputRef}
														type="file"
														className="hidden"
														accept=".pdf"
														onChange={handleFileChange}
													/>
												</>
											)}
										</div>
										<FormMessage />
									</FormItem>
								)}
							/>
							{uploadProgress > 0 && uploadProgress < 100 && (
								<div className="mt-6 mb-2 w-full">
									<div className="flex items-center justify-between mb-2">
										<span className="text-sm font-medium text-green-700">
											Uploading document
										</span>
										<span className="text-sm font-medium text-green-700">
											{uploadProgress}%
										</span>
									</div>
									<div className="relative">
										<div className="h-2 w-full bg-green-100 rounded-full overflow-hidden">
											<div
												className="h-full bg-green-500 rounded-full transition-all duration-300 ease-in-out"
												style={{ width: `${uploadProgress}%` }}
											/>
										</div>
										<div
											className="absolute -top-1 transition-all duration-300 ease-in-out"
											style={{ left: `${uploadProgress}%` }}
										>
											<div className="w-4 h-4 bg-white border-2 border-green-500 rounded-full shadow-md transform -translate-x-1/2" />
										</div>
									</div>
									<p className="text-xs text-gray-500 mt-2 italic">
										{uploadProgress < 30
											? "Starting upload..."
											: uploadProgress < 70
												? "Processing your document..."
												: "Almost done..."}
									</p>
								</div>
							)}
							{/* Password */}
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Code</FormLabel>
										<FormControl>
											<Input
												disabled={uploading}
												placeholder="Password (if protected)"
												{...field}
												value={field.value ?? ""}
											/>
										</FormControl>
									</FormItem>
								)}
							/>

							<div className="flex justify-end mt-8">
								<Button
									type="submit"
									className="bg-green-500 hover:bg-green-600 text-white"
									disabled={uploading}
								>
									{uploading ? "Uploading..." : "Submit"}
								</Button>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}
