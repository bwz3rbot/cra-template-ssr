import {
	Grid,
	Card,
	CardContent,
	FormControlLabel,
	Switch,
} from "@mui/material";
import depthEffect from "../../Theme/sx/depth-effect";
export default function SettingsPanel({ options }) {
	return (
		<Card
			sx={{
				...depthEffect(),
				maxWidth: 500,
			}}
		>
			<CardContent>
				<Grid container spacing={2}>
					{options.map(({ value, name, onChange, label }, index) => {
						return (
							<Grid item xs={12} key={index}>
								<FormControlLabel
									control={
										<Switch
											checked={value}
											name={name}
											color="primary"
										/>
									}
									label={label}
									onChange={onChange}
								/>
							</Grid>
						);
					})}
				</Grid>
			</CardContent>
		</Card>
	);
}
