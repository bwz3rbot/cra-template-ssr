class PageData {
	constructor({ title, description }) {
		this.title = title;
		this.description = description;
	}
}

export const definePageData = pathname => {
	switch (pathname) {
		case "/settings":
		case "/settings/subscription":
			return new PageData({
				title: "Settings",
				description: "Settings for BangoBotto",
			});
		case "/":
		default:
			return new PageData({
				title: "BangoBotto",
				description: process.env.REACT_APP_SITE_DESCRIPTION,
			});
	}
};
