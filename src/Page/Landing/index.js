import { Typography } from "@mui/material";
import TestComponent from "../../Component/Test";
import { useAuthContext } from "../../Firebase";

export default function PageLanding() {
	const { idToken } = useAuthContext();

	return (
		<div>
			<Typography>---Landing Page---</Typography>
			{idToken && <TestComponent />}
		</div>
	);
}
