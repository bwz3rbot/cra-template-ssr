import { Fragment } from "react";
import { Grid, Typography, Divider } from "@mui/material";
import RoundLogo from "../../Logo/round.png";
import { LinkSection } from "../Links";
import { Link } from "react-router-dom";
import { DarkModeSwitch } from "../../Theme";

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
			<Typography
				sx={{
					color: "text.primary",
				}}
				fontSize={".75rem"}
			>
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
				backgroundColor: "primary.main",
				borderRadius: "2px",
				alignSelf: "flex-end",
				position: "relative",
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
							xl={2}
							sx={{
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
								alignItems: "center",
								paddingBottom: "12px",
							}}
						>
							<Typography
								sx={{
									fontWeight: "bold",
									paddingLeft: "4px",
									color: "primary.contrastText",
								}}
								variant="h6"
							>
								{section.name}
							</Typography>
							{section.links.map(({ to, text, Icon }, index) => (
								<Fragment key={index}>
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
											sx={{
												textDecoration: "none",
												color: "secondary.contrastText",
												margin: "2px 0",
												padding: 0,
											}}
										>
											{text}
										</Typography>
									</Grid>
									{index === section.links.length - 1 && (
										<Divider
											sx={{
												width: "50%",
												marginTop: ".5rem",
												marginBottom: ".5rem",
												color: "secondary.contrastText",
											}}
										/>
									)}
								</Fragment>
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
			<div
				style={{
					position: "absolute",
					bottom: ".5rem",
					left: ".5rem",
				}}
			>
				<DarkModeSwitch />
			</div>
		</Grid>
	);
};
