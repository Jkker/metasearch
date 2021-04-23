/* function serverError(error, message = 'Internal Server Error', status = 500) {
	res.status(status).json({ success: false, message, error });
}
function dbError(error, message = 'Database Error', status = 500) {
	res.status(status).json({ success: false, message, error });
}

function clientError(message = 'Bad Request', status = 400) {
	res.status(status).json({ success: false, message });
}

function notFoundError(message = 'Not Found', status = 404) {
	res.status(status).json({ success: false, message });
}
 */

export class ServerError extends Error {
	constructor(message = 'Internal Server Error', status = 500, ...params) {
		super(...params);
		this.status = status;
		this.message = message;
	}
}

export class ClientError extends Error {
	constructor(message = 'Bad Request', status = 400, ...params) {
		super(...params);
		this.status = status;
		this.message = message;
	}
}



// export default { serverError, dbError, clientError, notFoundError };
