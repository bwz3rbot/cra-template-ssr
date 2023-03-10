export const randomImage = ({
	source = "unsplash",
	width = 345,
	height = 140,
} = {}) => {
	const random = Math.floor(Math.random() * 1000);
	switch (source) {
		case "unsplash":
		default:
			return `https://source.unsplash.com/random/${
				width + "x" + height
			}?sig=${random}`;
	}
};
