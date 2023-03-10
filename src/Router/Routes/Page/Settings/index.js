import { useParams } from "react-router-dom";
import { Grid, Typography, Tabs, Tab } from "@mui/material";
import { Link } from "react-router-dom";

import AccountTab from "./Tab/Account";
import WorkspaceTab from "./Tab/Workspace";
import NotificationsTab from "./Tab/Notifications";
import PrivacyTab from "./Tab/Privacy";
import SubscriptionTab from "./Tab/Subscription";
const tabs = [
	"account",
	"workspace",
	"notifications",
	"privacy",
	"subscription",
];

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
		<Grid
			sx={{
				height: "var(--body-height)",
				overflow: "hidden",
			}}
		>
			<Grid>
				<Typography variant="h5">Settings Page</Typography>
				<Tabs
					sx={{
						// selected tab text color
						paddingBottom: 1,
						"& .MuiTabs-indicator": {
							backgroundColor: "divider",
						},
					}}
					variant="scrollable"
					value={tabValue}
				>
					{tabs.map((tab, i) => {
						return (
							<Tab
								key={i}
								label={tab}
								component={Link}
								to={`/settings/${tab.toLowerCase()}`}
								value={i}
								sx={{
									height: "100%",
									overflowY: "sroll",
								}}
							/>
						);
					})}
				</Tabs>
			</Grid>
			<Grid
				sx={{
					height: `var(--body-height)`,
					paddingX: 2,
				}}
			>
				{
					{
						account: <AccountTab />,
						workspace: <WorkspaceTab />,
						notifications: <NotificationsTab />,
						privacy: <PrivacyTab />,
						subscription: <SubscriptionTab />,
					}[params?.tab?.toLowerCase() || "account"]
				}
			</Grid>
		</Grid>
	);
}
