import { gql } from "@apollo/client";
export const GET_MEDIA = gql`
	query GetMedia {
		media {
			id
			name
			type
			url
			createdAt
		}
	}
`;
