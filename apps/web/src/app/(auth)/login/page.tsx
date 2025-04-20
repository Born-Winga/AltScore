"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, CheckCircle } from "lucide-react";

import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "@/lib/auth/authStore";
const formSchema = z.object({
	username: z.string(),
	password: z.string(),
});

export default function LoginPage() {
	const { login} = useAuthStore();
	const [showPassword, setShowPassword] = useState(false);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
			password: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		await login(values.username, values.password);
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
				<CardTitle className="text-xl text-center">
					Login to your account
				</CardTitle>
			</CardHeader>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<CardContent>
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
								<FormItem className="space-y-2 mt-3">
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
					</CardContent>

					<CardFooter className="flex flex-col space-y-4 mt-4">
						<Button
							type="submit"
							className="w-full  bg-[#26A65B] hover:bg-[#1E8449]"
						>
							Login
						</Button>

						<div className="text-sm text-center">
							Don&apos;t have an account?{" "}
							<Link
								href="/signup"
								className="text-[#26A65B] hover:underline font-medium"
							>
								Sign up
							</Link>
						</div>
					</CardFooter>
				</form>
			</Form>
		</Card>
	);
}
function loginAction(state: { error: null; success: boolean }):
	| { error: null; success: boolean }
	| Promise<{ error: null; success: boolean }> {
	throw new Error("Function not implemented.");
}
