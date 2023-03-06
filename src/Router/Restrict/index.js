import { useAuthContext } from "../../Firebase";
import { Navigate } from "react-router-dom";
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
	return <Navigate to="/signin" />;
};
