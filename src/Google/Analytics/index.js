import { useIsSSR } from "react-aria";
import { useEffect, useState, createContext, useContext } from "react";
const Context = createContext({
	sendEvent: ({ category, action, label }) => {},
});

export const useAnalytics = () => useContext(Context);

export default function AnalyticsContextProvider({ children }) {
	const [ReactGA, setReactGA] = useState({
		event: () => {},
	});
	const isSSR = useIsSSR();

	useEffect(() => {
		if (isSSR) return;
		const ga = require("react-ga4").default;
		ga.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_MEASUREMENT_ID);
		require("../TagManager/Init");
		setReactGA(ga);
	}, [isSSR]);
	return (
		<Context.Provider
			value={{
				sendEvent: ({ category, action, label }) => {
					console.log("sending event", {
						category,
						action,
						label,
					});
					return ReactGA.event({
						category,
						action,
						label,
					});
				},
			}}
		>
			{children}
		</Context.Provider>
	);
}
