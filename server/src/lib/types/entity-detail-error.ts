export interface DetailError {
    readonly field?: string;
    readonly message: string;
    readonly value?: any;
    readonly error? : string;
}