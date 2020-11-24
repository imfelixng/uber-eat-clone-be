import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { IsBoolean, IsNotEmpty, IsOptional, IsString, Length, Min } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@InputType({ isAbstract: true }) // Make abstract to extending in DTO
@ObjectType() // GraphQL
@Entity() //TypeOrm
export class Restaurant {

    @Field(type => Int)
    @PrimaryGeneratedColumn()
    id: number;
    
    @Field(type => String)
    @Column()
    @IsString()
    @Length(5)
    name: string;

    @Field(type => Boolean, {  defaultValue: true })
    @Column({ default: true })
    @IsBoolean()
    @IsOptional()
    isVegan: boolean;

    @Field(type => String)
    @Column()
    @IsString()
    @IsNotEmpty()
    address: string;

    @Field(type => String)
    @Column()
    @IsString()
    @IsNotEmpty()
    ownersName: string;

    @Field(type => String, {  nullable: true })
    @Column({ nullable: true })
    @IsString()
    @IsOptional()
    categoryName?: string;
}