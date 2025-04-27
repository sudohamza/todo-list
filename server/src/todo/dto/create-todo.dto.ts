import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty({ message: 'Title should not be empty.' })
  title: string;

  @IsOptional()
  description?: string;

  @IsBoolean({ message: 'Value must be true or false.' })
  done: boolean;
}
