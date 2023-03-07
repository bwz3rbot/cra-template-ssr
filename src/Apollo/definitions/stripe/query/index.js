import { gql } from "@apollo/client";

export const listSubscriptionPlans = gql`
	query ListSubscriptionPlans {
		stripe_listSubscriptionsPlans {
			amount
			currency
			id
			interval
			nickname
		}
	}
`;
