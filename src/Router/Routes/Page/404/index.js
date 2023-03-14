import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import WarningIcon from "@mui/icons-material/Warning";
import { ErrorPage } from "../../../../Component/ErrorPanel";

export default function Pag404() {
	const navigate = useNavigate();
	return (
		<ErrorPage
			message="404 - Page Not Found"
			Icon={WarningIcon}
			IconColor="warning.main"
			action={`We're sorry, but the page you requested could not be found.`}
			ActionButton={
				<Typography
					variant="button"
					onClick={() => {
						navigate(-1);
					}}
					sx={{
						fontWeight: 600,
						cursor: "pointer",
					}}
				>
					&#8592; Go back
				</Typography>
			}
		/>
	);
}
