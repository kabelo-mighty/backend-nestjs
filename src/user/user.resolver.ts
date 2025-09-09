import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
   import { UserService } from './user.service';
   import { User } from './user.entity';
   import { CreateUserInput } from './dto/create-user.input';

   @Resolver(of => User)
   export class UserResolver {
     constructor(private readonly userService: UserService) {}

     @Query(returns => [User])
     users() {
       return this.userService.findAll();
     }

     @Query(returns => User)
     user(@Args('id', { type: () => Int }) id: number) {
       return this.userService.findOne(id);
     }

     @Mutation(returns => User)
     createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
       return this.userService.create(createUserInput);
     }

     @Mutation(returns => User)
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
