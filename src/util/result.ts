export class Result<Ok, Err> {
    private readonly value: Ok | Err;
    private readonly isOkValue: boolean;

    constructor(value: Ok | Err, isOk: boolean) {
        this.value = value;
        this.isOkValue = isOk;
    }

    isOk(): boolean {
        return this.isOkValue;
    }

    isErr(): boolean {
        return !this.isOkValue;
    }

    getOK(): Ok {
        return this.value as Ok;
    }

    getErr(): Err {
        return this.value as Err;
    }

    getValue(): Ok | Err {
        return this.value;
    }
}

export function okResult<Ok, Err>(value: Ok): Result<Ok, Err> {
    return new Result<Ok, Err>(value, true);
}

export function errResult<Ok, Err>(value: Err): Result<Ok, Err> {
    return new Result<Ok, Err>(value, false);
}