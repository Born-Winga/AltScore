"use client";

import { useEffect } from "react";

import { useAmplifyConfig } from "@/lib/amp-cfgn";
import { Amplify } from "aws-amplify";

export default function AmplifyConf({
	children,
}: { children: React.ReactNode }) {
	const { setConfig } = useAmplifyConfig();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const init = async () => {
			try {
				const config = Amplify?.getConfig() ?? null;
				console.log(config)
				setConfig(config);
			} catch (err) {
			} finally {
			}
		};

		init();
	}, []);

	return <>{children}</>;
}
