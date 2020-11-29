import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";

import { UserService } from "./users.service";
import { User } from "./enities/user.entity";
import { CreateAccountInput, CreateAccountOutput } from "./dtos/create-account.dto";
import { LoginInput, LoginOutput } from "./dtos/login.dto";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";
import { AuthUser } from "src/auth/auth-user.decorator";

@Resolver(of => User)
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Query(returns => [User])
    users(): User[] {
        return [];
    }

    @Query(returns => User)
    @UseGuards(AuthGuard)
    me(@AuthUser() authUser: User): User {
        return authUser;
    }

    @Mutation(returns => CreateAccountOutput)
    async createAccount(@Args('input') createAccountInput: CreateAccountInput): Promise<CreateAccountOutput> {
        try {
            return await this.userService.createAccount(createAccountInput);
        } catch(error) {
            return { ok: false, error }
        }
    }

    @Mutation(returns => LoginOutput)
    async login(@Args('input') loginInput: LoginInput): Promise<LoginOutput> {
        try {
            return await this.userService.login(loginInput);
        } catch(error) {
            return { ok: false, error }
        }
    }
}