import { Controller, Post, Body, Res, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from 'src/user/dto/register-user.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { response, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(
    @Body() body: RegisterUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.register(body, response);
  }

  @Post('login')
  findOne(
    @Body() body: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.login(body, response);
  }

  @Get('logout')
  reset(@Res({ passthrough: true }) response: Response) {
    return this.authService.logout(response);
  }
}
