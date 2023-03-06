import { Typography } from "@mui/material";
import { Grid } from "@mui/material";

import { useLayoutVariant } from "../../../../Layout";
export default function PageSettings() {
	useLayoutVariant({
		variant: "SPA",
	});
	const Test = () => {
		return (
			<Grid
				item
				xs={12}
				sx={{
					border: "1px solid black",
				}}
			>
				<Typography>---Settings Page---</Typography>
			</Grid>
		);
	};
	return (
		<>
			{Array(100)
				.fill(0)
				.map((_, i) => (
					<Test key={i} />
				))}
		</>
	);
}
