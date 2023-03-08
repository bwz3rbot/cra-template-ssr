import { gql } from "@apollo/client";
export const getUser = gql`
	query GetUser {
		user {
			id
			name
			email
			avatar
			workspace {
				id
				name
				avatar
				owner {
					id
					name
					email
					avatar
				}
				members {
					id
					name
					avatar
					email
				}
				admin {
					id
					name
					avatar
					email
				}
			}
		}
	}
`;
