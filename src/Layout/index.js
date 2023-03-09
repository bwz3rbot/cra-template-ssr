import { PropTypes } from "prop-types";
import {
	createContext,
	useContext,
	useState,
	useEffect,
	useLayoutEffect,
} from "react";
import { useLocation, useParams } from "react-router-dom";
import LayoutSPA from "./SPA";
import LayoutStandard from "./Standard";

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

const localStorage = window.localStorage;

const LOCAL_STORAGE_KEY_LOCATION_MAP = "LAYOUT-PROVIDER-LOCATION-MAP";
const getLocationLayoutMap = () => {
	const locationMap = localStorage.getItem(LOCAL_STORAGE_KEY_LOCATION_MAP);
	return JSON.parse(locationMap || "{}");
};
const storeLocationLayoutMap = map => {
	localStorage.setItem(LOCAL_STORAGE_KEY_LOCATION_MAP, JSON.stringify(map));
};

export default function LayoutProvider({ children, variant = "standard" }) {
	const location = useLocation();
	const params = useParams();

	const [currentVariant, setCurrentVariant] = useState(variant);

	const [locationMap, setLocationMap] = useState(getLocationLayoutMap());

	const handleSetVariant = variant => {
		// this handler will fix the bug that causes tabs to be re-rendered when switching between them
		// if tabs are implemented with useLocation in combination with useLayoutVariant transition animation will not play when switching between tabs
		// unless we store the location in local storage and compare it to the current location before setting the variant

		const newLocationMap = {
			...locationMap,
			[location.pathname]: variant,
		};

		const mismatches = Object.entries(newLocationMap).reduce(
			(acc, [key, value]) => {
				if (value !== locationMap[key]) acc++;
				return acc;
			},
			0
		);

		if (mismatches === 0) return;

		storeLocationLayoutMap(newLocationMap);
		setLocationMap(newLocationMap);
	};

	useLayoutEffect(() => {
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
