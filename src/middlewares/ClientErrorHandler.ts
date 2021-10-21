import { NextFunction, Request, Response } from 'express';
import { HttpException } from '@/exceptions';

function ClientErrorHandler(
	error: HttpException,
	request: Request,
	response: Response,
	// eslint-disable-next-line no-unused-vars
	_next: NextFunction
) {
	const status = error.status || 500;
	const message = error.message || 'Something went wrong';
	return response.status(status).send({
		status,
		message
	});
}

export { ClientErrorHandler };
