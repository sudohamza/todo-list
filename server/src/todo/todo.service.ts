import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Response } from 'express';
import { handleExceptions } from 'src/utils/handle-exceptions';
import { Todo } from './entities/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private readonly todoRepo: Repository<Todo>,
  ) {}

  async create(body: CreateTodoDto, response: Response) {
    try {
      const todo = new Todo();
      todo.title = body.title;
      todo.done = false;
      todo.userId = response.locals.user._id;
      if (body.description) todo.description = body.description;
      const savedTodo = await this.todoRepo.save(todo);
      return savedTodo;
    } catch (error) {
      handleExceptions(error, 'Something went wrong while creating todo.');
    }
  }

  async findAll(response: Response) {
    try {
      const user = response.locals.user;
      if (user.admin) {
        return await this.todoRepo.find();
      } else {
        return await this.todoRepo.find({ where: { userId: user._id } });
      }
    } catch (error) {
      handleExceptions(error, 'Something went wrong while fetching todos.');
    }
  }

  async update(id: string, body: UpdateTodoDto) {
    try {
      const todo = await this.todoRepo.findOne({
        where: { _id: new ObjectId(id) },
      });
      if (!todo) {
        throw new Error('Todo not found');
      }
      todo.done = body.done;
      const updatedTodo = await this.todoRepo.save(todo);
      return updatedTodo;
    } catch (error) {
      handleExceptions(error, 'Something went wrong while updating the todo.');
    }
  }

  async remove(id: string) {
    try {
      const todo = await this.todoRepo.findOne({
        where: { _id: new ObjectId(id) },
      });
      if (!todo) {
        throw new Error('Todo not found');
      }
      await this.todoRepo.remove(todo);
      return { message: 'Todo successfully removed' };
    } catch (error) {
      handleExceptions(error, 'Something went wrong while removing the todo.');
    }
  }
}
