import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './enities/user.entity';
import { UserService } from './users.service';
import { UserResolver } from './users.resolver';
import { Verification } from './enities/verification.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, Verification])],
    providers: [UserResolver, UserService],
    exports: [UserService]
})
export class UserModule {}
