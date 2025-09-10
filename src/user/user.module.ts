import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { user_information } from './user.entity';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { UserController } from './controller/user.controller';
@Module({
    imports: [TypeOrmModule.forFeature([user_information])],
    providers: [UserService, UserResolver],
    controllers: [UserController],
})
export class UserModule { }