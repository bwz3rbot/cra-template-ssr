import React, { createContext, useContext } from "react";
import { useLocation } from "react-router-dom";
export const SSRContext = createContext({
	hostname: "",
	pathname: "",
	port: "",
	protocol: "",
});

/*

	This Context is implemented on the server side.
	If the app is being rendered in the server, there will be no react-router-dom
	context available to call useLocation from.
 
*/
export const SSRLocationContext = ({
	children,
	hostname,
	pathname,
	port,
	protocol,
}) => {
	return (
		<SSRContext.Provider
			value={{
				hostname,
				pathname,
				port,
				protocol,
			}}
		>
			{children}
		</SSRContext.Provider>
	);
};

const useSSRContext = () => useContext(SSRContext);
export const useDynamicLocation = () => {
	const reactRouterDomLocation = useLocation();
	const ssrLocation = useSSRContext();
	if (ssrLocation.hostname) {
		// if the app is being rendered in the server, use the ssrLocation
		return ssrLocation;
	} else {
		// if the app is being rendered in the client, use the reactRouterDomLocation
		return reactRouterDomLocation;
	}
};
