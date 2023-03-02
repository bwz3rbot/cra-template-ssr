import { PropTypes } from "prop-types";
import { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { LayoutSPA } from "./SPA";
import { LayoutDefault } from "./Standard";

const Context = createContext({
	variant: "default",
	setVariant: () => {},
});

export const useLayoutVariant = ({ variant }) => {
	const { setVariant, variant: defaultVariant } = useContext(Context);
	useEffect(() => {
		if (variant !== defaultVariant) setVariant(variant);
	}, [variant]);

	return {
		setVariant,
		variant,
		defaultVariant,
	};
};
useLayoutVariant.propTypes = {
	variant: PropTypes.oneOf(["default", "SPA"]),
};

export default function LayoutProvider({ children, variant = "default" }) {
	const [layoutVariant, setLayoutVariant] = useState(variant);

	const location = useLocation();
	useEffect(() => {
		console.log("location has changed. setting variant to", variant);
		setLayoutVariant(variant);
	}, [location]);

	const layouts = {
		default: LayoutDefault,
		SPA: LayoutSPA,
	};
	const Layout = layouts[layoutVariant];
	return (
		<Context.Provider
			value={{
				variant: "default",
				setVariant: variant => {
					setLayoutVariant(variant);
				},
			}}
		>
			<Layout>{children}</Layout>
		</Context.Provider>
	);
}

LayoutProvider.propTypes = {
	children: PropTypes.node.isRequired,
	variant: PropTypes.oneOf(["default", "SPA"]),
};
