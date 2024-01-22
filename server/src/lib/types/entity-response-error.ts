import { DetailError } from "./entity-detail-error";

export interface ResponseValidationFilter {
    readonly message: string;
    readonly details: DetailError[];
}