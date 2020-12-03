import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from "@nestjs/common";
import { Repository } from 'typeorm';


import { User } from './enities/user.entity';
import { CreateAccountInput, CreateAccountOutput } from './dtos/create-account.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { JwtService } from 'src/jwt/jwt.service';
import { EditProfileInput } from './dtos/edit-profile.dto';
import { Verification } from './enities/verification.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly users: Repository<User>,
        @InjectRepository(Verification) private readonly verifications: Repository<Verification>,
        private readonly jwtService: JwtService
    ) {}

    async createAccount({ email, password, role }: CreateAccountInput): Promise<CreateAccountOutput> {
        try {
            const exists = await this.users.findOne({ email });
            if (exists) {
                return {
                    ok: false,
                    error: "There is a user with the email already"
                }
            }

            const user = await this.users.save(this.users.create({
                email,
                password,
                role
            }));

            await this.verifications.save(this.verifications.create({
                user
            }));
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
            const user = await this.users.findOne({ email }, { select: ['id', 'password'] });
            if (!user) {
                throw new Error('User not found!');
            }

            const passwordCorrect = await user.checkPassword(password);
            if (!passwordCorrect) {
                throw new Error('Wrong password!');
            }

            const token = this.jwtService.sign(user.id);
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

    async findById(id: number ): Promise<User> {
        return this.users.findOne({id});
    }

    async editProfile(userId: number, { email, password }: EditProfileInput): Promise<User> {
        const user = await this.users.findOne({ id: userId });

        if (email) {
            user.email = email;
            user.verified = false;
            await this.verifications.save(this.verifications.create({
                user
            }));
        }
        if (password) {
            user.password = password;
        }

        return this.users.save(user);
    }

    async verifyEmail(code: string): Promise<boolean> {
        const verification = await this.verifications.findOne({ code }, { relations: ['user'] });
        if (verification) {
            verification.user.verified = true;
            this.users.save(verification.user);
            return true;
        }
        return false;
    }
}