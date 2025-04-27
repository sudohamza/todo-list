import {
  MiddlewareConsumer,
  OnApplicationBootstrap,
  Module,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { AuthMiddleware } from './utils/auth-middleware';
import { UserModule } from './user/user.module';
import { DataBaseModule } from './db/database.module';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { SeederService } from './seeder.service';

@Module({
  imports: [DataBaseModule, UserModule, TodoModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, JwtService, SeederService],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(private readonly seederService: SeederService) {}

  async onApplicationBootstrap() {
    await this.seederService.seedAdminUser();
  }

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'auth/login', method: RequestMethod.POST },
        { path: 'auth/register', method: RequestMethod.POST },
        { path: 'auth/logout', method: RequestMethod.GET },
      )
      .forRoutes('*');
  }
}
