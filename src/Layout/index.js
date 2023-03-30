import { PropTypes } from "prop-types";
import { createContext, useContext, useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import LayoutSPA from "./SPA";
import LayoutStandard from "./Standard";
import { useCookies } from "../Cookies";

const defaultVariant = "standard";
const Context = createContext({
	variant: defaultVariant,
	setVariant: () => {},
	currentVariant: defaultVariant,
});

export const useLayoutVariant = ({ variant }) => {
	const {
		setVariant,
		variant: defaultVariant,
		currentVariant,
	} = useContext(Context);
	useEffect(() => {
		if (variant !== currentVariant) setVariant(variant);
	}, [variant]);

	return {
		setVariant,
		variant,
		defaultVariant,
	};
};
useLayoutVariant.propTypes = {
	variant: PropTypes.oneOf(["standard", "SPA"]),
};

const LOCAL_STORAGE_KEY_LOCATION_MAP = "LAYOUT-PROVIDER-LOCATION-MAP";
export const AppHeight = ({
	children,
	debug = false,
	overflowY = "scroll",
	...other
}) => {
	return (
		<div
			style={{
				height: `var(--app-height)`,
				border: debug ? "1px solid red" : "none",
				overflowY,
				...other,
			}}
		>
			{children}
		</div>
	);
};
export const BodyHeight = ({
	children,
	debug = false,
	overflowY = "scroll",
	...other
}) => {
	return (
		<div
			style={{
				height: `var(--body-height)`,
				border: debug ? "1px solid red" : "none",
				overflowY,
				...other,
			}}
		>
			{children}
		</div>
	);
};

export default function LayoutProvider({ children, variant = "standard" }) {
	const cookies = useCookies();
	const location = useLocation();
	const params = useParams();

	const [currentVariant, setCurrentVariant] = useState(variant);
	const getLocationLayoutMap = () => {
		const locationMap = cookies.get(LOCAL_STORAGE_KEY_LOCATION_MAP);
		return JSON.parse(locationMap || "{}");
	};
	const storeLocationLayoutMap = map => {
		cookies.set(LOCAL_STORAGE_KEY_LOCATION_MAP, JSON.stringify(map));
	};

	const [locationMap, setLocationMap] = useState(getLocationLayoutMap());

	const handleSetVariant = variant => {
		// this handler will fix the bug that causes tabs to be re-rendered when switching between them
		// if tabs are implemented with useLocation in combination with useLayoutVariant transition animation will not play when switching between tabs
		// unless we store the location in local storage and compare it to the current location before setting the variant

		const newLocationMap = {
			...locationMap,
			[location.pathname]: variant,
		};
		storeLocationLayoutMap(newLocationMap);
		const mismatches = Object.entries(newLocationMap).reduce(
			(acc, [key, value]) => {
				if (value !== locationMap[key]) acc++;
				return acc;
			},
			0
		);
		if (mismatches === 0) return;

		setLocationMap(newLocationMap);
	};

	useEffect(() => {
		let thisPageVariant = locationMap[location.pathname] || variant;

		if (thisPageVariant !== currentVariant) {
			setCurrentVariant(thisPageVariant);
		}
	}, [location, params]);

	const layouts = {
		standard: LayoutStandard,
		SPA: LayoutSPA,
	};

	const Layout = layouts[currentVariant];

	return (
		<Context.Provider
			value={{
				variant: currentVariant,
				setVariant: handleSetVariant,
				currentVariant: currentVariant,
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
