import {
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Typography,
} from "@mui/material";
import { useMemo } from "react";
import { useRequester } from "../../../Apollo";
import { useSnackbar } from "notistack";

const parseAmountToDollars = ({ amount, currency }) => {
	return (amount / 100).toLocaleString(
		navigator.language || navigator.userLanguage,
		{
			style: "currency",
			currency: currency.toUpperCase(),
		}
	);
};

const IMG_HEIGHT = 140;
const IMG_WIDTH = 345;
const randomImage = () => {
	const random = Math.floor(Math.random() * 100);
	return `https://source.unsplash.com/random/${IMG_WIDTH}x${IMG_HEIGHT}?sig=${random}`;
};
export default function SubscriptionTierCard({
	plan: { amount, currency, id, interval, nickname },
}) {
	const { enqueueSnackbar } = useSnackbar();
	const { definitions, useMutation } = useRequester();
	const [createCheckoutSession] = useMutation(
		definitions.stripe.mutation.createCheckoutSession,
		{
			onError: error => {
				enqueueSnackbar(error.message, { variant: "error" });
			},
		}
	);

	const image = useMemo(randomImage, []);
	return (
		<Card
			sx={{
				height: IMG_HEIGHT * 2,
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
			}}
		>
			<CardMedia
				component="img"
				width={IMG_WIDTH}
				height={IMG_HEIGHT}
				image={image}
				alt="random image"
			/>
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{nickname}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					{parseAmountToDollars({
						amount,
						currency,
					})}
					{interval}
				</Typography>
			</CardContent>
			<CardActionArea
				sx={{
					textAlign: "center",
				}}
				onClick={() => {
					createCheckoutSession({
						variables: {
							input: {
								price_id: id,
							},
						},
						onError: error => {
							enqueueSnackbar(error.message, {
								variant: "error",
								autoHideDuration: 3000,
							});
						},
						onCompleted: ({ stripe_createCheckoutSession }) => {
							const goToURL = stripe_createCheckoutSession.url;
							window.open(goToURL, "_blank");
						},
					});
				}}
			>
				<CardContent>
					<Typography variant="button" color="text.secondary">
						Subscribe to plan
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}
