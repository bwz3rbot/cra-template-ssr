import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

import {
	Box,
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	Button,
	useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import { getAllowedLinks } from "./Links";
import { NavDrawer } from "./Drawer";

import AccountWidget from "./AccountWidget";

import { NotificationsWidget } from "../Notifications";

import { useAuthContext } from "../Auth";
import depthEffect from "../Theme/sx/depth-effect";
export { Footer } from "./Footer";
const WideLogo = "/logo/wide-56x112.png";
const RoundLogo = "/logo/round-56x56.png";

export const NavigationBar = () => {
	const { user } = useAuthContext();
	const isMedium = useMediaQuery(theme => theme.breakpoints.up("md"));
	const [open, setOpen] = useState(false);
	const toggleDrawer = () => {
		setOpen(open => !open);
	};
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
				maxHeight: "var(--nav-height)",
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
						...depthEffect(),
						borderWidth: "0px 0px 1px 0px",
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
												height: `calc(var(--nav-height) - 8px)`,
												maxHeight: `var(--nav-height)`,
												width: "auto",
												margin: "auto",
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
									maxWidth: `calc(var(--nav-height) * 2)`,
									maxHeight: `var(--nav-height)`,
									height: "auto",
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
								getAllowedLinks({
									isTopNav: true,
									user,
								}).map(({ name, links }, i) => {
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
															target={
																to.startsWith(
																	"http"
																)
																	? "_blank"
																	: "_self"
															}
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
						{!user?.isAnonymous && <NotificationsWidget />}
						<AccountWidget />
					</Toolbar>
				</AppBar>
			</Box>
			<NavDrawer onClose={toggleDrawer} open={open} />
		</nav>
	);
};
