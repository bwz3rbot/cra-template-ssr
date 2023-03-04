import { gql } from "@apollo/client";
export const notifications = gql`
	subscription Notifications {
		notifications {
			body
			createdAt
			id
			acknowledgedAt
			subject
			type
		}
	}
`;
