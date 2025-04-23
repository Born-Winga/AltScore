"use client";

import { signOut, getCurrentUser } from "aws-amplify/auth";
import { create } from "zustand";

type Nullable<T> = T | null;

interface ITAuthContext {
	userId: Nullable<string>;
	setUserId: (value: Nullable<string>) => void;
	loadUser: () => Promise<void>;
}

export const useAuthStore = create<ITAuthContext>((set, get) => ({
	userId: null,
	setUserId: (userId) => set({ userId }),

	loadUser: async () => {
		if (get().setUserId !== null) return;

		try {
			const currentUser = await getCurrentUser();
			set({
				userId: currentUser.userId,
			});
		} catch (err) {
			set({
				userId: null,
			});
		}
	},

	logout: async () => {
		try {
			await signOut({ global: true });
			set({
				userId: null,
			});
		} catch (error) {
			console.error("Logout Error:", error);
		}
	},
}));
