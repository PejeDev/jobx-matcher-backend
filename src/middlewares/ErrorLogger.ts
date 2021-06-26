import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';
import { AppConfig as config } from '../config/Index';

interface IErrorLog {
	name: string;
	appVersion: string;
	debug: boolean;
	selfUrl: string;
	status: number;
	message: string;
	trace: string;
}

function ErrorLogger(
	error: HttpException,
	_request: Request,
	_response: Response,
	next: NextFunction
) {
	const log: IErrorLog = {
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

export default ErrorLogger;
