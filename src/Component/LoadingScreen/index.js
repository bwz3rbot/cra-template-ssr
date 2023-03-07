import "./styles.css";
export default function LoadingScreen({ children, loading }) {
	return (
		<>
			<div
				className={`loadingScreen ${
					!loading ? "loadingScreen--hidden" : ""
				}`}
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
