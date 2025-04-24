"use client";
import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Amplify } from "aws-amplify";
import { outputs } from "@altscore/cdk-outputs";

import {
	Authenticator,
	useTheme,
	View,
	useAuthenticator,
	ThemeProvider,
	type Theme,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import AltScoreLogo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { fetchAuthSession, signUp, type SignUpInput } from "aws-amplify/auth";

// @ts-expect-error
Amplify.configure(outputs, {
	API: {
		GraphQL: {
			headers: async () => ({
				Authorization: await getAuthToken(),
			}),
		},
	},
	ssr: true,
});

async function getAuthToken() {
	const session = await fetchAuthSession();
	return session.tokens?.accessToken.toString();
}

export function AuthConfig({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	const { tokens } = useTheme();

	//   useEffect(() => {
	//     if (authStatus === "authenticated") {
	//       router.push("/reports");
	//     }
	//   }, [authStatus, router]);

	const theme = useMemo<Theme>(
		() => ({
			name: "AltScore Auth Theme",
			tokens: {
				colors: {
					brand: {
						primary: {
							10: tokens.colors.white,
							20: "#d7f9e9",
							60: "rgba(38, 166, 91, 0.2)",
							80: "#26A65B",
							90: "#1E8449",
							100: "#26A65B",
						},
					},
					neutral: {
						...tokens.colors.neutral,
						80: "#333333",
						90: "#222222",
						100: "#111111",
					},
					overlay: {
						...tokens.colors.overlay,
						10: "rgba(0, 0, 0, 0.05)",
					},
				},
				components: {
					authenticator: {
						container: {},
						router: { borderWidth: "0" },
						form: {
							padding: `${tokens.space.medium} ${tokens.space.xl} ${tokens.space.medium}`,
						},
					},
					button: {
						primary: {
							backgroundColor: "{colors.brand.primary.100}",
							color: "{colors.white}",
							_hover: { backgroundColor: "{colors.brand.primary.90}" },
						},
						link: {
							color: "{colors.brand.primary.80}",
							_hover: { color: "{colors.brand.primary.90}" },
						},
					},
					fieldcontrol: {
						borderColor: "#E0E0E0",
						_focus: {
							borderColor: "{colors.brand.primary.80}",
							boxShadow: `0 0 0 1px {colors.brand.primary.60}`,
						},
					},
					tabs: {
						item: {
							color: "{colors.neutral.80}",
							_active: {
								borderColor: "{colors.brand.primary.100}",
								color: "{colors.brand.primary.100}",
							},
							_hover: { color: "{colors.brand.primary.80}" },
						},
					},
					input: { color: "{colors.neutral.90}" },
					heading: { color: "#002E42" },
				},
			},
		}),
		[tokens],
	);

	const components = useMemo(
		() => ({
			Header: () => (
				<View textAlign="center" padding={tokens.space.large}>
					<AltScoreLogo />
				</View>
			),
			SignIn: {
				Footer: () => {
					const { toForgotPassword } = useAuthenticator();
					return (
						<View textAlign="right">
							<Button
								onClick={toForgotPassword}
								variant="link"
								className="text-[#26A65B]"
							>
								Reset Password ?
							</Button>
						</View>
					);
				},
			},
			SignUp: {
				Footer: () => {
					const { toSignIn } = useAuthenticator();
					return (
						<View textAlign="right">
							<Button
								onClick={toSignIn}
								size="sm"
								variant="link"
								className="text-[#26A65B]"
							>
								Got Account? <b> Sign In</b>
							</Button>
						</View>
					);
				},
			},
		}),
		[tokens.space.large],
	);

	const services = {
		async handleSignUp(input: SignUpInput) {
			// custom username and email
			const { username, password } = input;

			return signUp({
				username: username,
				password,
				options: {
					...input.options,
					userAttributes: {
						...input.options?.userAttributes,
						email: username,
					},
				},
			});
		},
	};
	return (
		<ThemeProvider theme={theme}>
			<View padding="xxl" className="bg-[#d7f9e9] h-screen">
				<Authenticator
					className="bg-transparent h-auto w-auto"
					components={components}
					hideSignUp={false}
          services={services}
				>
					{children}
				</Authenticator>
			</View>
		</ThemeProvider>
	);
}
