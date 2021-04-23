import dbConnect from 'lib/dbConnect.js';
import dbInit from 'lib/dbInit.js';
import { ClientError, ServerError } from 'lib/errorHandlers.js';
import User from 'models/User.js';

export default async function handler(req, res) {
	/* function serverError(error, message = 'Internal Server Error', status = 500) {
		res.status(status ?? 500).json({ success: false, message, error });
		return;
	} */
	function dbError(error, message = 'Database Error', status = 500) {
		throw new ServerError(message, status, error);
	}

	const {
		method,
		query: { params },
	} = req;
	const [username, engineName] = params;

	console.log('username:', username, '; engineName:', engineName);

	await dbConnect();
	await dbInit();

	try {
		const user = await User.findOne({
			username,
		}).catch(dbError);
		if (!user) {
			throw new ClientError('User not found', 404);
		} else {
			switch (method) {
				case 'GET':
					try {
						const config = !engineName
							? user.config
							: user.config.filter((e) => e.name === engineName);
						if (!config || config.length === 0) {
							throw new ClientError('Engine not found', 404);
						} else {
							res.status(200).json({ success: true, config });
						}
					} catch ({ status, message }) {
						res.status(status ?? 500).json({ success: false, message });
					}
					break;

				case 'POST':
					try {
						user.config.forEach((e) => {
							if (e.name === req.body.name) {
								throw new ClientError('Found Duplicate Entry', 403);
							}
						});
						user.config.push(req.body);
						const updatedUser = await user.save().catch(dbError);
						res.json({ success: true, delta: req.body, config: updatedUser.config });
					} catch ({ status, message }) {
						res.status(status ?? 500).json({ success: false, message });
					}
					break;

				case 'DELETE':
					try {
						let delta = null;
						user.config = user.config.filter((e) => {
							if (e.name === engineName) {
								delta = e;
								return false;
							} else return true;
						});
						if (!delta) throw new ClientError('Engine not found', 404);
						const updatedUser = await user.save().catch(dbError);
						res.json({ success: true, delta, config: updatedUser.config });
					} catch ({ status, message }) {
						res.status(status ?? 500).json({ success: false, message });
					}
					break;

				case 'PATCH':
					try {
						let delta = null;
						// console.log(user.config)
						for (let e of user.config) {
							if (e.name === engineName) {
								delta = JSON.parse(JSON.stringify(e));
								e = Object.assign(e, req.body);
							}
						}
						if (!delta) throw new ClientError('Engine not found', 404);
						const updatedUser = await user.save().catch(dbError);
						res.json({ success: true, delta, config: updatedUser.config });
					} catch ({ status, message }) {
						res.status(status ?? 500).json({ success: false, message });
					}
					break;
				default:
					res.status(501).json({ success: false, message: 'Unsupported Request' });
					break;
			}
		}
	} catch ({ status, message }) {
		res.status(status ?? 500).json({ success: false, message });
	}
}
