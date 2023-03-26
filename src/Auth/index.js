import { useCookies } from "../Cookies";
import { Auth0Provider, withAuth0, useAuth0 } from "@auth0/auth0-react";
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
	const { user } = useAuth0();
	const cookies = useCookies();
	useEffect(() => {
		if (!user) return;
		cookies.set("user", JSON.stringify(user));
	}, [user]);
	return <PreloadedAppUserState>{children}</PreloadedAppUserState>;
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
