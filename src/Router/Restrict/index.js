import { useAuthContext } from "../../Auth";
import { Navigate, Redirect } from "react-router-dom";
export const Restrict = ({ children, allowAnonymous }) => {
	const { user } = useAuthContext();

	// handle anonymous user
	if (user?.isAnonymous && allowAnonymous) {
		return <>{children}</>;
	}

	// handle authenticated user
	if (user && !user.isAnonymous) {
		return <>{children}</>;
	}

	// handle unauthenticated user

	// only use Navigate if client side
	if (typeof window !== "undefined") {
		console.log("navigating to signin");
		return <Navigate to="/signin" />;
	}
	// use Redirect if server side
	return children;
};
