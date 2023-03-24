import { Suspense } from "react";
import LoadingScreen from "../../Component/LoadingScreen";
export const Suspend = ({ children }) => {
	if (typeof window === "undefined") return children;
	return <Suspense fallback={<LoadingScreen />}>{children}</Suspense>;
};
