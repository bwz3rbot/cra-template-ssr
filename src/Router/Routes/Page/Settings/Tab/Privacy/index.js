import {
	Grid,
	Card,
	CardContent,
	FormControlLabel,
	Switch,
} from "@material-ui/core";
export default function SettingsPagePrivacyTab() {
	return (
		<>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Card>
						<CardContent>
							<Grid container spacing={2}>
								{settings.map((setting, index) => {
									return (
										<Grid item xs={12} key={index}>
											<FormControlLabel
												control={
													<Switch
														checked={setting.value}
														name={setting.name}
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
																	e.target
																		.checked,
															},
														},
														onCompleted: data => {
															console.log(
																"updated config",
																data
															);
														},

														refetchQueries: [
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
	);
}
