import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";

import { UserService } from "./users.service";
import { User } from "./enities/user.entity";
import { CreateAccountInput, CreateAccountOutput } from "./dtos/create-account.dto";

@Resolver(of => User)
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Query(returns => [User])
    users(): User[] {
        return [];
    }

    @Mutation(returns => CreateAccountOutput)
    async createAccount(@Args('input') createAccountInput: CreateAccountInput): Promise<CreateAccountOutput> {
        try {
            return await this.userService.createAccount(createAccountInput);
        } catch(error) {
            return { ok: false, error }
        }
    }
}