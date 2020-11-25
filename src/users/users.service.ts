import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from "@nestjs/common";
import { Repository } from 'typeorm';
import { User } from './enities/user.entity';
import { CreateAccountInput } from './dtos/create-account.dto';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly users: Repository<User>) {}

    async createAccount({ email, password, role }: CreateAccountInput): Promise<{ok: boolean, error?: string}>{
        try {
            const exists = await this.users.findOne({ email });
            if (exists) {
                return {
                    ok: false,
                    error: "There is a user with tha email already"
                }
            }

            await this.users.save(this.users.create({email, password, role }));
            return {ok: true};
        } catch(e) {
            return {
                ok: false,
                error: "Couldn't create account"
            };
        }
    }
}