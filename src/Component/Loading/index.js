import "./styles.css";
export default function LoadingScreen() {
	return (
		<div
			className={"loadingScreen"}
			sx={{
				backgroundColor: "background.default",
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
		</div>
	);
}
