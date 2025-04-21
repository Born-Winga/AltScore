import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {AuthConfig} from "./config/AuthConfig";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "AltScore-Financial Statement Analysis",
	description: "Analyze your financial statements with AltScore",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Toaster />
				<AuthConfig>{children}</AuthConfig>
			</body>
		</html>
	);
}
