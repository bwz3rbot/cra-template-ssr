import { createContext, useContext } from "react";
import Cookie from "cookie-universal";
const set = (k, v, opts, req, res) => {
	const cookie = Cookie(req, res);
	cookie.set(k, v, opts);
	return cookie;
};

const get = (k, opts, req, res) => {
	const cookie = Cookie(req, res);
	return cookie.get(k, opts);
};
const remove = (k, opts, req, res) => {
	const cookie = Cookie(req, res);
	cookie.remove(k, opts);
	return cookie;
};

const allKeys = (opts, req, res) => {
	const cookie = Cookie(req, res);
	return cookie.getAll(opts);
};

const Context = createContext({
	set,
	get,
	remove,
	allKeys: () => [],
});
export const useCookies = () => useContext(Context);
export default function CookiesContext({ children, req, res }) {
	return (
		<Context.Provider
			value={{
				set: (k, v, opts) => set(k, v, req, res),
				get: (k, opts) => get(k, opts, req, res),
				remove: (k, opts) => remove(k, opts, req, res),
				allKeys: opts => allKeys(opts, req, res),
			}}
		>
			{children}
		</Context.Provider>
	);
}
