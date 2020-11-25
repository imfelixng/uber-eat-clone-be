import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

// Include all field same in all entities
@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class CoreEntity {

    @Field(type => Number)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(type => Number)
    @CreateDateColumn()
    createdAt: Date;

    @Field(type => Number)
    @UpdateDateColumn()
    updatedAt: Date;
}