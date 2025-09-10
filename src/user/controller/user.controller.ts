import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { user_information } from '../user.entity';
import { UserService } from '../service/user.service';
import { CreateUserDto } from '../dto/createUserDto';


@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

@Get()
async findAll(): Promise<user_information[]> {
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
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<user_information> {
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
async createUser(@Body() createUserDto: CreateUserDto): Promise<{ message: string; user: user_information }> {
  try {
    const user = await this.userService.create(createUserDto);
    return { message: 'User successfully created', user };
  } catch (error) {
    throw new BadRequestException('An error occurred while creating the user');
  }
}
@Put(':id')
async updateUser(
  @Param('id', ParseIntPipe) id: number,
  @Body() updateUserDto: Partial<CreateUserDto>,
): Promise<{ message: string; user: user_information }> {
  try {
    const existingUser = await this.userService.findOne(id);
    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    const updatedUser = await this.userService.update(id, updateUserDto);
    return { message: `User with ID ${id} successfully updated`, user: updatedUser };
  } catch (error) {
    throw new BadRequestException(`An error occurred while updating the user with ID ${id}`);
  }
}
}