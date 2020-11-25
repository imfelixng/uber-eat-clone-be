import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from "@nestjs/common";
import { Repository } from 'typeorm';
import { User } from './enities/user.entity';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly users: Repository<User>) {}
}