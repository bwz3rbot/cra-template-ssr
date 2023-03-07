import { useRequester } from "../../../../Apollo";
import SubscriptionTierCard from "../../../../Component/SubscriptionTier/Card";
import FeaturesList from "../../../../Component/SubscriptionTier/Features";
import { Grid, Typography, useMediaQuery } from "@mui/material";

export default function BillingPage() {
	const { definitions, useQuery } = useRequester();
	const md = useMediaQuery(theme => theme.breakpoints.up("md"));
	// breakpoint at 600px
	const xs = useMediaQuery(theme => theme.breakpoints.up("xs"));
	console.log({
		md,
		xs,
	});
	const { data } = useQuery(definitions.stripe.query.listSubscriptionPlans, {
		onError: error => {
			console.log(error);
		},
	});

	return (
		<Grid
			container
			sx={{
				// padding: 2,
				display: "flex",
				flexDirection: "row",
				overflowX: "hidden",
				marginY: 6,
			}}
		>
			<Grid
				item
				xs={12}
				md={12}
				sx={{
					display: "flex",
					justifyContent: "center",
					flexWrap: "wrap",
				}}
			>
				{data?.stripe_listSubscriptionsPlans?.map((plan, i) => {
					return (
						<Grid
							key={i}
							item
							xs={4}
							md={3}
							sx={{
								display: "flex",
								justifyContent: "center",
								margin: md ? 2 : 1,
							}}
						>
							<SubscriptionTierCard key={i} plan={plan} />
						</Grid>
					);
				})}
			</Grid>

			<Grid
				container
				sx={{
					display: "flex",
					justifyContent: "center",
					marginY: 6,
				}}
			>
				<Grid item xs={12} md={10}>
					<FeaturesList />
				</Grid>
			</Grid>
		</Grid>
	);
}
