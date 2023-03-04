import { Fab } from "@mui/material";
import UploadIcon from "@mui/icons-material/CloudUpload";
export default function UploadWidget() {
	return (
		<>
			<Fab
				color="primary"
				aria-label="upload"
				sx={{
					position: "fixed",
					bottom: 16,
					right: 16,
					// backgroundColor: "#19857b",
					backgroundColor: "primary.main",
				}}
			>
				<UploadIcon
					sx={{
						color: "primary.contrastText",
					}}
				/>
			</Fab>
		</>
	);
}
