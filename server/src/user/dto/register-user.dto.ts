import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty({ message: 'Name field should not be empty.' })
  @IsString({ message: 'Name must be string.' })
  name: string;

  @IsNotEmpty({ message: 'Email should not be empty.' })
  @IsEmail({}, { message: 'Email must be an email.' })
  email: string;

  @IsNotEmpty({ message: 'Email should not be empty.' })
  @IsString({ message: 'Password must be string.' })
  password: string;

  @IsBoolean({ message: 'Value must be true or false.' })
  remember: boolean;
}
