import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
} from "@mui/material";
import depthEffect from "../../../Theme/sx/depth-effect";

// describes all the available features and which plans are allowed to use them
export default function FeaturesList() {
	const tiers = ["Bronze", "Silver", "Gold"];
	const features = [
		{
			name: "Feature 1",
			tiers: ["Bronze", "Silver", "Gold"],
		},
		{
			name: "Feature 2",
			tiers: ["Silver", "Gold"],
		},
		{
			name: "Feature 3",
			tiers: ["Gold"],
		},
	];
	const canTierUseFeature = (tier, feature) => {
		return feature.tiers.includes(tier);
	};
	return (
		<TableContainer
			component={Paper}
			sx={{
				maxWidth: "100%",
				...depthEffect(),
			}}
		>
			<Table aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell
							sx={{
								fontWeight: "bold",
							}}
							align="left"
						>
							Feature
						</TableCell>
						{tiers.map((tier, i) => (
							<TableCell
								key={i}
								sx={{
									fontWeight: "bold",
								}}
								align="right"
							>
								{tier}
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{features.map((feature, i) => (
						<TableRow
							key={i}
							sx={{
								"&:last-child td, &:last-child th": {
									border: 0,
								},
							}}
						>
							<TableCell component="th" scope="row">
								{feature.name}
							</TableCell>
							{tiers.map((tier, i) => (
								<TableCell key={i} align="right">
									{canTierUseFeature(tier, feature)
										? "✅"
										: "❌"}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
