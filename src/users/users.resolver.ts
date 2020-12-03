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
    async userProfile(@Args() userProfileInput: UserProfileInput): Promise<UserProfileOutput> {
        try {
            const user = await this.userService.findById(userProfileInput.userId);

            if (!user) throw Error();

            return {
                ok: true,
                user,
            }
        } catch (e) {
            return {
                error: 'User not found!',
                ok: false,
            }
        }
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

    @Mutation(returns => EditProfileOutput)
    @UseGuards(AuthGuard)
    async editProfile(
        @AuthUser() authUser: User,
        @Args('input') editProfileInput: EditProfileInput
    ): Promise<EditProfileOutput> {
        try {
            await this.userService.editProfile(authUser.id, editProfileInput);
            return { ok: true }
        } catch(error) {
            return { ok: false, error }
        }
    }

    @Mutation(returns => VerifyEmailOutput)
    async verifyEmail(@Args('input') verifyEmailInput: VerifiyEmailInput): Promise<VerifyEmailOutput>{
        try {
            const result = await this.userService.verifyEmail(verifyEmailInput.code);
            return {
                ok: result
            }
        } catch(error) {
            return { ok: false, error }
        }
    }

}