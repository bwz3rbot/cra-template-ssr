import {
	Avatar,
	Card,
	Grid,
	CardHeader,
	CardActions,
	Divider,
	IconButton,
	Typography,
} from "@mui/material";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import LocalPoliceOutlinedIcon from "@mui/icons-material/LocalPoliceOutlined";
import SupervisorAccountOutlinedIcon from "@mui/icons-material/SupervisorAccountOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import depthEffect from "../../Theme/sx/depth-effect";

const RoleIcon = {
	administrator: (
		<LocalPoliceOutlinedIcon
			sx={{
				color: "error.main",
			}}
		/>
	),
	owner: (
		<VerifiedOutlinedIcon
			sx={{
				color: "info.main",
			}}
		/>
	),
	member: (
		<SupervisorAccountOutlinedIcon
			sx={{
				color: "success.main",
			}}
		/>
	),
};

export default function Member({ workspace, user, role }) {
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
	const BottomSection = () => {
		return (
			<>
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
								<IconButton onClick={onClick} key={i}>
									<Icon />
								</IconButton>
								<Typography>{label}</Typography>
							</Grid>
						);
					})}
				</CardActions>
			</>
		);
	};
	return (
		<>
			<Card
				sx={{
					...depthEffect(),
					maxWidth: 500,
					height: "fit-content",
					// wrap text
					overflowWrap: "break-word",
				}}
			>
				<CardHeader
					avatar={
						<Avatar
							alt="User"
							src={user?.avatar}
							sx={{
								height: 100,
								width: 100,
							}}
						>
							{user?.name?.[0]}
						</Avatar>
					}
					title={
						<>
							<Typography color="textSecondary" variant="body1">
								{user?.name}
							</Typography>
						</>
					}
					subheader={
						<>
							<Typography
								color="textPrimary"
								gutterBottom
								variant="h6"
							>
								{RoleIcon[role.name.toLowerCase()]}
								{role.name} of <i>{workspace.name}</i>
							</Typography>
							{role.name !== "Owner" && <BottomSection />}
						</>
					}
				/>
			</Card>
		</>
	);
}
