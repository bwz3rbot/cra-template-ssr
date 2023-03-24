import { useRequester } from "../../../../Apollo";
import SubscriptionTierCard from "../../../../Component/SubscriptionTier/Card";
import FeaturesList from "../../../../Component/SubscriptionTier/Features";
import { useSnackbar } from "notistack";
import { Grid, useMediaQuery } from "@mui/material";

export default function SubscribePage() {
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const md = useMediaQuery(theme => theme.breakpoints.up("md"));
	const { definitions, useQuery } = useRequester();

	const { data } = useQuery(definitions.stripe.query.listSubscriptionPlans, {
		onError: error => {
			enqueueSnackbar("Error fetching subscription plans", {
				variant: "error",
				autoHideDuration: 5000,

				onClick: () => {
					closeSnackbar();
				},
			});
		},
	});

	return (
		<Grid
			container
			sx={{
				display: "flex",
				flexDirection: "column",
				overflowX: "hidden",
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
				{Array.from(data?.stripe_listSubscriptionsPlans || [])
					.sort((a, b) => a.amount - b.amount)
					.map((plan, i) => {
						return (
							<Grid
								key={i}
								item
								xs={6}
								md={3}
								sx={{
									display: "flex",
									justifyContent: "center",
									margin: md ? "4px" : "0px",
									marginY: 2,
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
