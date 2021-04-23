import dbConnect from 'lib/dbConnect.js';
import dbInit from 'lib/dbInit.js';
import User from 'models/User.js';

export default async function handler(req, res) {
	const { method } = req;

	await dbConnect();
	await dbInit();

	switch (method) {
		case 'GET':
			try {
				const Users = await User.find({}); /* find all the data in our database */
				res.status(200).json({ success: true, data: Users });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;
		case 'POST':
			try {
				const User = await User.create(req.body); /* create a new model in the database */
				res.status(201).json({ success: true, data: User });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
}
