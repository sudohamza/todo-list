import { Injectable } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { Response } from 'express';

@Injectable()
export class UserService {
  async getUserProfile(response: Response) {
    try {
      return instanceToPlain(response.locals.user);
    } catch (error) {}
  }
}
