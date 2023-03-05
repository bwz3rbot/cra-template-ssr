const definitions = {
	user: { query: require("./user/query") },
	notifications: {
		query: require("./notifications/query"),
		subscription: require("./notifications/subscription"),
		mutation: require("./notifications/mutation"),
	},
	file: {
		query: require("./file/query"),
		mutation: require("./file/mutation"),
	},
};

export default definitions;
