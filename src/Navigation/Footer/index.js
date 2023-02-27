import { Grid, Typography, Divider } from "@mui/material";
import RoundLogo from "../../Logo/round.png";
import { LinkSection } from "../Links";
import { Link } from "react-router-dom";
const LogoWrapper = () => {
	return (
		<Grid
			item
			sx={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				marginBottom: ".15rem",
			}}
		>
			<Link
				to="/"
				style={{
					textDecoration: "none",
					color: "inherit",
					margin: "0",
					padding: 0,
				}}
			>
				<img
					style={{
						width: "65px",
						height: "65px",
						marginBottom: ".5rem",
					}}
					src={RoundLogo}
					alt="Round Logo"
				/>
			</Link>
			<Typography fontSize={".75rem"}>
				&copy;{new Date().getFullYear()}{" "}
				{process.env.REACT_APP_SITE_NAME} - All rights reserved.
			</Typography>
		</Grid>
	);
};
export const Footer = () => {
	return (
		<Grid
			container
			sx={{
				minHeight: "var(--footer-min-height)",
				height: "fit-content",
				backgroundColor: "primary.light",
				borderRadius: "2px",

				alignSelf: "flex-end",
			}}
		>
			<Grid
				container
				sx={{
					display: "flex",
					justifyContent: "flex-start",
					paddingTop: "1rem",
				}}
			>
				{LinkSection.map((section, index) => {
					return (
						<Grid
							key={index}
							item
							xs={12}
							sm={6}
							md={4}
							sx={{
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<Typography
								sx={{
									fontWeight: "bold",
									paddingLeft: "4px",
									color: "text.primary",
								}}
								variant="h6"
							>
								{section.name}
							</Typography>
							{section.links.map(({ to, text, Icon }, index) => (
								<Grid
									key={index}
									item
									sx={{
										display: "flex",
										flexDirection: "column",
										justifyContent: "center",
										alignItems: "center",
									}}
								>
									<Typography
										component={Link}
										to={to}
										style={{
											color: "text.secondary",
										}}
									>
										{text}
									</Typography>
								</Grid>
							))}
						</Grid>
					);
				})}
			</Grid>
			<Grid
				container
				sx={{
					display: "flex",
					justifyContent: "center",
				}}
			>
				<LogoWrapper />
			</Grid>
		</Grid>
	);
};
