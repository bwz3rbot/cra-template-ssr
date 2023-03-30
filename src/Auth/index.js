import { Auth0Provider, withAuth0, useAuth0 } from "@auth0/auth0-react";
import { useCookies } from "../Cookies";
import { createContext, useContext, useEffect } from "react";
import LoadingScreen from "../Component/LoadingScreen";
import { useIsSSR } from "react-aria";

// Using SSRUserContext - the server will decode the token generated at login and pass the user down to the client
const SSRUserContext = createContext({
	user: null,
});
export const useSSRUser = () => useContext(SSRUserContext);
export const Auth0SSRUserProvider = ({ children, user }) => {
	return (
		<SSRUserContext.Provider
			value={{
				user,
			}}
		>
			{children}
		</SSRUserContext.Provider>
	);
};

// In case we are on the server,
// check for a user then add it to auth0 before rendering the application
const WithAuth0 = withAuth0(({ auth0, children }) => {
	const { user } = useSSRUser();
	const isSSR = useIsSSR();

	if (!isSSR) {
		return (
			<LoadingScreen loading={auth0.isLoading}>{children}</LoadingScreen>
		);
	}

	auth0.user = user;
	auth0.isAuthenticated = !!user;
	return children;
});

// This component will re-render and persist a new token whenever the user changes
const Persistor = ({ children }) => {
	const { user, getAccessTokenSilently, isLoading } = useAuth0();
	const cookies = useCookies();
	const isSSR = useIsSSR();
	useEffect(() => {
		if (!user) return;
		const asyncEffect = async () => {
			const { id_token } = await getAccessTokenSilently({
				detailedResponse: true,
				authorizationParams: {
					scope: "read:current_user offline_access",
				},
			});
			cookies.set("token", `Bearer ${id_token}`, {
				path: "/",
				sameSite: "lax",
				secure: true,
			});
		};
		asyncEffect();
	}, [getAccessTokenSilently, user?.sub]);

	return (
		<LoadingScreen
			loading={
				// no need to show loading screen on the server,
				// the user is already decoded and passed down to the client
				!isSSR && isLoading
			}
		>
			<WithAuth0>{children}</WithAuth0>
		</LoadingScreen>
	);
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
