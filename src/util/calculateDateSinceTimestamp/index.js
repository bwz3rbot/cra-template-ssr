export const calculateDateSinceTimestamp = timestamp => {
	const date = new Date(timestamp);
	const now = new Date();
	const diff = now.getTime() - date.getTime();
	const diffDays = Math.floor(diff / (1000 * 3600 * 24));
	const diffHours = Math.floor(diff / (1000 * 3600));

	if (diffDays > 0) {
		return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
	} else if (diffHours > 0) {
		return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
	} else {
		return "just now";
	}
};
