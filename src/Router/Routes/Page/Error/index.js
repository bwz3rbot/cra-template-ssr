import ErrorIcon from "@mui/icons-material/Error";
import { useLayoutVariant } from "../../../../Layout";
import { ErrorPage } from "../../../../Component/ErrorPanel";
export default function ApolloClientConnectionErrorPage() {
	useLayoutVariant({
		variant: "standard",
	});

	return (
		<ErrorPage
			message={`An unexpected error occurred`}
			Icon={ErrorIcon}
			IconColor="error.main"
			action={`Please try again later`}
		/>
	);
}
