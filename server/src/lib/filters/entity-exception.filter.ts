import {
  type ArgumentsHost,
  Catch,
  type ExceptionFilter,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { type ValidationError } from 'class-validator';
import { type Response } from 'express';
import { DetailError, ResponseValidationFilter } from '../types';

  
@Catch(UnprocessableEntityException)
export class HttpExceptionFilter
    implements ExceptionFilter<UnprocessableEntityException>
  {
    constructor(public reflector: Reflector) {}
  
    catch(exception: UnprocessableEntityException, host: ArgumentsHost): void {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const statusCode = exception.getStatus();
      const r = exception.getResponse() as { message: ValidationError[] };
      
      const validationErrors = r.message;
      
      const details: DetailError[] = this.validationFilter(validationErrors);
      const res : ResponseValidationFilter = {
        message: 'Invalid field',
        details: details,
      }
      response.status(statusCode).json(res);
    }
  
    private validationFilter(validationErrors: ValidationError[]): DetailError[] {
        let details : DetailError[] = [];

        for (const validationError of validationErrors) {

            delete validationError.children;

            const constraints = validationError.constraints;
            const contexts = validationError?.contexts;
            if (!constraints) {
                return;
            }
            let message : string;
            let error : string = ''; 
            for (const [constraintKey, constraint] of Object.entries(
                constraints,
            )) {
                // find the first error message
                if (constraint[constraintKey] !== ''){
                    message = constraint;
                    break;
                }
            }
            if(contexts){
                for (const [contextKey, context] of Object.entries(
                    contexts,
                )) {
                    // find the first error message
                    if (contexts[contextKey] !== ''){
                        error = context.error;
                        break;
                    }
                }
            }
            const detail : DetailError = {
                field: validationError.property,
                message: message,
                value: validationError.value,
                error: error
            }
            details.push(detail);    
        }
        
        return details;
    }
  }
  