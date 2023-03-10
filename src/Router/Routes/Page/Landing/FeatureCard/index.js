import { Card, Typography, Box } from "@mui/material";
import depthEffect from "../../../../../Theme/sx/depth-effect";
export const TextCard = ({ feature: { title, description, image } }) => {
	return (
		<Card
			sx={{
				...depthEffect(),
				padding: 3,
				maxWidth: "100%",
				height: "250px",
			}}
		>
			<Typography
				sx={{
					fontWeight: "bold",
					fontSize: "1.5rem",
					marginBlock: 2,
				}}
			>
				{title}
			</Typography>
			<Typography
				sx={{
					fontSize: "1rem",
				}}
			>
				{description}
			</Typography>
		</Card>
	);
};
export const ImageDescriptor = ({ feature }) => {
	return (
		<Card
			sx={{
				...depthEffect(),
				padding: 3,
				maxWidth: "100%", //dont stretch image
				objectFit: "cover",
				height: "250px",
			}}
		>
			<Box
				component="img"
				src={feature.image}
				alt={feature.title}
				sx={{
					width: "100%",
					height: "100%",
					objectFit: "cover",
				}}
			/>
		</Card>
	);
};
