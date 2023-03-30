import { Auth0Provider, withAuth0 } from "@auth0/auth0-react";
import { createContext, useContext } from "react";
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

export default function AuthContext({ children, user }) {
	return (
		<Auth0Provider
			domain={process.env.REACT_APP_AUTH0_DOMAIN}
			clientId={process.env.REACT_APP_AUTH0_CLIENTID}
			authorizationParams={{
				redirect_uri: process.env.REACT_APP_AUTH0_CALLBACK_URL,
			}}
		>
			<WithAuth0>{children}</WithAuth0>
		</Auth0Provider>
	);
}
