import { BadRequestException } from '@nestjs/common';

export function validatePassword(password: string): void {
  if (password.length < 12) {
    throw new BadRequestException(
      'Password must be at least 12 characters long.',
    );
  }
  if ((password.match(/[a-z]/g) || []).length < 1) {
    throw new BadRequestException(
      'Password must contain at least one lowercase letter.',
    );
  }
  if ((password.match(/[A-Z]/g) || []).length < 1) {
    throw new BadRequestException(
      'Password must contain at least one uppercase letter.',
    );
  }
  if ((password.match(/\d/g) || []).length < 1) {
    throw new BadRequestException('Password must contain at least one number.');
  }
  if ((password.match(/[\W_]/g) || []).length < 1) {
    throw new BadRequestException(
      'Password must contain at least one special character.',
    );
  }
}
