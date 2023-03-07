import { useLayoutVariant } from "../../../../Layout";
import { useParams } from "react-router-dom";
import {
	Grid,
	Typography,
	// tabs
	Tabs,
	Tab,
	// card
	Card,
	CardContent,
	CardActions,
	// button
	Button,
	// form
	FormControl,
	FormControlLabel,
	FormLabel,
	FormHelperText,
	// input
	TextField,
	// select
	Select,
	MenuItem,
	// checkbox
	Checkbox,
	// radio
	Radio,
	RadioGroup,
	// switch
	Switch,
} from "@mui/material";
import { Link } from "react-router-dom";
export default function PageSettings() {
	useLayoutVariant({
		variant: "standard",
	});
	const params = useParams();

	const tabs = ["account", "profile", "notifications", "password", "privacy"];
	let tabValue = tabs.findIndex(tab => {
		return tab.toLowerCase() === params?.tab?.toLowerCase();
	});
	if (tabValue === -1) tabValue = 0;

	return (
		<Grid>
			<Typography variant="h5">Settings Page</Typography>
			<Tabs variant="scrollable" value={tabValue}>
				{tabs.map((tab, i) => {
					const isSelected =
						tab.toLowerCase() === params?.tab?.toLowerCase();

					return (
						<Tab
							key={i}
							label={tab}
							component={Link}
							to={`/settings/${tab.toLowerCase()}`}
							selected={!params?.tab ? i === 1 : isSelected}
							value={i}
						/>
					);
				})}
			</Tabs>
			{tabs.map((tab, i) => {
				return (
					<Card key={i}>
						<CardContent>
							<Typography variant="h6">{tab}</Typography>
							<Typography variant="body1">
								Lorem ipsum dolor sit amet, consectetur
								adipiscing elit. Sed condimentum, nisl eget
								ultricies tincidunt, nunc elit lacinia justo,
								eget ultricies nisl nunc eget nunc. Nulla
								facilisi. Donec auctor, nisl eget ultricies
								tincidunt, nunc elit lacinia justo, eget
								ultricies nisl nunc eget nunc. Nulla facilisi.
								Donec auctor, nisl eget ultricies tincidunt,
								nunc elit lacinia
							</Typography>
						</CardContent>
						<CardActions>
							<Button variant="contained" color="primary">
								Save
							</Button>
						</CardActions>
					</Card>
				);
			})}
		</Grid>
	);
}
