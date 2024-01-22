import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    BadRequestException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Response } from 'express';


@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter<BadRequestException> {
    constructor(public reflector: Reflector) {}
    catch(exception: BadRequestException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        const status = exception.getStatus(); 
        const message = exception.message || 'Bad Request';
        const error : any = exception.getResponse();

        response.status(status).json({
            details: error?.details || "bad_request",
            message: message,
        });
    }
}
