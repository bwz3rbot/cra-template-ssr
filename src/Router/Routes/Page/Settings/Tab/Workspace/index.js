import { Grid } from "@mui/material";
import Workspace from "../../../../../../Component/Workspace";
import { useRequester } from "../../../../../../Apollo";
import Member from "../../../../../../Component/Member";
import depthEffect from "../../../../../../Theme/sx/depth-effect";
import LoadingScreen from "../../../../../../Component/LoadingScreen";
export default function SettingsPageWorkspaceTab() {
	const { useQuery, definitions } = useRequester();
	const { data, loading } = useQuery(definitions.user.query.getUser);

	const user = data?.user;
	const workspace = user?.workspace;
	const members = user?.workspace?.members || [];
	const administrators = user?.workspace?.admin || [];
	const owner = user?.workspace?.owner;
	return (
		<LoadingScreen loading={loading} transparent>
			<Grid
				container
				sx={{
					width: "100%",
					display: "flex",
					gap: 2,
				}}
			>
				<Grid
					item
					sx={{
						...depthEffect(),
						height: "fit-content",
					}}
				>
					<Workspace workspace={workspace} />

					<Member
						workspace={workspace}
						user={owner}
						role={{
							name: "Owner",
						}}
					/>
				</Grid>
				<Grid item>
					<>
						{administrators.map((member, i) => (
							<Member
								key={i}
								user={member}
								workspace={workspace}
								role={{
									name: "Administrator",
								}}
							/>
						))}
						{[...members, ...members, ...members, ...members].map(
							(member, i) => {
								return (
									<Member
										key={i}
										user={member}
										workspace={workspace}
										role={{
											name: "Member",
										}}
									/>
								);
							}
						)}
					</>
				</Grid>
			</Grid>
		</LoadingScreen>
	);
}
