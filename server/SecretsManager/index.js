const {
	SecretsManagerClient,
	GetSecretValueCommand,
} = require("@aws-sdk/client-secrets-manager");
const dotenv = require("dotenv");
const cache = new Map();
class Config {
	constructor(
		applicationName = process.env.SECRETS_MANAGER_APPLICATION_NAME,
		{
			version = "AWSCURRENT",
			region = process.env.SECRETS_MANAGER_REGION || "us-west-2",
			accessKeyId = process.env.SECRETS_MANAGER_ACCESS_KEY_ID,
			secretAccessKey = process.env.SECRETS_MANAGER_SECRET_ACCESS_KEY,
		} = {}
	) {
		if (!applicationName) {
			throw new Error("applicationName is required to retreive secrets");
		}
		this.applicationName = applicationName;

		this.accessKeyId =
			accessKeyId || process.env.SECRETS_MANAGER_ACCESS_KEY_ID;
		this.secretAccessKey =
			secretAccessKey || process.env.SECRETS_MANAGER_SECRET_ACCESS_KEY;

		if (!this.accessKeyId || !this.secretAccessKey) {
			throw new Error(
				"accessKeyId and secretAccessKey are required to retreive secrets"
			);
		}

		this.client = new SecretsManagerClient({
			region,
			credentials: {
				accessKeyId: this.accessKeyId,
				secretAccessKey: this.secretAccessKey,
			},
		});
		this.version = version;
	}
}
module.exports = {
	dotenv,
	Config,
	SecretsManager: class SecretsManager {
		async init(config, autoConfig = true) {
			if (!config) {
				if (autoConfig) {
					dotenv.config();
				}
				config = new Config(
					process.env.SECRETS_MANAGER_APPLICATION_NAME
				);
			}
			// set all properties from config to this
			Object.assign(this, config);

			if (cache.get(this.applicationName)) {
				return console.log("Secrets already initialized");
			}

			const secretValue = await this.getSecretValue();
			let parsed;
			try {
				parsed = JSON.parse(secretValue);
			} catch {
				parsed = dotenv.parse(secretValue);
			}

			const entries = Object.entries(parsed);
			if (!entries.length) {
				throw new Error(
					"Failed to retrieve secrets. Check your application name."
				);
			}
			for (const [k, v] of Object.entries(parsed)) {
				process.env[k] = v;
			}
			cache.set(this.applicationName, true);
			return parsed;
		}
		async getSecretValue() {
			let response;
			try {
				response = await this.client.send(
					new GetSecretValueCommand({
						SecretId: this.applicationName,
						VersionStage: this.version, // VersionStage defaults to AWSCURRENT if unspecified
					})
				);
			} catch (error) {
				// For a list of exceptions thrown, see
				// https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
				throw error;
			}
			return response.SecretString;
		}
	},
};
