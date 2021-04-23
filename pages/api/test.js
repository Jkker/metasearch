/* import { ServerError } from 'lib/errorHandlers.js';

export default async function handler(req, res) {
	try {
		throw new ServerError('BIG Error', 505);
	} catch (error) {
    console.error(error)
		res.status(error.status).json({ message: error.message });
	}
}
 */

const x = [
	{ s: '1%s', a: 1 },
	{ s: '2%s', a: 2 },
];

const rep = (w) => x.map((e) => Object.assign(e, { s: e.s.replace(/%s/g, w) }));

console.log(rep(9)[0]);
