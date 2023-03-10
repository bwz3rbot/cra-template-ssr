import { gql } from "@apollo/client";
export const acknowledge = gql`
	mutation NotificationAcknowledge($input: NotificationAcknowledgeInput!) {
		notification_acknowledge(input: $input) {
			notification {
				acknowledged_at
				body
				created_at
				id
				subject
				type
				hidden
			}
		}
	}
`;
export const hide = gql`
	mutation NotificationHide($input: NotificationHideInput!) {
		notification_hide(input: $input) {
			notification {
				acknowledged_at
				body
				created_at
				id
				subject
				type
				hidden
			}
		}
	}
`;
export const config = gql`
	mutation NotificationConfig($input: NotificationConfigInput!) {
		notification_config(input: $input) {
			config {
				enable_email
				enable_in_app
				enable_push
				enable_sms
			}
		}
	}
`;
