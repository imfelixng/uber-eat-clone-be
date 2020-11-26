import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './enities/user.entity';
import { UserService } from './users.service';
import { UserResolver } from './users.resolver';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [TypeOrmModule.forFeature([User]), ConfigService],
    providers: [UserResolver, UserService]
})
export class UserModule {}
