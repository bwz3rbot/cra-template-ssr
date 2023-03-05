import { Uploady } from "@rpldy/uploady";
import { createContext, useState, useContext } from "react";

import { useRequestPreSend } from "@rpldy/uploady";
import { useRequester } from "../Apollo";

import { HookProvider } from "./HookProvider";

const Context = createContext({
	accept: "image/*",
	setAccept: () => {},
});
const acceptableValues = ["image/*", "video/*"];
export default function UploadyContextProvider({ children }) {
	const [accept, setAccept] = useState("image/*");
	return (
		<Context.Provider
			value={{
				accept,
				setAccept: value => {
					if (acceptableValues.includes(value)) {
						setAccept(value);
					}
				},
			}}
		>
			<Uploady
				accept={accept}
				concurrent={false}
				destination={{}}
				maxConcurrent={1}
				multiple={true}
				debug={false}
				fileFilter={file => true}
				// enhancer={retryEnhancer}
			>
				<HookProvider>{children}</HookProvider>
			</Uploady>
		</Context.Provider>
	);
}
