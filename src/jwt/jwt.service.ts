import { Inject, Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';

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
}
