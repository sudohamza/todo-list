import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { NextFunction, Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly config: ConfigService,
    private readonly jwt: JwtService,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async use(request: Request, response: Response, next: NextFunction) {
    const key = this.config.get('JWT_SECRET');
    const cookie = request.cookies.token;
    try {
      const data = await this.jwt.verifyAsync(cookie, { secret: key });
      const user = await this.userRepo.findOneBy({
        _id: new ObjectId(data.id),
      });
      response.locals.user = user;
    } catch (error) {
      throw new UnauthorizedException('Credential expired please login again.');
    }
    next();
  }
}
