import { Controller, Get, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  getProfile(@Res({ passthrough: true }) response: Response) {
    return this.userService.getUserProfile(response);
  }
}
