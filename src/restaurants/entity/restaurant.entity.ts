import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType() // GraphQL
@Entity() //TypeOrm
export class Restaurant {

    @Field(type => Int)
    @PrimaryGeneratedColumn()
    id: number;
    
    @Field(type => String)
    @Column()
    name: string;

    @Field(type => Boolean)
    @Column()
    isVegan?: boolean;

    @Field(type => String)
    @Column()
    address: string;

    @Field(type => String)
    @Column()
    ownersName: string;

    @Field(type => String)
    @Column()
    categoryName: string;

}