import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { UserController } from './controller/user.controller';
@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UserService, UserResolver],
    controllers: [UserController],
})
export class UserModule { }