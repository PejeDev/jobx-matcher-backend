class HttpException extends Error {
	public status: number;

	public message: string;

	public trace: string;

	constructor(status: number, message: string, trace?: string) {
		super(message);
		this.status = status;
		this.message = message;
		this.trace = trace;
	}
}

export { HttpException };
