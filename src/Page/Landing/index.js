import { Typography } from "@mui/material";
import QueryComponent from "../../Component/Query";
import SubscribeComponent from "../../Component/Subscribe";

import { useAuthContext } from "../../Firebase";
import { useLayoutVariant } from "../../Layout";

export default function PageLanding() {
	useLayoutVariant({
		variant: "standard",
	});
	const { idToken } = useAuthContext();

	return (
		<div>
			<Typography>---Landing Page---</Typography>
			{idToken && <QueryComponent />}
			{idToken && <SubscribeComponent />}
		</div>
	);
}
