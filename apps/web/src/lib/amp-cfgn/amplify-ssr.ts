import { createServerRunner } from "@aws-amplify/adapter-nextjs";
import { outputs } from "../../../../../packages/amplify-outputs";

export const { runWithAmplifyServerContext } = createServerRunner({
	config: outputs,
});
