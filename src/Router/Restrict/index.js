import React from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";

export const RestrictedRoute = PrivateRoute => {
	const route = withAuthenticationRequired(PrivateRoute, {
		// Show a message while the user waits to be redirected to the login page.
		onRedirecting: () => <Navigate to="signin" />,
	});
	return route;
};
