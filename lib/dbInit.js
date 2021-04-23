const fs = require('fs').promises;
import User from 'models/User.js';

export default async function dbInit() {
	const existingUser = await User.findOne({});
	if (!existingUser) {
		await buildDefault();
	}
}

async function buildDefault() {
	const data = await fs.readFile('data/defaultConfig.json', 'utf8').catch((err) => {
		console.log(err);
		return;
	});
	const defaultConfig = await JSON.parse(data);
	await User.create([
		{
			username: 'default',
			email: 'default@example.com',
			config: defaultConfig,
		},
	]).catch(console.log);
}
