import { Query, Resolver } from "@nestjs/graphql";
import { UserService } from "./users.service";
import { User } from "./enities/user.entity";

@Resolver(of => User)
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Query(returns => [User])
    users(): User[] {
        return [];
    }
}