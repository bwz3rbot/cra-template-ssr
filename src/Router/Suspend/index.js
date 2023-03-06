import { Suspense } from "react";
import LoadingScreen from "../../Component/LoadingScreen";
export const Suspend = ({ children }) => {
	return <Suspense fallback={<LoadingScreen />}>{children}</Suspense>;
};
