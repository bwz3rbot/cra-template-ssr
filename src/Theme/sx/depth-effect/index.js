export default function depthEffect(level = 4) {
	return {
		border: "1px solid",
		borderColor: "divider",
		boxShadow: level,
	};
}
