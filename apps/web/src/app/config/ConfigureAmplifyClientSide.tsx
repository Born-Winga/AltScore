"use client";

import { Amplify } from "aws-amplify";
import { outputs } from "@score/amplify-outputs";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import AuthGuard from "./AuthGuard";

Amplify.configure(outputs, {
	ssr: true,
});

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
	return (
		<Authenticator.Provider>
			<AuthGuard>
				<main>{children}</main>
			</AuthGuard>
		</Authenticator.Provider>
	);
}
