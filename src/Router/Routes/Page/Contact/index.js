import { Button, Grid, Typography, Card, Dialog } from "@mui/material";
import { useState } from "react";
import ContactForm from "./Form";
import AlertPanel from "../../../../Component/ErrorPanel";
import MarkEmailReadOutlinedIcon from "@mui/icons-material/MarkEmailReadOutlined";
import { useNavigate } from "react-router-dom";
export default function PageContact() {
	const navigate = useNavigate();
	const [successDialogOpen, setSuccessDialogOpen] = useState(false);
	return (
		<Grid
			container
			sx={{
				display: "flex",
				justifyContent: "center",
				padding: 2,
				flexDirection: "column",
			}}
		>
			<Typography
				variant="h1"
				sx={{
					textAlign: "center",
					margin: "auto",
					width: "100%",
					maxWidth: "500px",
					fontSize: "2.5rem",
					marginBottom: 2,
				}}
			>
				Contact Us
			</Typography>
			<Dialog
				open={successDialogOpen}
				onClose={() => setSuccessDialogOpen(false)}
				sx={{
					textAlign: "center",
				}}
			>
				<AlertPanel
					ActionButton={
						<Button
							variant="contained"
							onClick={() => {
								navigate("/home");
							}}
						>
							return home
						</Button>
					}
					IconColor="info.main"
					Icon={MarkEmailReadOutlinedIcon}
					message={`We’re thrilled to hear from you!`}
					action={`Your message has been sent successfully.`}
				/>
			</Dialog>

			<ContactForm
				onSuccess={() => {
					setSuccessDialogOpen(true);
				}}
			/>
		</Grid>
	);
}
