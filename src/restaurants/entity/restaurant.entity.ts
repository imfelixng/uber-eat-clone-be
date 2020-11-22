import { Field, ObjectType } from "@nestjs/graphql";
import { IsBoolean, IsString, Length, MaxLength, MinLength } from "class-validator";


@ObjectType()
export class Restaurant {

    @Field(type => String)
    name: string;

    @Field(type => Boolean)
    isVegan?: boolean;

    @Field(type => String)
    address: string;

    @Field(type => String)
    ownersName: string;

}