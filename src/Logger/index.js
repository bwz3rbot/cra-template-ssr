import { createContext, useContext } from "react";
import logdna from "@logdna/browser";

const CONTEXT = {
	hostname: process.env.REACT_APP_LOGGER_HOSTNAME,
	env: process.env.REACT_APP_LOGGER_ENV,
	app: process.env.REACT_APP_LOGGER_APP,
};
logdna.init(process.env.REACT_APP_LOGGER_API_KEY);
logdna.addContext(CONTEXT);

const setUser = ({ user_id, workspace_id }) => {
	return logdna.addContext({
		...CONTEXT,
		user: {
			id: user_id,
			workspace_id: workspace_id,
		},
	});
};
const value = {
	client: logdna,
	log: () => logdna.log,
	warn: () => logdna.warn,
	error: () => logdna.error,
	setUser,
};

const Context = createContext(value);

export const useLogger = () => useContext(Context);
export default function LoggerContext({ children }) {
	return <Context.Provider value={value}>{children}</Context.Provider>;
}
