import { gql } from "@apollo/client";
export const getUser = gql`
	query GetUser {
		user {
			id
			name
			email
			avatar
		}
	}
`;
