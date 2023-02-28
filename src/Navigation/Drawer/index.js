import {
	Box,
	List,
	ListItem,
	ListItemText,
	ListItemButton,
	ListItemIcon,
	Divider,
} from "@mui/material";
import { Link } from "react-router-dom";
import { LinkSection } from "../Links";
export const NavDrawer = ({ onClose: toggleDrawer }) => (
	<Box
		sx={{
			// Margin must remain because the NavDrawer zIndex is behind the AppBar
			// (only way to position a mui drawer behind an AppBar :shrug:)
			marginTop: "var(--nav-height)",
		}}
		role="navigation"
		onClick={toggleDrawer}
		onKeyDown={toggleDrawer}
	>
		<List>
			{LinkSection.filter(section => section.showInTopNav).map(
				({ name, links }, i) => (
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
				)
			)}
		</List>
	</Box>
);
