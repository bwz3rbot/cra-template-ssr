import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import NotificationsWidget from "./NotificationsWidget";

import {
	Box,
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	Button,
	Drawer,
	useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import { LinkSection } from "./Links";
import { NavDrawer } from "./Drawer";

import WideLogo from "../Logo/wide.png";
import RoundLogo from "../Logo/round.png";
import AccountWidget from "./AccountWidget";

export { Footer } from "./Footer";

export const NavigationBar = () => {
	const isMedium = useMediaQuery(theme => theme.breakpoints.up("md"));
	const [open, setOpen] = useState(false);
	const toggleDrawer = () => setOpen(open => !open);
	const location = useLocation();

	useEffect(() => {
		if (isMedium && open) setOpen(false);
	}, [isMedium]);

	useEffect(() => {
		if (open) setOpen(false);
	}, [location]);

	const iconDimensions = `calc(var(--nav-height) - 8px)`;

	return (
		<nav
			role="navigation"
			/* must remain id=navigation for app to set --nav-height css property */
			id="navigation"
			style={{
				position: "relative",
				// https://github.com/mui/material-ui/issues/11749
				/* The default zIndex provided to Drawer component is 1200, you can over ride it like that. ☝️ */
				zIndex: 1301,
				/* must remain height=fit-content so --nav-height may be set to the height of the Toolbar component */
				height: "fit-content",
			}}
		>
			<Box
				sx={{
					overflow: "hidden",
				}}
			>
				<AppBar
					position="sticky"
					sx={{
						backgroundColor: "primary.main",
					}}
				>
					<Toolbar variant="dense">
						{!isMedium ? (
							<>
								<div
									style={{
										// width: iconDimensions,
										height: iconDimensions,
										display: isMedium ? "none" : "block",
										marginRight: isMedium ? "8px" : "0px",
									}}
								>
									<Link to="/">
										<img
											src={RoundLogo}
											alt={
												process.env.REACT_APP_SITE_NAME
											}
											style={{
												width: "100%",
												height: "100%",
											}}
										/>
									</Link>
								</div>
								<IconButton
									size="small"
									edge="start"
									color="inherit"
									aria-label="menu"
									sx={{
										marginLeft: 1,
										display: "block",
									}}
									onClick={toggleDrawer}
								>
									<MenuIcon />
								</IconButton>
								<Typography>MENU</Typography>
							</>
						) : (
							<div
								style={{
									height: iconDimensions,
									display: isMedium ? "block" : "none",
									marginRight: isMedium ? "8px" : "0px",
								}}
							>
								<Link to="/">
									<img
										src={WideLogo}
										alt={process.env.REACT_APP_SITE_NAME}
										style={{
											width: "100%",
											height: "100%",
										}}
									/>
								</Link>
							</div>
						)}
						<div
							style={{
								display: "flex",
								/* with flexGrow:1 - Elements outside of this div will be forced to flex-end */
								flexGrow: 1,
								alignItems: "center",
							}}
						>
							{isMedium &&
								LinkSection.map(({ name, links }, i) => {
									return (
										<Box key={i}>
											{links.map(
												({ to, text, Icon }, index) => {
													return (
														<Button
															key={index}
															color="inherit"
															component={Link}
															to={to}
														>
															{text}
														</Button>
													);
												}
											)}
										</Box>
									);
								})}
						</div>
						<NotificationsWidget />
						<AccountWidget />
					</Toolbar>
				</AppBar>
			</Box>
			<Drawer anchor="top" open={open} onClose={toggleDrawer}>
				<NavDrawer onClose={toggleDrawer} />
			</Drawer>
		</nav>
	);
};
