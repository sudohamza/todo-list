import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { hashSync } from 'bcrypt';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private config: ConfigService,
  ) {}

  async seedAdminUser() {
    try {
      const adminEmail = this.config.get('ADMIN_EMAIL');
      const adminName = this.config.get('ADMIN_NAME');
      const adminPassword = this.config.get('ADMIN_PASSWORD');
      if (!adminEmail)
        throw new InternalServerErrorException(
          'Must provide admin email in env',
        );
      if (!adminName)
        throw new InternalServerErrorException(
          'Must provide admin email in env',
        );
      if (!adminPassword)
        throw new InternalServerErrorException(
          'Must provide admin email in env',
        );

      const adminExist = await this.userRepo.findOneBy({
        admin: true,
      });
      if (adminExist) return;
      const user = new User();
      user.name = adminName;
      user.email = adminEmail;
      user.password_hash = hashSync(adminPassword, 10);
      user.admin = true;
      const savedUser = await this.userRepo.save(user);
      console.log(savedUser);
    } catch (error) {
      console.log(error);
    }
  }
}
