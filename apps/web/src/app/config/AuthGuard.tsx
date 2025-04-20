"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/lib/auth/authStore";
import { useRouter, usePathname } from "next/navigation";
import { LockIcon } from "lucide-react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
	const { loadUser, authUser, authLinks } = useAuthStore();
	const router = useRouter();
	const path = usePathname();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const init = async () => {
			try {
				if (!authUser) {
					await loadUser();
				}
			} catch (err) {
				console.error("Auth load error:", err);
			} finally {
				setIsLoading(false);
			}
		};

		init();
	}, [authUser, loadUser]);

	useEffect(() => {
		if (isLoading) return; // Wait until load is done
		const isAuthRoute = Object.values(authLinks).includes(path);
		if (!authUser && !isAuthRoute) {
			router.replace("/login");
		}
	}, [authUser, isLoading, path, authLinks, router]);

	if (isLoading) {
		return (
			<div className="h-screen flex items-center justify-center">
				 <LockIcon/> Authorizing ...
			</div>
		);
	}

	return <>{children}</>;
}
