import { BadRequestException } from '@nestjs/common';
import { DetailError } from '../types';


export class CustomBadRequestException extends BadRequestException {
  constructor(public readonly body: { details: DetailError[] }) {
    super(body);

    this.message = 'Bad Request Exception';
  }
}
