import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
   import { UserService } from './service/user.service';
   import { user_information } from './user.entity';
   import { CreateUserInput } from './dto/create-user.input';

   @Resolver(of => user_information)
   export class UserResolver {
     constructor(private readonly userService: UserService) {}

     @Query(returns => [user_information])
     users() {
       return this.userService.findAll();
     }

     @Query(returns => user_information)
     user(@Args('id', { type: () => Int }) id: number) {
       return this.userService.findOne(id);
     }

     @Mutation(returns => user_information)
     createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
       return this.userService.create(createUserInput);
     }

     @Mutation(returns => user_information)
     updateUser(
       @Args('id', { type: () => Int }) id: number,
       @Args('updateUserInput') updateUserInput: CreateUserInput,
     ) {
       return this.userService.update(id, updateUserInput);
     }

     @Mutation(returns => Boolean)
     async deleteUser(@Args('id', { type: () => Int }) id: number) {
       await this.userService.delete(id);
       return true;
     }
   }
