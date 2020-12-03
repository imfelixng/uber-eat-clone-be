import { InputType, ObjectType, PickType } from "@nestjs/graphql";
import { MutationOutput } from "src/common/dtos/output.dto";
import { Verification } from "../enities/verification.entity";

@InputType()
export class VerifiyEmailInput extends PickType(Verification, ['code']) {

}

@ObjectType()
export class VerifyEmailOutput extends MutationOutput {

}