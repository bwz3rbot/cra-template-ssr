const definitions = {
	user: { query: require("./user/query") },
	notifications: {
		query: require("./notifications/query"),
		subscription: require("./notifications/subscription"),
	},
	file: {
		query: require("./file/query"),
		mutation: require("./file/mutation"),
	},
};

export default definitions;
