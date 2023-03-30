import { useForm, ValidationError } from "@formspree/react";
import { useSnackbar } from "notistack";

import {
	TextField,
	Checkbox,
	Button,
	FormControl,
	FormGroup,
	FormControlLabel,
} from "@mui/material";
import { useAnalytics } from "../../../../../Google/Analytics";

export default function ContactForm({ onSuccess }) {
	const { enqueueSnackbar } = useSnackbar();
	const { sendEvent } = useAnalytics();
	const [state, submit] = useForm(
		process.env.REACT_APP_FORMSPREE_CONTACT_FORM_ID
	);
	return (
		<>
			<FormControl
				component="form"
				onSubmit={async e => {
					e.preventDefault();
					try {
						await submit(e);
						onSuccess?.(true);
						sendEvent({
							category: "Contact Form",
							action: "Submit",
							label: "Contact Form",
						});
					} catch (err) {
						enqueueSnackbar("Error submitting form", {
							type: "error",
						});
					}
				}}
				sx={{
					display: "flex",
					flexDirection: "column",
					gap: 2,
					width: "100%",
					maxWidth: "500px",
					margin: "auto",
				}}
			>
				<TextField
					required
					label="Email Address"
					placeholder="your@email.com"
					id="email"
					type="email"
					name="EMAIL"
					autoComplete="email"
				/>
				<TextField
					required
					label="First Name"
					id="fname"
					type="text"
					name="FNAME"
					autoComplete="given-name"
				/>
				<TextField
					required
					label="Last Name"
					id="lname"
					type="text"
					name="LNAME"
					autoComplete="family-name"
				/>
				<TextField
					label="Organization"
					id="business"
					type="text"
					name="ORGANIZATION"
					autoComplete="organization"
				/>
				<TextField
					label="Phone Number"
					id="lname"
					type="tel"
					name="PHONE"
					autoComplete="tel"
				/>
				<ValidationError
					prefix="Email"
					field="email"
					errors={state.errors}
				/>
				<TextField
					multiline
					rows={3}
					sx={{
						width: "100%",
						maxWidth: "500px",
						margin: "auto",
					}}
					label="Leave us a message!"
					description="A general overview of the project requirements"
					id="message"
					name="MESSAGE"
				/>
				<FormGroup
					row
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						gap: 2,
						fontSize: "0.8rem",
					}}
				>
					<FormControlLabel
						labelPlacement="end"
						componentsProps={{
							typography: {
								variant: "body2",
							},
						}}
						control={
							<Checkbox
								defaultChecked
								type="checkbox"
								id="_optin"
								name="_optin"
							/>
						}
						label="Sign me up for the newsletter"
					/>
					<Button
						type="submit"
						variant="contained"
						disabled={state.submitting}
						sx={{
							fontSize: "0.8rem",
						}}
					>
						Submit
					</Button>
				</FormGroup>
			</FormControl>
		</>
	);
}
