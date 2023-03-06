import { Uploady } from "@rpldy/uploady";
import UploadButton from "@rpldy/upload-button";
import { useSnackbar } from "notistack";
import { createContext, useState, useContext, forwardRef, useRef } from "react";

import RequestPresend from "./HookProvider";
import "./styles.css";
const Context = createContext({
	uploadAssetType: () => {},
});

const UploadyTypeButton = forwardRef(
	({ accept, type, fileFilter = () => true }, ref) => {
		return (
			<Uploady
				accept={accept}
				concurrent={false}
				destination={{}}
				maxConcurrent={10}
				multiple={true}
				// enhancer={retryEnhancer} // TODO: add retry enhancer
				debug={false}
				fileFilter={fileFilter}
			>
				<RequestPresend assetType={type} />
				<UploadButton
					className="upload-btn"
					assetType={type.type}
					ref={ref}
				/>
			</Uploady>
		);
	}
);

export const useUploadType = () => useContext(Context);

export default function UploadyContextProvider({ children }) {
	const { enqueueSnackbar } = useSnackbar();
	const ASSET_TYPES = [
		{
			type: "IMAGE",
			ref: useRef(),
			accept: "image/*",
		},
		{
			type: "VIDEO",
			ref: useRef(),
			accept: "video/*",
		},
		{
			type: "AUDIO",
			ref: useRef(),
			accept: "audio/*",
		},
		{
			type: "DOCUMENT",
			ref: useRef(),
			accept: "application/*",
			fileFilter: file => {
				enqueueSnackbar(`Not implemented`, {
					variant: "error",
				});
				return false;
			},
		},
		{
			type: "AVATAR",
			ref: useRef(),
			accept: "image/*",
		},
	];

	return (
		<Context.Provider
			value={{
				uploadAssetType: type => {
					if (
						!type ||
						!ASSET_TYPES.find(assetType => assetType.type === type)
					) {
						return console.log("Invalid asset type");
					}
					const { ref } = ASSET_TYPES.find(
						assetType => assetType.type === type
					);
					ref.current?.click();
				},
			}}
		>
			{ASSET_TYPES.map(({ accept, ref, type, fileFilter }, i) => (
				<UploadyTypeButton
					key={`uploady-virtual-btn-${i}`}
					accept={accept}
					type={type}
					ref={ref}
					fileFilter={fileFilter}
				/>
			))}
			{children}
		</Context.Provider>
	);
}
