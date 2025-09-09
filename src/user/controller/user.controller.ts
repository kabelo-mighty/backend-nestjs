import { Controller, Get, NotFoundException, Param, ParseIntPipe } from '@nestjs/common';
import { User } from '../user.entity';
import { UserService } from '../user.service';


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

  
}