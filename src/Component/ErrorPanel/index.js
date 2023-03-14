import { Box, Card, Typography, Grid } from "@mui/material";
import depthEffect from "../../Theme/sx/depth-effect";
export const ErrorPage = ({
	message,
	Icon,
	IconColor,
	action,
	ActionButton,
}) => {
	return (
		<>
			<Grid
				container
				sx={{
					height: "100%",
					width: "100%",
					display: "flex",
					justifyContent: "center",
					padding: 1,
				}}
			>
				<Grid
					item
					xs={12}
					md={6}
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						textAlign: "center",
					}}
				>
					<ErrorPanel
						message={message}
						Icon={Icon}
						action={action}
						IconColor={IconColor}
						ActionButton={ActionButton}
					/>
				</Grid>
			</Grid>
		</>
	);
};

export default function ErrorPanel({
	message,
	Icon,
	IconColor,
	action,
	ActionButton,
}) {
	return (
		<Card
			sx={{
				padding: 1,
				...depthEffect(),
			}}
		>
			<Box p={2}>
				<Typography
					variant="h4"
					component="h1"
					sx={{
						fontWeight: 600,
						color: "text.primary",
					}}
				>
					{message}
				</Typography>
				<Icon
					sx={{
						fontSize: 75,
						color: IconColor,
						margin: 1,
					}}
				/>
				<Typography
					variant="body1"
					component="p"
					sx={{
						fontWeight: 600,
						marginBottom: 2,
						color: "text.primary",
					}}
				>
					{action}
				</Typography>
				{ActionButton}
			</Box>
		</Card>
	);
}
