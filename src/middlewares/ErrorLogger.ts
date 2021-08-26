import { NextFunction, Request, Response } from 'express';
import { HttpException } from '../exceptions/http';
import { appConfig as config } from '../config/index';

interface ErrorLog {
	name: string;
	appVersion: string;
	debug: boolean;
	selfUrl: string;
	status: number;
	message: string;
	trace: string;
}

export function errorLogger(
	error: HttpException,
	_request: Request,
	_response: Response,
	next: NextFunction
) {
	const log: ErrorLog = {
		name: config.name,
		appVersion: config.version,
		debug: config.debug,
		selfUrl: config.selfUrl,
		status: error.status,
		message: error.message,
		trace: error.trace
	};

	console.error(log);

	next();
}
