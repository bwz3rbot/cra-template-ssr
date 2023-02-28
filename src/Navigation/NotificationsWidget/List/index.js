import { Fragment } from "react";
import Avatar from "@mui/material/Avatar";

import { Typography, Grid, IconButton } from "@mui/material";
import ElipsesIcon from "@mui/icons-material/MoreVert";

import SettingsIcon from "@mui/icons-material/Settings";

import HideIcon from "@mui/icons-material/VisibilityOff";

import Menu, { Divider, ListItemIcon, MenuItem } from "../../../Component/Menu";
import { useState } from "react";

const NOTIFICATIONS = [
	{
		id: 1,
		subject: "New user registered",
		body: "John Doe has registered",
		type: "info",
		timestamp: "2021-08-01T12:00:00.000Z",
	},
	{
		id: 2,
		subject: "New user registered",
		body: "John Doe has registered",
		type: "warning",
		timestamp: "2021-08-01T12:00:00.000Z",
	},
	{
		id: 3,
		subject: "New user registered",
		body: "John Doe has registered",
		type: "error",
		timestamp: "2021-08-01T12:00:00.000Z",
	},
	{
		id: 4,
		subject: "Upload successful",
		body: "File uploaded successfully. Click to view. Other stuff goes here. Just testing to make the text really really long.",
		type: "info",
	},
	{
		id: 5,
		subject: "Upload successful",

		body: "File uploaded successfully. Click to view. Other stuff goes here. Just testing to make the text really really long.",
		type: "warning",
	},
	{
		id: 6,
		subject: "Upload successful",
		body: "File uploaded successfully. Click to view. Other stuff goes here. Just testing to make the text really really long.",

		type: "error",
	},
	{
		id: 7,
		subject: "Upload successful",
		body: "File uploaded successfully. Click to view. Other stuff goes here. Just testing to make the text really really long.",
		type: "info",
	},
];

const calculateDateSinceTimestamp = timestamp => {
	const date = new Date(timestamp);
	const now = new Date();
	const diff = now.getTime() - date.getTime();
	const diffDays = Math.floor(diff / (1000 * 3600 * 24));
	const diffHours = Math.floor(diff / (1000 * 3600));

	if (diffDays > 0) {
		return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
	} else if (diffHours > 0) {
		return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
	} else {
		return "just now";
	}
};

export default function NotificationsMenu({ anchorEl, onClose = () => {} }) {
	const [contextMenuState, setContextMenuState] = useState({
		anchorEl: null,
		notification: null,
	});

	const [notifications, setNotifications] = useState(NOTIFICATIONS);

	const ContextMenu = () => {
		return (
			<Menu
				anchorEl={contextMenuState.anchorEl}
				onClose={() => {
					setContextMenuState({
						anchorEl: null,
						notification: null,
					});
				}}
			>
				<MenuItem
					dense
					disableRipple
					selected={false}
					style={{
						minWidth: "300px",
						maxWidth: "100%",
						backgroundColor: "transparent",
					}}
					onClick={() => {
						setNotifications(
							notifications.filter(
								n => n.id !== contextMenuState.notification.id
							)
						);
						setContextMenuState({
							anchorEl: null,
							notification: null,
						});
					}}
				>
					<IconButton>
						<HideIcon />
					</IconButton>
					<ListItemIcon
						sx={{
							flexGrow: 1,
						}}
					>
						<Typography>Hide this notification</Typography>
					</ListItemIcon>
				</MenuItem>
			</Menu>
		);
	};
	return (
		<>
			<ContextMenu />
			<Menu anchorEl={anchorEl} onClose={onClose}>
				<MenuItem
					dense
					disableRipple
					selected={false}
					style={{
						minWidth: "300px",
						maxWidth: "100%",
						backgroundColor: "transparent",
					}}
				>
					<ListItemIcon
						sx={{
							flexGrow: 1,
						}}
					>
						<Typography>Notifications</Typography>
					</ListItemIcon>
					<IconButton>
						<SettingsIcon />
					</IconButton>
				</MenuItem>
				<Divider />
				<div
					style={{
						maxHeight: "60vh",
						overflowY: "auto",
						overflowX: "hidden",
					}}
				>
					{notifications.map(notification => {
						const {
							id,
							subject,
							body,
							type,
							timestamp,
							src = `https://picsum.photos/100/50`,
						} = notification;
						return (
							<Fragment key={id}>
								<MenuItem disableRipple>
									<ListItemIcon>
										<Avatar
											sx={{
												backgroundColor: `${type}.main`,
											}}
										>
											!
										</Avatar>
									</ListItemIcon>
									<Grid
										container
										sx={{
											flexDirection: "column",
											justifyContent: "center",
											paddingRight: "1rem",
											flexGrow: 1,
										}}
									>
										<Typography>{subject}</Typography>

										<div
											style={{
												maxWidth: "400px",
											}}
										>
											<Typography
												sx={{
													fontSize: "0.8rem",
													color: "text.secondary",
													// text overflow y axis ellipsis
												}}
												whiteSpace={"pre-wrap"}
											>
												{body}
											</Typography>
										</div>
										<Typography
											sx={{
												fontSize: "0.75rem",
												color: "text.secondary",
											}}
										>
											{calculateDateSinceTimestamp(
												timestamp
											)}
										</Typography>
									</Grid>
									<Grid
										item
										sx={{
											width: "100px",
										}}
									>
										<img
											src={src}
											alt="random"
											style={{
												maxWidth: "100px",
												height: "50px",
											}}
											referrerPolicy="no-referrer"
										/>
									</Grid>
									<Grid item>
										<IconButton
											onClick={e => {
												setContextMenuState({
													anchorEl: e.currentTarget,
													notification,
												});
											}}
										>
											<ElipsesIcon />
										</IconButton>
									</Grid>
								</MenuItem>
								<Divider />
							</Fragment>
						);
					})}
				</div>
			</Menu>
		</>
	);
}
