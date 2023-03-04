import { gql } from "@apollo/client";
export const uploadFile = gql`
	mutation UploadFile($input: FileUploadInput!) {
		upload(input: $input) {
			file {
				created_at
				updated_at
				id
				name
				size
				type
				extension
				path
			}
			presignedURL {
				url
				method
				path
				fields {
					bucket
					Content_Type
					key
					Policy
					X_Amz_Algorithm
					X_Amz_Credential
					X_Amz_Date
					X_Amz_Signature
				}
			}
		}
	}
`;
