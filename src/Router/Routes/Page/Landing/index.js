import Hero from "../../../../Component/Hero";
// https://www.shapedivider.app/

import { Box, Button, Grid, Typography } from "@mui/material";

const randomLoremGenrator = () => {
	const lorem = [
		`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit lib`,
	];
	const random = Math.floor(Math.random() * lorem.length);
	return lorem[random];
};

export default function PageLanding() {
	return (
		<Box
			sx={{
				width: "100%",

				display: "flex",
				justifyContent: "center",
			}}
		>
			<Hero />
		</Box>
	);
}
