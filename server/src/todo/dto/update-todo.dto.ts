import { IsBoolean } from 'class-validator';

export class UpdateTodoDto {
  @IsBoolean({ message: 'Value must be true or false.' })
  done: boolean;
}
