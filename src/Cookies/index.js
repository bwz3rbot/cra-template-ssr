import { createContext, useContext } from "react";
import Cookie from "ssr-cookie";
const set = (k, v) => {
	const cookie = new Cookie();
	cookie.set(k, v);
	return cookie;
};

const get = k => {
	const cookie = new Cookie();
	return cookie.get(k);
};
const remove = k => {
	const cookie = new Cookie();
	cookie.remove(k);
	return cookie;
};

const Context = createContext({
	set,
	get,
	remove,
});
export const useCookies = () => useContext(Context);
export default function CookiesContext({ children }) {
	return (
		<Context.Provider
			value={{
				set,
				get,
				remove,
			}}
		>
			{children}
		</Context.Provider>
	);
}
