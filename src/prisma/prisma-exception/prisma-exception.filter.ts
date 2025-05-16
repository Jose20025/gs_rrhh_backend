import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import type { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Error interno del servidor';

    switch (exception.code) {
      case 'P2002':
        statusCode = HttpStatus.CONFLICT;
        message = `Ya existe un valor único en uno de los campos`;
        break;
      case 'P2025':
        statusCode = HttpStatus.NOT_FOUND;
        message = `No se encontró el recurso solicitado`;
        break;
      // Podés agregar más códigos según necesidad
      default:
        message = exception.message;
        break;
    }

    response.status(statusCode).json({
      statusCode,
      message,
      error: exception.code,
    });
  }
}
