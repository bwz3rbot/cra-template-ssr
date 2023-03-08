import { Grid, Typography, Avatar, Box } from "@mui/material";
export default function NotificationSnackbar({
	notification: { title, body, image, type },
}) {
	return (
		<>
			<Grid
				container
				sx={{
					display: "flex",
					flexDirection: "row",
				}}
			>
				<Box
					sx={{
						border: 1,
						width: "fit-content",
					}}
				>
					<Avatar
						variant="square"
						src={image}
						sx={{
							width: 100,
							height: 100,
						}}
					>
						{type}
					</Avatar>
				</Box>

				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",

						marginLeft: 2,
					}}
				>
					<Grid item>
						<Typography variant="h6">{title}</Typography>
					</Grid>
					<Grid item>
						<Typography variant="body1">{body}</Typography>
					</Grid>
				</Box>
			</Grid>
		</>
	);
}
