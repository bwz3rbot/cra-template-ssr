import "./styles.css";
export default function LoadingScreen({ children, loading }) {
	let className;
	if (loading === undefined) {
		className = "loadingScreen";
	} else {
		className = `loadingScreen ${loading ? "" : "loadingScreen--hidden"}`;
	}
	return (
		<>
			<div
				className={className}
				st={{
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
			{!loading && children ? children : null}
		</>
	);
}
