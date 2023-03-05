import { gql } from "@apollo/client";
export const notifications = gql`
	subscription Notifications {
		notifications {
			body
			created_at
			id
			acknowledged_at
			subject
			type
			hidden
		}
	}
`;
