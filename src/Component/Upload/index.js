import { Fab } from "@mui/material";
import UploadIcon from "@mui/icons-material/CloudUpload";
import { useUploady } from "@rpldy/uploady";

export default function UploadWidget() {
	const { showFileUpload } = useUploady();
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
				onClick={showFileUpload}
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
