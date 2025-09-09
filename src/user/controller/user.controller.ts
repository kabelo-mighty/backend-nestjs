import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post } from '@nestjs/common';
import { User } from '../user.entity';
import { UserService } from '../user.service';
import { CreateUserDto } from '../dto/createUserDto';


@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

@Get()
async findAll(): Promise<User[]> {
  try {
    const users = await this.userService.findAll();
    if (!users || users.length === 0) {
      throw new NotFoundException('No users found');
    }
    return users;
  } catch (error) {
    throw new NotFoundException('An error occurred while fetching users');
  }
}

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }
@Delete(':id')
async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
  try {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await this.userService.delete(id);
    return { message: `User with ID ${id} has been successfully deleted` };
  } catch (error) {
    throw new NotFoundException(`An error occurred while deleting the user with ID ${id}`);
  }
}

@Post()
async createUser(@Body() createUserDto: CreateUserDto): Promise<{ message: string; user: User }> {
  try {
    const user = await this.userService.create(createUserDto);
    return { message: 'User successfully created', user };
  } catch (error) {
    throw new BadRequestException('An error occurred while creating the user');
  }
}
}