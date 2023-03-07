import { useRequester } from "../../../../Apollo";
import SubscriptionTierCard from "../../../../Component/SubscriptionTier/Card";
import FeaturesList from "../../../../Component/SubscriptionTier/Features";
import { Grid } from "@mui/material";

export default function BillingPage() {
	const { definitions, useQuery } = useRequester();

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
				flexDirection: "column",
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
							xs={5}
							md={3}
							sx={{
								display: "flex",
								justifyContent: "center",
								margin: "2px",
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
					maxWidth: "700px",
					alignSelf: "center",
				}}
			>
				<Grid item xs={12} md={10}>
					<FeaturesList />
				</Grid>
			</Grid>
		</Grid>
	);
}
