import {
	Avatar,
	Card,
	CardHeader,
	Typography,
	Divider,
	CardActions,
	Grid,
	IconButton,
} from "@mui/material";

import depthEffect from "../../Theme/sx/depth-effect";

import { calculateDateSinceTimestamp } from "../../util/calculateDateSinceTimestamp";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";

import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
export default function Workspace({ workspace }) {
	const Actions = [
		{
			label: "Assign Role",
			onClick: () => {},
			Icon: AssignmentIndOutlinedIcon,
		},
		{
			label: "Remove",
			onClick: () => {},
			Icon: PersonRemoveIcon,
		},
	];
	return (
		<>
			<Card
				sx={{
					...depthEffect(),
					maxWidth: 500,

					height: "fit-content",
				}}
			>
				<CardHeader
					avatar={
						<Avatar
							alt="User"
							src={workspace?.avatar}
							sx={{
								height: 100,
								width: 100,
							}}
						/>
					}
					title={
						<>
							workspace
							<Typography
								color="textPrimary"
								gutterBottom
								variant="h6"
							>
								{workspace?.name}
							</Typography>
						</>
					}
					subheader={
						<>
							<Typography color="textSecondary" variant="body1">
								Created:{" "}
								{calculateDateSinceTimestamp(
									workspace?.createdAt
								)}
							</Typography>
							<Typography color="textSecondary" variant="body1">
								{workspace?.members.length} member
								{workspace?.members.length > 1 ? "s" : ""}
							</Typography>

							<Divider />
							<CardActions
								sx={{
									display: "flex",
									justifyContent: "space-evenly",
								}}
							>
								{Actions.map(({ label, onClick, Icon }, i) => {
									return (
										<Grid
											key={i}
											sx={{
												display: "flex",
												alignItems: "center",
												flexDirection: "column",
											}}
										>
											<IconButton
												onClick={onClick}
												key={i}
											>
												<Icon />
											</IconButton>
											<Typography>{label}</Typography>
										</Grid>
									);
								})}
							</CardActions>
						</>
					}
				/>
			</Card>
		</>
	);
}
