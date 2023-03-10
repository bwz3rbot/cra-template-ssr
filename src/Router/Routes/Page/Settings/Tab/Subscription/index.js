import { useRequester } from "../../../../../../Apollo";
import SubscriptionTier from "../../../../../../Component/SubscriptionTier/Card";
import { Grid, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
export default function SettingsPageSubscriptionTab() {
	const { definitions, useQuery } = useRequester();
	const { data } = useQuery(definitions.stripe.query.getMySubscription);

	const plan = data?.stripe_getMySubscription?.plan;

	return (
		<>
			<Grid
				container
				sx={{
					width: "100%",
					display: "flex",
					marginTop: 2,
				}}
			>
				<Grid item xs={12} md={4} lg={3}>
					{plan ? (
						<SubscriptionTier plan={plan} isSubscribed />
					) : (
						<>
							<SubscriptionTier
								plan={{
									id: 0,
									nickname: "Free",
									amount: 0,
									interval: "month",
									currency: "usd",
								}}
								isSubscribed
							/>
						</>
					)}
				</Grid>
				<Grid
					item
					xs={12}
					sx={{
						marginTop: 2,
					}}
				>
					<Link to={"/subscribe"}>
						<Typography variant="body1">
							View other plans
						</Typography>
					</Link>
				</Grid>
			</Grid>
		</>
	);
}
