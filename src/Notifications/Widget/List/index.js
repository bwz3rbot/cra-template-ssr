import { Fragment, useState } from "react";
import { Link } from "react-router-dom";

import { Typography, Grid, IconButton, Avatar } from "@mui/material";

import Menu, { Divider, ListItemIcon, MenuItem } from "../../../Component/Menu";

import { calculateDateSinceTimestamp } from "../../../util/calculateDateSinceTimestamp";
import ElipsesIcon from "@mui/icons-material/MoreVert";
import SettingsIcon from "@mui/icons-material/Settings";
import HideIcon from "@mui/icons-material/VisibilityOff";

import { useNotifications } from "../../../Notifications";
const PREVIEW_IMAGE_DIMENSIONS = {
	width: 100,
	height: 50,
};

export default function NotificationsMenu({ anchorEl, onClose = () => {} }) {
	const { notifications, hideNotification, acknowledgeNotification } =
		useNotifications();
	const [contextMenuState, setContextMenuState] = useState({
		anchorEl: null,
		notification: null,
	});

	return (
		<>
			<Menu
				anchorEl={contextMenuState.anchorEl}
				onClose={e => {
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
						minWidth: "500px",
						maxWidth: "100%",
						backgroundColor: "transparent",
					}}
					onClick={() => {
						hideNotification(contextMenuState.notification.id);
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
			<Menu anchorEl={anchorEl} onClose={onClose}>
				<MenuItem
					dense
					disableRipple
					selected={false}
					style={{
						minWidth: "450px",
						maxWidth: "100%",
						backgroundColor: "transparent",
					}}
				>
					<ListItemIcon
						sx={{
							flexGrow: 1,
						}}
					>
						<Typography
							sx={{
								fontWeight: "bold",
								color: "text.primary",
							}}
						>
							Notifications
						</Typography>
					</ListItemIcon>
					<IconButton component={Link} to="/settings/notifications">
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
					{notifications.length === 0 && (
						<>
							<MenuItem disableRipple>
								<Grid
									container
									sx={{
										flexDirection: "column",
										justifyContent: "center",
										paddingRight: "1rem",
										flexGrow: 1,
									}}
								>
									<Typography>
										You're all caught up!
									</Typography>
								</Grid>
							</MenuItem>
						</>
					)}
					{notifications.map(notification => {
						const {
							id,
							subject,
							body,
							type,

							src = `https://picsum.photos/seed/${id}/${PREVIEW_IMAGE_DIMENSIONS.width}/${PREVIEW_IMAGE_DIMENSIONS.height}`,
							created_at,
							acknowledged_at,
						} = notification;
						return (
							<Fragment key={id}>
								<MenuItem
									disableRipple
									onClick={e => {
										acknowledgeNotification(id);
									}}
								>
									<div
										style={{
											position: "relative",
											display: "flex",
											justifyContent: "center",
											alignItems: "center",
											width: "fit-content",
										}}
									>
										{!acknowledged_at && (
											<Typography
												sx={{
													color: "info.main",
													fontSize: "1.5rem",
													position: "absolute",
													// in the middle left

													left: "-40%",
												}}
											>
												•
											</Typography>
										)}
										<ListItemIcon>
											<Avatar
												sx={{
													backgroundColor: `${type.toLowerCase()}.main`, // "error.main", "success.main", "info.main", "warning.main", "primary.main", "secondary.main"
												}}
											>
												!
											</Avatar>
										</ListItemIcon>
									</div>
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
												maxWidth: "300px",
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
												created_at
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
												maxWidth: `${PREVIEW_IMAGE_DIMENSIONS.width}px`,
												height: `${PREVIEW_IMAGE_DIMENSIONS.height}px`,
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
