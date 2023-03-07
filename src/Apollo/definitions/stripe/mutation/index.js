import { gql } from "@apollo/client";

export const createCheckoutSession = gql`
	mutation CreateCheckoutSession($input: CreateCheckoutSessionInput!) {
		stripe_createCheckoutSession(input: $input) {
			id
			url
			plan {
				amount
				currency
				id
				interval
				nickname
			}
		}
	}
`;
