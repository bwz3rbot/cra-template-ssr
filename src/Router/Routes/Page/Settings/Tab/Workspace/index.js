import { useState } from "react";
import { Grid, Box, Typography, Tabs, Tab } from "@mui/material";
import Workspace from "../../../../../../Component/Workspace";
import { useRequester } from "../../../../../../Apollo";
import Member from "../../../../../../Component/Member";
import depthEffect from "../../../../../../Theme/sx/depth-effect";
export default function SettingsPageWorkspaceTab() {
	const { user: appUser } = useRequester();
	const workspace = appUser?.workspace;
	const members = appUser?.workspace?.members;
	const administrators = appUser?.workspace?.admin;
	const owner = appUser?.workspace?.owner;

	return (
		<>
			<Grid
				container
				sx={{
					width: "100%",
					display: "flex",
					justifyContent: "space-around",
				}}
			>
				<Grid
					item
					sx={{
						...depthEffect(),
						height: "fit-content",
					}}
				>
					<Workspace />

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
						{[...members, ...members, ...members].map(
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
		</>
	);
}
