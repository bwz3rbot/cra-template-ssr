import { Box, Grid, Typography, Card } from "@mui/material";

import Hero from "../../../../Component/Hero";
import { TextCard, ImageDescriptor } from "./FeatureCard";
import generateLorem from "../../../../util/lorem";

import { randomImage } from "../../../../util/randomImage";
const feature = [
	{
		title: generateLorem(1),
		description: generateLorem(),
		image: randomImage(),
	},
	{
		title: generateLorem(1),
		description: generateLorem(),
		image: randomImage(),
	},
	{
		title: generateLorem(1),
		description: generateLorem(),
		image: randomImage(),
	},
	{
		title: generateLorem(1),
		description: generateLorem(),
		image: randomImage(),
	},
	{
		title: generateLorem(1),
		description: generateLorem(),
		image: randomImage(),
	},
	{
		title: generateLorem(1),
		description: generateLorem(),
		image: randomImage(),
	},
	{
		title: generateLorem(1),
		description: generateLorem(),
		image: randomImage(),
	},
	{
		title: generateLorem(1),
		description: generateLorem(),
		image: randomImage(),
	},
	{
		title: generateLorem(1),
		description: generateLorem(),
		image: randomImage(),
	},
];
export default function PageLanding() {
	return (
		<Box
			sx={{
				width: "100%",

				display: "flex",
				justifyContent: "center",
				flexDirection: "column",
			}}
		>
			<Hero />
			<Grid
				container
				sx={{
					display: "flex",
					justifyContent: "space-between",
					width: "100%",
					marginBottom: 3,
				}}
			>
				{feature.map((feature, index) => {
					return (
						<Grid
							key={index}
							container
							sx={{
								gap: 3,
								marginTop: 3,
								display: "flex",
								flexDirection:
									index % 2 === 0 ? "row" : "row-reverse",
								justifyContent: "space-evenly",
							}}
						>
							<Grid
								item
								xs={12}
								md={5}
								sx={{
									marginY: 3,
									marginX: 1,
								}}
							>
								<TextCard feature={feature} />
							</Grid>
							<Grid
								item
								xs={12}
								md={5}
								sx={{
									marginY: 3,
									marginX: 1,
								}}
							>
								<ImageDescriptor feature={feature} />
							</Grid>
						</Grid>
					);
				})}
			</Grid>
		</Box>
	);
}
