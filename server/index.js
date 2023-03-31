(async () => {
	const { SecretsManager } = require("./SecretsManager");
	await new SecretsManager().init();
	require("ignore-styles");

	require("@babel/register")({
		ignore: [/(node_module)/],
		presets: [
			"@babel/preset-env",
			[
				"@babel/preset-react",
				{
					// runtime: "automatic" allows us to use server side JSX without importing React in every file
					runtime: "automatic",
				},
			],
		],
	});

	require("./listener");
})();
