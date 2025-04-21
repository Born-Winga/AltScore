"use client";

import {
	signIn,
	signUp,
	signOut,
	resetPassword,
	resendSignUpCode,
	confirmSignUp,
	autoSignIn,
	type AuthError,
	type AuthTokens,
	type AuthSession,
	type AuthUser,
	type JWT,
	type FetchUserAttributesOutput,
	fetchAuthSession,
	fetchUserAttributes,
} from "aws-amplify/auth";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { create } from "zustand";

type Nullable<T> = T | null;

interface ITAuthContext {
	isSignedIn: Nullable<boolean>;
	setIsSignedIn: (value: Nullable<boolean>) => void;

	username: Nullable<string>;
	setUsername: (value: Nullable<string>) => void;

	pwd: Nullable<string>;
	setPwd: (value: Nullable<string>) => void;

	user: Nullable<AuthUser>;
	setUser: (value: Nullable<AuthUser>) => void;

	authUser: Nullable<FetchUserAttributesOutput>;
	setAuthUser: (value: Nullable<FetchUserAttributesOutput>) => void;

	authTokens: Nullable<AuthTokens>;
	setAuthTokens: (value: Nullable<AuthTokens>) => void;

	authSession: Nullable<AuthSession>;
	setAuthSession: (value: Nullable<AuthSession>) => void;

	authError: Nullable<AuthError>;
	setAuthError: (value: Nullable<AuthError>) => void;

	jwt: Nullable<JWT>;
	setJwt: (value: Nullable<JWT>) => void;

	signup: (username: string, password: string) => Promise<void>;
	login: (username: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
	resetPwd: (username: string) => Promise<void>;
	confirmReg: (username: string, code: string) => Promise<void>;
	resendCode: (username: string) => Promise<void>;

	loadUser: () => Promise<void>;

	authLinks: {
		confirmReg: string;
		login: string;
		signup: string;
		reset: string;
	};

	sessionType?: "login" | "signup" | "confirm";
	redirectUrl?: string;
}

export const useAuthStore = create<ITAuthContext>((set, get) => ({
	// Auth State
	isSignedIn: null,
	setIsSignedIn: (isSignedIn) => set({ isSignedIn }),

	username: null,
	setUsername: (username) => set({ username }),

	pwd: null,
	setPwd: (pwd) => set({ pwd }),

	user: null,
	setUser: (user) => set({ user }),

	authUser: null,
	setAuthUser: (authUser) => set({ authUser }),

	authTokens: null,
	setAuthTokens: (authTokens) => set({ authTokens }),

	authSession: null,
	setAuthSession: (authSession) => set({ authSession }),

	authError: null,
	setAuthError: (authError) => set({ authError }),

	jwt: null,
	setJwt: (jwt) => set({ jwt }),

	authLinks: {
		confirmReg: "/signup/confirm",
		login: "/login",
		signup: "/signup",
		reset: "/reset",
	},

	loadUser: async () => {
		if (get().authUser !== null) return;

		try {
			const user = await fetchUserAttributes();
			const session = await fetchAuthSession();
			const { tokens } = session;
			console.log({ user, tokens, session });
			set({
				authUser: user,
				authTokens: tokens,
				isSignedIn: true,
				authSession: session,
			});
		} catch (err) {
			set({
				isSignedIn: false,
				authUser: null,
				authTokens: null,
			});
		}
	},

	signup: async (username, password) => {
		try {
			const { nextStep } = await signUp({
				username,
				password,
				options: {
					userAttributes: {
						email: username,
					},
					autoSignIn: {
						authFlowType: "USER_PASSWORD_AUTH",
					},
				},
			});
			if (nextStep.signUpStep === "CONFIRM_SIGN_UP") {
				redirect("/signup/confirm");
			}
		} catch (error) {
			toast.error("Signup failed");
			console.log("Signup Error:", error);
			set({ authError: error as AuthError });
		}
	},

	login: async (username: string, password: string) => {
		try {
			const {
				isSignedIn,
				nextStep: { signInStep },
			} = await signIn({ username, password });

			if (isSignedIn && signInStep === "DONE") {
				set({ isSignedIn: true });
				await get().loadUser();
				console.log(get().authUser)
				redirect("/statements");
			}
		} catch (error) {
			console.error("Login error:", error);
			//@ts-expect-error
			toast.error(error?.message ?? "Invalid credentials");
			set({ isSignedIn: false });
		}
	},

	logout: async () => {
		try {
			await signOut({ global: true });
			set({
				isSignedIn: false,
				user: null,
				authTokens: null,
				authSession: null,
				authUser: null,
				jwt: null,
			});
		} catch (error) {
			console.error("Logout Error:", error);
		}
	},

	resetPwd: async (username) => {
		try {
			await resetPassword({ username });
			toast.success("Password reset code sent");
		} catch (error) {
			console.error("Reset Password Error:", error);
			toast.error("Failed to reset password");
		}
	},

	confirmReg: async (username, code) => {
		try {
			const { nextStep } = await confirmSignUp({
				username,
				confirmationCode: code,
			});

			if (nextStep.signUpStep === "COMPLETE_AUTO_SIGN_IN") {
				const { nextStep: signInStep } = await autoSignIn();
				if (signInStep.signInStep === "DONE") {
					set({ isSignedIn: true });
					redirect("/");
				}
			}
		} catch (error) {
			console.error("Confirm Registration Error:", error);
			toast.error("Confirmation failed");
		}
	},

	resendCode: async (username) => {
		try {
			await resendSignUpCode({ username });
			toast.success("Verification code resent");
		} catch (error) {
			console.error("Resend Code Error:", error);
			toast.error("Failed to resend code");
		}
	},
}));
