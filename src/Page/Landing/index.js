import { Typography } from "@mui/material";
import TestComponent from "../../Component/Test";
import { useFirebaseContext } from "../../Firebase";
import { useLayoutVariant } from "../../Layout";

export default function PageLanding() {
	const { idToken } = useFirebaseContext();
	useLayoutVariant({
		variant: "SPA",
	});

	return (
		<div>
			<Typography>---Landing Page---</Typography>
			{idToken && <TestComponent />}
		</div>
	);
}
