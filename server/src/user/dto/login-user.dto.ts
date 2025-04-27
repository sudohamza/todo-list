import {
  IsBoolean,
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty({ message: 'Email should not be empty.' })
  @IsEmail({}, { message: 'Email must be an email.' })
  email: string;

  @IsNotEmpty({ message: 'Password should not be empty.' })
  @IsString({ message: 'Password must be string.' })
  password: string;

  @IsBoolean({ message: 'Value must be true or false.' })
  remember: boolean;
}
