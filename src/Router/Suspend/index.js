import { Suspense } from "react";
import LoadingScreen from "../../Component/Loading";
export const Suspend = ({ children }) => {
	return <Suspense fallback={<LoadingScreen />}>{children}</Suspense>;
};