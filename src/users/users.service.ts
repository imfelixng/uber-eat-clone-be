import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from "@nestjs/common";
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';

import { User } from './enities/user.entity';
import { CreateAccountInput } from './dtos/create-account.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly users: Repository<User>,
        private readonly config: ConfigService
        ) { }

    async createAccount({ email, password, role }: CreateAccountInput): Promise<{ ok: boolean, error?: string }> {
        try {
            const exists = await this.users.findOne({ email });
            if (exists) {
                return {
                    ok: false,
                    error: "There is a user with tha email already"
                }
            }

            await this.users.save(this.users.create({ email, password, role }));
            return { ok: true };
        } catch (e) {
            return {
                ok: false,
                error: "Couldn't create account"
            };
        }
    }

    async login({ email, password }: LoginInput): Promise<LoginOutput> {
        try {
            const user = await this.users.findOne({ email });
            if (!user) {
                throw new Error('User not found!');
            }

            const passwordCorrect = await user.checkPassword(password);
            if (!passwordCorrect) {
                throw new Error('Wrong password!');
            }

            const token = jwt.sign({ id: user.id }, this.config.get('SECRET_KEY'));

            return {
                ok: true,
                error: null,
                token
            }

        } catch (e) {
            return {
                ok: false,
                error: e,
            }
        }
    }
}