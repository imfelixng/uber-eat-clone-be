import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction } from "express";
import { JwtService } from 'src/jwt/jwt.service';
import { UserService } from "src/users/users.service";

// export const jwtMiddleware = (req: Request, res: Response, next: NextFunction): void => {
//     console.log(req.headers);
//     next();
// }

@Injectable()
export class JwtMiddleware implements NestMiddleware{
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService
    ) {}

    async use(req: Request, res: Response, next: NextFunction): Promise<void> {
        if ('x-jwt' in req.headers) {
            const token = req.headers['x-jwt'];
            const decoded = this.jwtService.verify(token);
            if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
                try {
                    const { user } = await this.userService.findById(decoded['id']);
                    req['user'] = user;
                } catch (e) {
                    console.log(e);
                }
            }
        }
        next();
    }
}