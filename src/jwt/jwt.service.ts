import { Inject, Injectable } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';
import { CONFIG_OPTIONS } from 'src/common/common.constants';

import { JwtModuleOptions } from './jwt.interfaces';

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
