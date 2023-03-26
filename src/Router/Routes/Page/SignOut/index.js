import { useCookies } from "../../../../Cookies";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export default function SubscribePage() {
	const navigate = useNavigate();
	const cookies = useCookies();
	useEffect(() => {
		cookies.remove("user");
		navigate("/");
	}, []);

	return <></>;
}
