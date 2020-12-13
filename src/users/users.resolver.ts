import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";

import { UserService } from "./users.service";
import { User } from "./enities/user.entity";
import { CreateAccountInput, CreateAccountOutput } from "./dtos/create-account.dto";
import { LoginInput, LoginOutput } from "./dtos/login.dto";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";
import { AuthUser } from "src/auth/auth-user.decorator";
import { UserProfileInput, UserProfileOutput } from "./dtos/user-profile.dto";
import { EditProfileInput, EditProfileOutput } from "./dtos/edit-profile.dto";
import { VerifiyEmailInput, VerifyEmailOutput } from "./dtos/verify-email.dto";

@Resolver(of => User)
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Query(returns => User)
    @UseGuards(AuthGuard)
    me(@AuthUser() authUser: User): User {
        return authUser;
    }

    @Query(returns => UserProfileOutput)
    @UseGuards(AuthGuard)
    userProfile(@Args() userProfileInput: UserProfileInput): Promise<UserProfileOutput> {
        return this.userService.findById(userProfileInput.userId);
    }

    @Mutation(returns => CreateAccountOutput)
    async createAccount(@Args('input') createAccountInput: CreateAccountInput): Promise<CreateAccountOutput> {
        return this.userService.createAccount(createAccountInput);
    }

    @Mutation(returns => LoginOutput)
    async login(@Args('input') loginInput: LoginInput): Promise<LoginOutput> {
        return this.userService.login(loginInput);
    }

    @Mutation(returns => EditProfileOutput)
    @UseGuards(AuthGuard)
    editProfile(
        @AuthUser() authUser: User,
        @Args('input') editProfileInput: EditProfileInput
    ): Promise<EditProfileOutput> {
        return this.userService.editProfile(authUser.id, editProfileInput);
    }

    @Mutation(returns => VerifyEmailOutput)
    verifyEmail(@Args('input') verifyEmailInput: VerifiyEmailInput): Promise<VerifyEmailOutput>{
        return this.userService.verifyEmail(verifyEmailInput.code);
    }

}