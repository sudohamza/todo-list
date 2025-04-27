import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from 'src/todo/entities/todo.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({ isGlobal: true, envFilePath: '.private.env' }),
      ],
      useFactory: (configService: ConfigService) => ({
        type: 'mongodb',
        url: configService.get('MONGO_URL_LOCAL'),
        entities: [User, Todo],
        database: configService.get('MONGO_DB_NAME'),
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User]),
  ],
  exports: [TypeOrmModule],
})
export class DataBaseModule {}
