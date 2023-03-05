import { gql } from "@apollo/client";
export const notifications = gql`
	query GetNotifications {
		notifications {
			body
			createdAt
			id
			acknowledgedAt
			subject
			type
			hidden
		}
	}
`;
