import {
	Box,
	List,
	ListItem,
	ListItemText,
	ListItemButton,
	ListItemIcon,
	Divider,
	Drawer,
} from "@mui/material";
import { Link } from "react-router-dom";
import { LinkSection, getAllowedLinks } from "../Links";
import { useAuth0 } from "@auth0/auth0-react";
export const NavDrawer = ({ onClose: toggleDrawer, open }) => {
	const { user } = useAuth0();

	return (
		<Drawer anchor="top" open={open} onClose={toggleDrawer}>
			<Box
				sx={{
					// Margin must remain because the NavDrawer zIndex is behind the AppBar
					// (only way to position a mui drawer behind an AppBar :shrug:)
					marginTop: "var(--nav-height)",
				}}
				// role="navigation"
			>
				<List>
					<>
						{getAllowedLinks({
							isTopNav: false,
							user,
						}).map(({ name, links }, i) => (
							<Box key={name}>
								<ListItem disablePadding>
									<ListItemText
										style={{
											fontWeight: "bold",
											paddingLeft: "4px",
										}}
										primary={name}
									/>
								</ListItem>
								{links.map(({ to, text, Icon }, index) => (
									<ListItem key={index} disablePadding>
										<ListItemButton
											component={Link}
											to={to}
											target={
												to.startsWith("http")
													? "_blank"
													: "_self"
											}
										>
											<ListItemIcon>
												<Icon />
											</ListItemIcon>
											<ListItemText primary={text} />
										</ListItemButton>
									</ListItem>
								))}
								{
									// only add a divider if there is another section
									i < LinkSection.length - 1 && <Divider />
								}
							</Box>
						))}
					</>
				</List>
			</Box>
		</Drawer>
	);
};
