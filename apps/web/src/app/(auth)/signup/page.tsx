"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, CheckCircle, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Amplify } from "aws-amplify";

import { useAuthStore } from "@/lib/auth/authStore";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { redirect } from "next/navigation";
const formSchema = z.object({
	password: z.string().min(8).max(50),
	username: z.string().min(8).max(50).email(),
	confirmPassword: z.string().min(8).max(50),
});

export default function SignupPage() {
	const {signup} = useAuthStore()
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			password: "",
			username: "",
		},
	});
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	async function onSubmit(values: z.infer<typeof formSchema>) {
		await signup(values.username,values.password);
	}

	return (
		<Card className="w-full max-w-md shadow-lg">
			<CardHeader className="space-y-3">
				<div className="flex items-center gap-2 mx-auto">
					<div className="relative w-10 h-10 rounded-full bg-white flex items-center justify-center">
						<div className="absolute inset-0 rounded-full overflow-hidden">
							<div
								className="absolute inset-0 rounded-full"
								style={{
									background:
										"conic-gradient(#1E8449 0deg, #26A65B 90deg, #4CD964 180deg, #00566B 270deg, #002E42 360deg)",
								}}
							/>
						</div>
						<CheckCircle className="w-5 h-5 text-white z-10" />
					</div>
					<h1 className="text-2xl font-bold text-[#002E42]">AltScore</h1>
				</div>
				<CardTitle className="text-xl text-center">Create an account</CardTitle>
				<CardDescription className="text-center">
					Sign up for AltScore to analyze your financial statements
				</CardDescription>
			</CardHeader>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<CardContent className="space-y-4">
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem className="space-y-2">
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input placeholder="doe@mail.com" {...field} type="email" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem className="space-y-2">
									<FormLabel>Password</FormLabel>
									<FormControl>
										<div className="relative">
											<Input
												{...field}
												type={showPassword ? "text" : "password"}
												placeholder="••••••••"
												className="pr-10"
											/>
											<Button
												type="button"
												variant="ghost"
												size="icon"
												className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
												onClick={() => setShowPassword(!showPassword)}
											>
												{showPassword ? (
													<EyeOff size={16} />
												) : (
													<Eye size={16} />
												)}
											</Button>
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="confirmPassword"
							render={({ field }) => (
								<FormItem className="space-y-2">
									<FormLabel>Confirm Password</FormLabel>
									<FormControl>
										<FormControl>
											<div className="relative">
												<Input
													{...field}
													type={showConfirmPassword ? "text" : "password"}
													placeholder="••••••••"
													className="pr-10" // Adds right padding so text doesn't overlap with the button
												/>
												<Button
													type="button"
													variant="ghost"
													size="icon"
													className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
													onClick={() =>
														setShowConfirmPassword(!showConfirmPassword)
													}
												>
													{showConfirmPassword ? (
														<EyeOff size={16} />
													) : (
														<Eye size={16} />
													)}
												</Button>
											</div>
										</FormControl>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</CardContent>

					<CardFooter className="flex flex-col space-y-4 mt-5">
						<Button
							type="submit"
							className="w-full bg-[#26A65B] hover:bg-[#1E8449]"
						>
							Create{" "}
							{/* {pending ? "Creating account..." : "Create account"} */}
						</Button>
						<div className="text-sm text-center">
							Already have an account?{" "}
							<Link
								href="/login"
								className="text-[#26A65B] hover:underline font-medium"
							>
								Login
							</Link>
						</div>
					</CardFooter>
				</form>
			</Form>
		</Card>
	);
}
