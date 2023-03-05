import User from "../../Component/User";

import { useAuthContext } from "../../Firebase";
import { useLayoutVariant } from "../../Layout";

import UploadWidget from "../../Component/Upload";

import { Grid } from "@mui/material";

export default function PageLanding() {
	useLayoutVariant({
		variant: "standard",
	});
	const { isAuthenticated } = useAuthContext();

	return (
		<>
			<Grid container>
				<Grid item xs={6}>
					{isAuthenticated && <User />}
				</Grid>
			</Grid>
			<UploadWidget />
		</>
	);
}
