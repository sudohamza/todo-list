import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserDto } from 'src/user/dto/register-user.dto';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { hashSync, compareSync } from 'bcrypt';
import { handleExceptions } from 'src/utils/handle-exceptions';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async register(body: RegisterUserDto, response: Response) {
    console.log(body);
    try {
      const user = await this.userRepo.findOne({
        where: { email: body.email },
      });
      if (user)
        throw new BadRequestException('User already exist with this email.');
      const newUser = new User();
      newUser.email = body.email;
      newUser.name = body.name;
      newUser.admin = false;
      newUser.password_hash = hashSync(body.password, 10);
      const savedUser = await this.userRepo.save(newUser);
      const token = await this.createJwtToken(savedUser);
      response
        .cookie('token', token, {
          maxAge: body.remember ? this.config.get('COOKIE_AGE') : undefined,
          httpOnly: true,
          secure: true,
        })
        .send({ success: true });
    } catch (error) {
      handleExceptions(error, 'Something went wrong while registering user.');
    }
  }

  async login(body: LoginUserDto, response: Response) {
    try {
      const user = await this.userRepo.findOne({
        where: { email: body.email },
      });
      if (!user) throw new BadRequestException('Invalid email or password.');
      const password = compareSync(body.password, user.password_hash);
      if (!password)
        throw new BadRequestException('Invalid email or password.');
      const token = await this.createJwtToken(user);
      response
        .cookie('token', token, {
          maxAge: body.remember ? this.config.get('COOKIE_AGE') : undefined,
          httpOnly: true,
          secure: true,
        })
        .send({ success: true });
    } catch (error) {
      handleExceptions(error, 'Something went wrong while login.');
    }
  }

  logout(response: Response) {
    response
      .cookie('token', '', {
        maxAge: 0,
        httpOnly: true,
        secure: true,
      })
      .send({ success: true });
  }

  async createJwtToken(user: User) {
    const data = { id: user._id };
    const age = this.config.get('COOKIE_AGE');
    const key = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(data, {
      expiresIn: age,
      secret: key,
    });
    return token;
  }
}
