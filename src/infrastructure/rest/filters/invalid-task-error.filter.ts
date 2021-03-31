import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Response } from 'express';
import { InvalidTaskError } from '../../../domain/repository';

@Catch(InvalidTaskError)
export class InvalidTaskErrorFilter implements ExceptionFilter {
  catch(exception: InvalidTaskError, host: ArgumentsHost): void {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const response: Response = ctx.getResponse<Response>();
    const status: HttpStatus = HttpStatus.BAD_REQUEST;

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      name: exception.name,
      message: exception.message,
    });
  }
}
