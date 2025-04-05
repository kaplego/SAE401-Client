enum ResultType {
	Success,
	Error,
}

export default class Result<SuccessType, ErrorType, Status extends ResultType = ResultType> {
	private _status: Status;
	private _value: Status extends typeof ResultType.Success ? SuccessType : ErrorType;

	public get status() {
		return this._status;
	}
	public isSuccess(): this is Result<SuccessType, ErrorType, ResultType.Success> {
		return this._status === ResultType.Success;
	}
	public isError(): this is Result<SuccessType, ErrorType, ResultType.Error> {
		return this._status === ResultType.Error;
	}

	public get value(): Status extends typeof ResultType.Success ? SuccessType : ErrorType {
		return this._value;
	}

	private constructor(status: Status, value: Status extends ResultType.Success ? SuccessType : ErrorType) {
		this._status = status;
		this._value = value;
	}

	public static success<SuccessType, ErrorType>(value: SuccessType) {
		return new Result<SuccessType, ErrorType, ResultType.Success>(ResultType.Success, value);
	}
	public static error<SuccessType, ErrorType>(value: ErrorType) {
		return new Result<SuccessType, ErrorType, ResultType.Error>(ResultType.Error, value);
	}
}
