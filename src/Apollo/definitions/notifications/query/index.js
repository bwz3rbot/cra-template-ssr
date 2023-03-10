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
export const config = gql`
	query NotificationConfig {
		notification_config {
			enable_in_app
			enable_push
			enable_sms
			enable_email
		}
	}
`;
