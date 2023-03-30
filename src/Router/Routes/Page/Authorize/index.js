import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
export default function PageAuthorize() {
	const { search } = useLocation();
	const navigate = useNavigate();
	useEffect(() => {
		if (!search) return;
		const params = new URLSearchParams(search);
		const returnTo = params.get("returnTo");
		// authentication is handled in the auth provider.
		// this component is simply used to redirect the user when
		// withAuthenticationRequired fires from a protected route
		navigate(returnTo);
	}, [search]);
}
