import { useCookies } from "../Cookies";
import {
	Auth0Provider,
	withAuth0,
	useAuth0 as useAuth0Base,
} from "@auth0/auth0-react";
import LoadingScreen from "../Component/LoadingScreen";
import { useEffect } from "react";
import { useIsClient } from "usehooks-ts";
const PreloadedAppUserState = withAuth0(({ auth0, children }) => {
	const cookies = useCookies();
	const initialUser = cookies.get("user");

	const isClient = useIsClient();
	if (isClient) return children;
	auth0.user = initialUser;
	auth0.isAuthenticated = !!initialUser;

	return <>{children}</>;
});

const Persistor = ({ children }) => {
	const { user } = useAuth0Base();
	const cookies = useCookies();
	useEffect(() => {
		if (user) {
			console.log("settign user cookie", user);
			cookies.set("user", JSON.stringify(user));
		} else {
			console.log("Persistor did not have a user to set");
		}
	}, [user]);
	return <PreloadedAppUserState>{children}</PreloadedAppUserState>;
};

export const useAuth0 = () => {
	const auth0 = useAuth0Base();
	const cookies = useCookies();
	return {
		...auth0,
		logout: () => {
			auth0.logout({
				logoutParams: {
					returnTo: "http://localhost:8080/signout",
				},
			});
			cookies.remove("user");
		},
	};
};

export default function AuthContext({ children }) {
	return (
		<Auth0Provider
			domain={process.env.REACT_APP_AUTH0_DOMAIN}
			clientId={process.env.REACT_APP_AUTH0_CLIENTID}
			authorizationParams={{
				redirect_uri: process.env.REACT_APP_AUTH0_CALLBACK_URL,
			}}
		>
			<Persistor>{children}</Persistor>
		</Auth0Provider>
	);
}
