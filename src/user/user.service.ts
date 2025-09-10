import { Injectable } from '@nestjs/common';
   import { InjectRepository } from '@nestjs/typeorm';
   import { Repository } from 'typeorm';
   import { user_information } from './user.entity';

   @Injectable()
   export class UserService {
     constructor(
       @InjectRepository(user_information)
       private usersRepository: Repository<user_information>,
     ) {}

     findAll(): Promise<user_information[]> {
       return this.usersRepository.find();
     }

     findOne(id: number): Promise<user_information> {
       return this.usersRepository.findOneBy({ user_id: id });
     }

     async create(createUserDto: Partial<user_information>): Promise<user_information> {
           return this.usersRepository.save(createUserDto);
       }

     async update(id: number, user: Partial<user_information>): Promise<user_information> {
       await this.usersRepository.update(id, user);
       return this.usersRepository.findOneBy({ user_id: id });
     }

     async delete(id: number): Promise<void> {
       await this.usersRepository.delete(id);
     }
   }