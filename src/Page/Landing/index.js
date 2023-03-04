import { Typography } from "@mui/material";
import QueryComponent from "../../Component/Query";
import SubscribeComponent from "../../Component/Subscribe";

import { useAuthContext } from "../../Firebase";
import { useLayoutVariant } from "../../Layout";

import UploadWidget from "../../Component/Upload";

export default function PageLanding() {
	useLayoutVariant({
		variant: "standard",
	});
	const { idToken } = useAuthContext();

	return (
		<div>
			<Typography>---Landing Page---</Typography>
			<UploadWidget />
		</div>
	);
}
