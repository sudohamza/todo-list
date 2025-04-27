import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Response } from 'express';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(
    @Body() body: CreateTodoDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.todoService.create(body, response);
  }

  @Get()
  findAll(@Res({ passthrough: true }) response: Response) {
    return this.todoService.findAll(response);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateTodoDto) {
    return this.todoService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(id);
  }
}
