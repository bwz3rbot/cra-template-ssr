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
