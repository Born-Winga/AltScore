"use client";
import type { Document } from "@altscore/gql-types";
import { useRouter } from "next/navigation";
import { uploadData } from "aws-amplify/storage";
import ShortUniqueId from "short-unique-id";
import { toast } from "sonner";
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
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { useAuthStore } from "@/lib/auth/authStore";
import { Amplify } from "aws-amplify";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import { saveDocument } from "../actions";
import { cn } from "@/lib/utils";

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

const uid = new ShortUniqueId({ length: 6, dictionary: "hex", shuffle: true });

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
	custom_bank: z.string().optional().nullable(),
	password: z.string().optional().nullable(),
});

export default function AnalysisPage() {
	const router = useRouter();
	const bucket = Amplify.getConfig().Storage?.S3.bucket;
	const { authUser } = useAuthStore();
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [uploading, setUploading] = useState(false);
	const [uploadProgress, setUploadProgress] = useState(0);

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
		try {
			const path = await handleFileUpload(values.file);
			if (!path) return;

			const payload = {
				bank: values.bank,
				custom_bank: values.custom_bank,
				password: values.password,
				file_name: values.file.name,
				type: values.doc_type,
				url: path,
				userId: authUser?.sub ?? "",
				shortId: uid.rnd(),
			} as z.infer<typeof fileDbRefSchema>;

			await createStatementObject(payload);
			router.push("/statements");
		} catch (error) {
			toast.error("Submission failed. Please try again.");
		}
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file) return;

		if (file.type !== "application/pdf") {
			toast.error("Only PDF files are allowed.");
			event.target.value = "";
			return;
		}

		const maxSizeInBytes = 20 * 1024 * 1024;
		if (file.size > maxSizeInBytes) {
			toast.error("File size must not exceed 20MB.");
			event.target.value = "";
			return;
		}

		setSelectedFile(file);
		form.setValue("file", file, { shouldValidate: true });
	};

	const handleFileUpload = async (file: File) => {
		if (!file || !bucket) return null;

		const key = uuidv4();
		const path = `private/statements/${key}.pdf`;

		try {
			setUploading(true);
			const uploadTask = await uploadData({
				data: file,
				path,
				options: {
					bucket: { bucketName: bucket, region: "us-east-1" },
					contentType: file.type,
					onProgress: ({ transferredBytes, totalBytes }) => {
						if (totalBytes) {
							setUploadProgress(
								Math.round((transferredBytes / totalBytes) * 100),
							);
						}
					},
					metadata: { name: file.name, userId: authUser?.sub ?? "" },
				},
			}).result;

			return uploadTask.path;
		} catch (error) {
			toast.error("Upload failed");
			throw error;
		} finally {
			setUploading(false);
			setUploadProgress(0);
		}
	};

	const createStatementObject = async (
		record: z.infer<typeof fileDbRefSchema>,
	) => {
		try {
			let issuer = "N/A";
			if (record.type === "mpesa") {
				issuer = "mpesa";
			} else if (record.type === "bank") {
				issuer =
					record.bank === "other" ? (record.custom_bank ?? "N/A") : record.bank;
			}

			const payload = {
				id: uuidv4(),
				type: record.type,
				name: record.file_name,
				issuer,
				password: record.password,
				userId: record.userId,
				status: "SUBMITTED",
				shortId: uid.rnd(),
				url: record.url,
			} as unknown as Document;

			await saveDocument(payload);
			toast.success("Document submitted successfully");
		} catch (error) {
			toast.error("Failed to save document");
			throw error;
		}
	};

	return (
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

			<Card className="shadow-lg rounded-xl w-full">
				<CardHeader className="pb-2">
					<CardTitle>Upload Statement</CardTitle>
					<CardDescription>
						{uploading
							? "Uploading Statement."
							: "Upload a PDF M-Pesa or Bank statement for automated analysis."}
					</CardDescription>
				</CardHeader>

				<CardContent className="w-full">
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-6 w-full"
						>
							<FormField
								control={form.control}
								name="doc_type"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>Statement Type</FormLabel>
										<Select
											onValueChange={field.onChange}
											value={field.value}
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

							{docType === "bank" && (
								<FormField
									control={form.control}
									name="bank"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Select Bank</FormLabel>
											<Select
												onValueChange={field.onChange}
												value={field.value}
												disabled={uploading}
											>
												<FormControl className="w-full">
													<SelectTrigger>
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

							{docType === "bank" && bank === "other" && (
								<FormField
									control={form.control}
									name="custom_bank"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Your Bank</FormLabel>
											<FormControl>
												<Input
													disabled={uploading}
													placeholder="Enter your bank name"
													{...field}
													value={field.value ?? ""}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							)}

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
															form.resetField("file");
														}}
													>
														Clear
													</Button>
												</>
											) : (
												<>
													<Upload className="mx-auto h-10 w-10 text-gray-400" />
													<p className="text-sm text-gray-500 mb-4">
														PDF only (Max 20MB)
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

							{uploadProgress > 0 && (
								<div className="mt-6 mb-2 w-full">
									<div className="flex items-center justify-between mb-2">
										<span className="text-sm font-medium text-green-700">
											Upload progress
										</span>
										<span className="text-sm font-medium text-green-700">
											{uploadProgress}%
										</span>
									</div>
									<div className="relative">
										<div className="h-2 w-full bg-green-100 rounded-full overflow-hidden">
											<div
												className="h-full bg-green-500 rounded-full transition-all duration-300"
												style={{ width: `${uploadProgress}%` }}
											/>
										</div>
									</div>
								</div>
							)}

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

							<div className="flex justify-end">
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
