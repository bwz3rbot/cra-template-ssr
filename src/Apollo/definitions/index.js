const definitions = {
	user: { query: require("./user/query") },
	notifications: {
		query: require("./notifications/query"),
		subscription: require("./notifications/subscription"),
	},
	media: { query: require("./media/query") },
};

export default definitions;
