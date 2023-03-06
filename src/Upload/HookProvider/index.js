import { useRequester } from "../../Apollo";
import { useRequestPreSend } from "@rpldy/uploady";
export default function RequestPresend({ assetType }) {
	const { definitions, useMutation } = useRequester();
	const [createUpload] = useMutation(definitions.file.mutation.uploadFile);
	useRequestPreSend(async ({ items }, { options }) => {
		const upload = await new Promise((resolve, reject) => {
			const item = items[0];
			const file = item?.file;
			createUpload({
				variables: {
					input: {
						assetType,
						file: {
							name: file.name,
							size: file.size,
							type: file.type,
							extension: file.extension,
						},
					},
				},
				onCompleted: response => {
					response.upload.parameters = Object.entries(
						response.upload.presignedURL.fields
					).reduce((prev, [k, v]) => {
						if (k === "__typename") return prev;
						prev[k.replace(/_/g, "-")] = v;
						return prev;
					}, {});
					resolve(response.upload);
				},
				onError: error => {
					reject(error);
				},
			});
		});
		return {
			options: {
				sendWithFormData: true,
				params: upload.parameters,
				destination: {
					url: upload.presignedURL.url,
					method: upload.presignedURL.method,
				},
			},
		};
	});
	return <></>;
}
