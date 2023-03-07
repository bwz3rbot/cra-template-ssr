import { useParams } from "react-router-dom";
import { Grid, Typography, Tabs, Tab } from "@mui/material";
import { Link } from "react-router-dom";

import AccountTab from "./Tab/Account";
import ProfileTab from "./Tab/Profile";
import NotificationsTab from "./Tab/Notifications";
import PrivacyTab from "./Tab/Privacy";
const tabs = ["account", "profile", "notifications", "privacy"];

const getTabValue = (tabs, params) => {
	let tabValue = tabs.findIndex(tab => {
		return tab.toLowerCase() === params?.tab?.toLowerCase();
	});
	if (tabValue === -1) tabValue = 0;
	return tabValue;
};
export default function PageSettings() {
	const params = useParams();

	const tabValue = getTabValue(tabs, params);
	return (
		<Grid>
			<Typography variant="h5">Settings Page</Typography>
			<Tabs variant="scrollable" value={tabValue}>
				{tabs.map((tab, i) => {
					return (
						<Tab
							key={i}
							label={tab}
							component={Link}
							to={`/settings/${tab.toLowerCase()}`}
							value={i}
						/>
					);
				})}
			</Tabs>
			{
				{
					account: <AccountTab />,
					profile: <ProfileTab />,
					notifications: <NotificationsTab />,
					privacy: <PrivacyTab />,
				}[params?.tab?.toLowerCase() || "account"]
			}
		</Grid>
	);
}
