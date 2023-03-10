import {
	Grid,
	Card,
	CardContent,
	CardHeader,
	CardActions,
	FormControlLabel,
	Switch,
	TextField,
	Box,
	IconButton,
	Tooltip,
} from "@mui/material";
import { useRequester } from "../../../../../../Apollo";
import LoadingScreen from "../../../../../../Component/LoadingScreen";
export default function SettingsPageNotificationsTab() {
	const { definitions, useQuery, useMutation } = useRequester();
	const { data, loading } = useQuery(definitions.notifications.query.config, {
		fetchPolicy: "network-only",
	});
	const [updateConfig] = useMutation(
		definitions.notifications.mutation.config
	);

	const settings = [
		{
			name: "enable_in_app",
			label: "Enable in-app notifications",
			value: data?.notification_config?.enable_in_app,
		},
		{
			name: "enable_push",
			label: "Enable push notifications",
			value: data?.notification_config?.enable_push,
		},
		{
			name: "enable_email",
			label: "Enable email notifications",
			value: data?.notification_config?.enable_email,
		},

		{
			name: "enable_sms",

			label: "Enable SMS notifications",
			value: data?.notification_config?.enable_sms,
		},
	];
	return (
		<LoadingScreen transparent loading={loading}>
			{!loading && (
				<>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Card>
								<CardHeader title="Notifications" />
								<CardContent>
									<Grid container spacing={2}>
										{settings.map((setting, index) => {
											return (
												<Grid item xs={12} key={index}>
													<FormControlLabel
														control={
															<Switch
																checked={
																	setting.value
																}
																name={
																	setting.name
																}
																color="primary"
															/>
														}
														label={setting.label}
														onChange={e => {
															console.log(
																"updating config"
															);
															updateConfig({
																variables: {
																	input: {
																		[setting.name]:
																			e
																				.target
																				.checked,
																	},
																},
																onCompleted:
																	data => {
																		console.log(
																			"updated config",
																			data
																		);
																	},

																refetchQueries:
																	[
																		{
																			query: definitions
																				.notifications
																				.query
																				.config,
																		},
																	],
															});
														}}
													/>
												</Grid>
											);
										})}
									</Grid>
								</CardContent>
							</Card>
						</Grid>
					</Grid>
				</>
			)}
		</LoadingScreen>
	);
}
