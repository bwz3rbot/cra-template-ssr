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

export const getMySubscription = gql`
	query {
		stripe_getMySubscription {
			id
			plan_begin
			plan_end
			plan {
				id
				nickname
				amount
				interval
				currency
			}
		}
	}
`;
