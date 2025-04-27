import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

export const handleExceptions = (error: Error, message: string) => {
  if (error instanceof BadRequestException) {
    throw new BadRequestException(error.message);
  }
  if (error instanceof NotFoundException) {
    throw new NotFoundException(error.message);
  }
  throw new InternalServerErrorException(message);
};
