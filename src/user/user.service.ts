import { Injectable } from '@nestjs/common';
   import { InjectRepository } from '@nestjs/typeorm';
   import { Repository } from 'typeorm';
   import { User } from './user.entity';

   @Injectable()
   export class UserService {
     constructor(
       @InjectRepository(User)
       private usersRepository: Repository<User>,
     ) {}

     findAll(): Promise<User[]> {
       return this.usersRepository.find();
     }

     findOne(id: number): Promise<User> {
       return this.usersRepository.findOneBy({ id });
     }

     async create(createUserDto: Partial<User>): Promise<User> {
           return this.usersRepository.save(createUserDto);
       }

     async update(id: number, user: Partial<User>): Promise<User> {
       await this.usersRepository.update(id, user);
       return this.usersRepository.findOneBy({ id });
     }

     async delete(id: number): Promise<void> {
       await this.usersRepository.delete(id);
     }
   }