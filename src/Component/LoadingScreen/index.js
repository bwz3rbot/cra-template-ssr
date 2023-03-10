import { Box } from "@mui/material";
import "./styles.css";
export default function LoadingScreen({ children, loading, transparent }) {
	return (
		<>
			<Box
				className={`loadingScreen ${
					loading ? "" : "loadingScreen--hidden"
				}`}
				sx={{
					backgroundColor: transparent
						? "transparent"
						: "background.default",
				}}
			>
				<div className={"loadingScreen__spinner"}>
					<div className={"loadingScreen__spinner__dot"}></div>
					<div className={"loadingScreen__spinner__dot"}></div>
					<div className={"loadingScreen__spinner__dot"}></div>
					<div className={"loadingScreen__spinner__dot"}></div>
					<div className={"loadingScreen__spinner__dot"}></div>
					<div className={"loadingScreen__spinner__dot"}></div>
				</div>
			</Box>
			{!loading && children ? children : null}
		</>
	);
}
