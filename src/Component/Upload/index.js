import { Fab } from "@mui/material";
import UploadIcon from "@mui/icons-material/CloudUpload";
import { useUploadType } from "../../Upload";

export default function UploadWidget() {
	const { uploadAssetType } = useUploadType();
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
				onClick={() => {
					uploadAssetType("VIDEO");
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
