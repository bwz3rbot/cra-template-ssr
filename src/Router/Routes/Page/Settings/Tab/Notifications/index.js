import { useRequester } from "../../../../../../Apollo";
import LoadingScreen from "../../../../../../Component/LoadingScreen";
import SettingsPanel from "../../../../../../Component/Settings";
import { useSnackbar } from "notistack";
export default function SettingsPageNotificationsTab() {
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const { definitions, useQuery, useMutation } = useRequester();
	const { data, loading } = useQuery(definitions.notifications.query.config, {
		fetchPolicy: "network-only",
	});
	const [updateConfig] = useMutation(
		definitions.notifications.mutation.config
	);

	const onChange = (name, value) => {
		updateConfig({
			variables: {
				input: {
					[name]: value,
				},
			},
			onError: data => {
				console.log("updated config", data);
				enqueueSnackbar("Failed to update config", {
					variant: "error",
				});
			},

			refetchQueries: [
				{
					query: definitions.notifications.query.config,
				},
			],
		});
	};

	const options = [
		{
			name: "enable_in_app",
			label: "Enable in-app notifications",
			value: data?.notification_config?.enable_in_app,
			onChange: e => onChange("enable_in_app", e.target.checked),
		},
		{
			name: "enable_push",
			label: "Enable push notifications",
			value: data?.notification_config?.enable_push,
			onChange: e => onChange("enable_push", e.target.checked),
		},
		{
			name: "enable_email",
			label: "Enable email notifications",
			value: data?.notification_config?.enable_email,
			onChange: e => onChange("enable_email", e.target.checked),
		},

		{
			name: "enable_sms",

			label: "Enable SMS notifications",
			value: data?.notification_config?.enable_sms,
			onChange: e => onChange("enable_sms", e.target.checked),
		},
	];
	return (
		<LoadingScreen transparent loading={loading}>
			<SettingsPanel options={options} />
		</LoadingScreen>
	);
}
