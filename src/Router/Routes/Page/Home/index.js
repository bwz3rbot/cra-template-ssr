import User from "../../../../Component/User";

import UploadWidget from "../../../../Component/Upload";

import { Grid } from "@mui/material";

export default function PageHome() {
	return (
		<>
			<Grid container>
				<Grid item xs={12} sm={8} md={6}>
					<User />
				</Grid>
			</Grid>
			<UploadWidget />
		</>
	);
}
