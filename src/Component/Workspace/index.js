import {
	Avatar,
	Card,
	CardContent,
	CardHeader,
	Divider,
	Grid,
	Typography,
} from "@mui/material";

import depthEffect from "../../Theme/sx/depth-effect";

import { calculateDateSinceTimestamp } from "../../util/calculateDateSinceTimestamp";

export default function Workspace({ workspace }) {
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
						<Typography color="textSecondary" variant="body1">
							Created:{" "}
							{calculateDateSinceTimestamp(workspace?.createdAt)}
						</Typography>
					}
				/>
			</Card>
		</>
	);
}
