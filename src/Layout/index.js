import { PropTypes } from "prop-types";
import {
	createContext,
	useContext,
	useState,
	useEffect,
	useLayoutEffect,
} from "react";
import { useLocation } from "react-router-dom";
import LayoutSPA from "./SPA";
import LayoutStandard from "./Standard";

const Context = createContext({
	variant: "default",
	setVariant: () => {},
});

export const useLayoutVariant = ({ variant }) => {
	const { setVariant, variant: defaultVariant } = useContext(Context);
	useLayoutEffect(() => {
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

export default function LayoutProvider({ children, variant = "standard" }) {
	const [layoutVariant, setLayoutVariant] = useState(variant);

	const location = useLocation();
	useEffect(() => {
		setLayoutVariant(variant);
	}, [location]);

	const layouts = {
		standard: LayoutStandard,
		SPA: LayoutSPA,
	};
	const Layout = layouts[layoutVariant];

	return (
		<Context.Provider
			value={{
				variant: "standard",
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
	variant: PropTypes.oneOf(["standard", "SPA"]),
};
