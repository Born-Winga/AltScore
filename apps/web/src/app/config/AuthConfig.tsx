"use client";

import type React from "react";

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
import { fetchAuthSession } from "aws-amplify/auth";

// Keep the original Amplify configuration
Amplify.configure(outputs, {
	API: {
		GraphQL: {
		  headers: async () => {
			return {
			  Authorization: await getAuthToken(),
			};
		  },
		},
	  },
	ssr: true,
});

async function getAuthToken() {
	const session = await fetchAuthSession();
	return session.tokens?.accessToken.toString();
  }
export default function ConfigureAmplifyClientSide({
	children,
}: {
	children: React.ReactNode;
}) {
	return <AuthConfig>{children}</AuthConfig>;
}

export function AuthConfig({
	children,
}: {
	children: React.ReactNode;
}) {
	const components = {
		Header() {
			const { tokens } = useTheme();
			return (
				<View textAlign={"center"} padding={tokens.space.large}>
					<AltScoreLogo />
				</View>
			);
		},

		SignIn: {
			Footer() {
				const { toForgotPassword } = useAuthenticator();
				return (
					<View textAlign="right">
						<Button
							onClick={toForgotPassword}
							variant={"link"}
							className="text-[#26A65B]"
						>
							Reset Password ?
						</Button>
					</View>
				);
			},
		},
		SignUp: {
			Footer() {
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
	};

	const { tokens } = useTheme();
	const theme: Theme = {
		name: "AltScore Auth Theme",
		tokens: {
			colors: {
				brand: {
					primary: {
						10: tokens.colors.white, // White background for form
						20: "#d7f9e9", // Light mint green for background (from image)
						60: "rgba(38, 166, 91, 0.2)", // Light green for focus shadow
						80: "#26A65B", // Medium green for links/accents (from image)
						90: "#1E8449", // Darker green for hover states
						100: "#26A65B", // Primary green for buttons (from image)
					},
				},
				neutral: {
					...tokens.colors.neutral,
					80: "#333333", // Dark gray for text
					90: "#222222", // Darker gray for input text
					100: "#111111", // Almost black
				},
				overlay: {
					...tokens.colors.overlay,
					10: "rgba(0, 0, 0, 0.05)", // Subtle shadow
				},
			},
			components: {
				authenticator: {
					container: {
					
					},
					router: {
						borderWidth: "0",
					},
					form: {
						padding: `${tokens.space.medium} ${tokens.space.xl} ${tokens.space.medium}`,
					},
				},
				button: {
					primary: {
						backgroundColor: "{colors.brand.primary.100}", // Green button
						color: "{colors.white}", // White text
						_hover: {
							backgroundColor: "{colors.brand.primary.90}", // Darker green on hover
						},
					},
					link: {
						color: "{colors.brand.primary.80}", // Green link color
						_hover: {
							color: "{colors.brand.primary.90}",
						},
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
						_hover: {
							color: "{colors.brand.primary.80}",
						},
					},
				},
				input: {
					color: "{colors.neutral.90}",
				},
				heading: {
					color: "#002E42",
				},
			},
		},
	};

	return (
		<ThemeProvider theme={theme}>
			<View padding="xxl" className="bg-[#d7f9e9]" height={"100vh"}>
				<Authenticator
					className="shadow-none bg-transparent h-auto w-auto"
					components={components}
					hideSignUp={false}
				>
					{children}
				</Authenticator>
			</View>
		</ThemeProvider>
	);
}
