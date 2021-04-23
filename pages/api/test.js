import { ServerError } from 'lib/errorHandlers.js';

export default async function handler(req, res) {
	try {
		throw new ServerError('BIG Error', 505);
	} catch (error) {
    console.error(error)
		res.status(error.status).json({ message: error.message });
	}
}
