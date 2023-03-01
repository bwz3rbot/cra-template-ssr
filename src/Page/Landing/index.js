import { Typography } from "@mui/material";
import TestComponent from "../../Component/Test";
import { useFirebaseContext } from "../../Firebase";
export default function PageLanding() {
	const { idToken } = useFirebaseContext();
	return (
		<div>
			<Typography>---Landing Page---</Typography>
			{idToken && <TestComponent />}
		</div>
	);
}
