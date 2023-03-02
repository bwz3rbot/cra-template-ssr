import { Typography } from "@mui/material";
import { useState } from "react";
import TestComponent from "../../Component/Test";
import { useFirebaseContext } from "../../Firebase";
import { useLayoutVariant } from "../../Layout";

export default function PageLanding() {
	const [isOn, setIsOn] = useState(false);

	const { idToken } = useFirebaseContext();
	useLayoutVariant({
		variant: "SPA",
	});

	console.log("rendering landing page");
	return (
		<div>
			<Typography>---Landing Page---</Typography>
			{idToken && <TestComponent />}
			<button
				onClick={() => {
					setIsOn(!isOn);
				}}
			></button>
		</div>
	);
}
