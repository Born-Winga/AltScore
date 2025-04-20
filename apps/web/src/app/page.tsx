import { useAuthenticator } from "@aws-amplify/ui-react";
import { redirect } from "next/navigation";
import { useAuthStore } from "../lib/auth/authStore";
import { Amplify } from "aws-amplify";
export default function Home() {
	const config = Amplify.getConfig();
	console.log(config)
	// if (!authStatus) {
	//   redirect('/login')
	// }
	return <div>Hello</div>;
}
