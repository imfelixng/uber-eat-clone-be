import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { string as JoiString, object as JoiObject } from 'joi';

import { UserModule } from './users/users.module';
import { CommonModule } from './common/common.module';
import { User } from './users/enities/user.entity';
import { JwtModule } from './jwt/jwt.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
      validationSchema: JoiObject({
        NODE_ENV: JoiString().valid('dev', 'prod'),
        DB_HOST: JoiString().required(),
        DB_PORT: JoiString().required(),
        DB_USERNAME: JoiString().required(),
        DB_PASSWORD: JoiString().required(),
        DB_NAME: JoiString().required(),
        PRIVATE_KEY: JoiString().required()
      })
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: process.env.NODE_ENV !== 'prod',
      logging: true,
      entities: [User],
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    UserModule,
    CommonModule,
    JwtModule.forRoot({
        privateKey: process.env.PRIVATE_KEY
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
