import { Column, Entity } from "typeorm";
import { CoreEntity } from "src/common/entities/core.entity";
import { Field, ObjectType } from "@nestjs/graphql";

type UserRole = 'client' | 'owner' | 'delivery';

@ObjectType()
@Entity()
export class User extends CoreEntity{

    @Field(type => String)
    @Column()
    email: string;

    @Field(type => String)
    @Column()
    password: string;

    @Field(type => String)
    @Column()
    role: UserRole;
}