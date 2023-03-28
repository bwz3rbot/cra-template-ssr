import { useCookies } from "../Cookies";
import { Auth0Provider, withAuth0, useAuth0 } from "@auth0/auth0-react";
import { useEffect, createContext, useContext } from "react";
import LoadingScreen from "../Component/LoadingScreen";
import { useIsClient } from "usehooks-ts";

const SSRUserContext = createContext({
	user: null,
});
export const useSSRUser = () => useContext(SSRUserContext);
export const SSRUserProvider = ({ children, user }) => {
	return (
		<SSRUserContext.Provider
			value={{
				user,
			}}
		>
			<AuthContext>{children}</AuthContext>
		</SSRUserContext.Provider>
	);
};
const PreloadedAppUserState = withAuth0(({ auth0, children }) => {
	const { user } = useSSRUser();
	const isClient = useIsClient();

	if (isClient) return children;

	auth0.user = user;
	auth0.isAuthenticated = !!user;
	return <>{children}</>;
});
const Persistor = ({ children }) => {
	const { user, getAccessTokenSilently, isLoading } = useAuth0();
	const cookies = useCookies();
	const isClient = useIsClient();
	useEffect(() => {
		if (!user) return;
		getAccessTokenSilently({
			detailedResponse: true,
			authorizationParams: {
				scope: "openid profile email offline_access",
			},
		})
			.then(response => {
				cookies.set("token", `Bearer ${response.id_token}`);
			})
			.catch(err => {
				console.log("error getting token: ", err);
			});
	}, [user]);

	return (
		<PreloadedAppUserState>
			<LoadingScreen loading={isClient && isLoading}>
				{children}
			</LoadingScreen>
		</PreloadedAppUserState>
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
