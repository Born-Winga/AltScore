"use client";

import { useQueryState } from "nuqs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { confirmSignUp, autoSignIn, resendSignUpCode } from "aws-amplify/auth";
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
import { useAuthStore } from "@/lib/auth/authStore";
const formSchema = z.object({
	username: z.string().min(8).max(50).email(),
	code: z.string().min(4),
});

export default function SignupPage() {
	const { username, confirmReg, resendCode } = useAuthStore();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			code: "",
			username: username ?? "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		await confirmReg(values.username, values.code);
	}

	async function sendCode() {
		if (username) {
			await resendCode(username);
		}
	}

	return (
		<Card className="w-full max-w-md shadow-lg">
			<CardHeader className="space-y-3">
				<CardDescription className="text-center">
					Check your {username} for code
				</CardDescription>
			</CardHeader>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<CardContent className="space-y-4">
						<FormField
							control={form.control}
							name="code"
							render={({ field }) => (
								<FormItem className="space-y-2">
									<FormLabel>code</FormLabel>
									<FormControl>
										<Input placeholder="******" {...field} type="text" />
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
							Submit{" "}
						</Button>
						<div className="text-sm text-right flex justify-end">
							<Button
								variant={"ghost"}
								onClick={sendCode}
								className="text-[#26A65B] hover:underline font-medium"
							>
								Resend Code ?
							</Button>
						</div>
					</CardFooter>
				</form>
			</Form>
		</Card>
	);
}
