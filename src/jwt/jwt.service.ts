import { Inject, Injectable } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';

import { JwtModuleOptions } from './jwt.interfaces';
import { CONFIG_OPTIONS } from './jwt.contants';

@Injectable()
export class JwtService {
    constructor(
        @Inject(CONFIG_OPTIONS) private readonly options: JwtModuleOptions
    ) {}
    
    sign(userID: number): string {
        return sign({ id: userID }, this.options.privateKey);
    }

    verify(token: string): string | {[x: string]: any} {
        return verify(token, this.options.privateKey);
    }
}
