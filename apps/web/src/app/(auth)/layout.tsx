import type React from "react";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

import { NuqsAdapter } from "nuqs/adapters/next";
export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="min-h-screen flex flex-col">
			<header className="border-none bg-green-200 py-4 px-6 shadow-2xl">
				<Link href="/" className="flex items-center gap-2">
					<div className="relative w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
						<div className="absolute inset-0 rounded-full overflow-hidden">
							<div
								className="absolute inset-0 rounded-full"
								style={{
									background:
										"conic-gradient(#1E8449 0deg, #26A65B 90deg, #4CD964 180deg, #00566B 270deg, #002E42 360deg)",
								}}
							/>
						</div>
						<CheckCircle className="w-4 h-4 text-white z-10" />
					</div>
					<h1 className="text-xl font-bold text-[#002E42]">AltScore</h1>
				</Link>
			</header>
			<main className="flex-1 flex items-center justify-center bg-green-100 p-6">
				<NuqsAdapter>{children}</NuqsAdapter>
			</main>
		</div>
	);
}
