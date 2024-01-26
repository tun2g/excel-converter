import { NestMiddleware, Injectable, ForbiddenException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtService } from '../jwt/jwt.service';
import { UserService } from 'src/modules/user/user.service';
import { TokenType } from '../constants';
import { RoleType } from 'src/lib/constants';
import { RoleService } from 'src/modules/role/role.service';

/** The AuthMiddleware is used to
 * (1) read the request header bearer token/user access token
 * (2) decrypt the access token to get the user object
 */
@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly roleService: RoleService
    ) {}

    async use(req: Request | any, res: Response, next: () => void) {
        const bearerHeader = req.headers.authorization;
        const accessToken = bearerHeader && bearerHeader.split(' ')[1];
        let user;
        let roles;

        if (!bearerHeader || !accessToken || bearerHeader.split(' ')[0] !== 'Bearer') {
            const nonUserRole = await this.roleService.findOneOrCreate(RoleType.NON_USER);
            const ipAddress = req.connection.remoteAddress || req.ip;
            req.ipAddress = ipAddress; 
            req.roles = [nonUserRole];
            return next();
        }

        try {
            const isValidToken  = await this.jwtService.verifyToken(
                accessToken,
                TokenType.ACCESS_TOKEN,
                RoleType.USER,
            );
            if (!isValidToken.isVerified){
                throw new ForbiddenException("Invalid token")
            }
            
            user = await this.userService.findOneUserWithRoles(isValidToken.user.email);
            roles = user.roles
        } catch (error) {
            throw new UnauthorizedException('Please register or sign in.');
        }
        
        if (user) {
            req.user = user;
            req.roles = roles;
        }
        next();
    }
}
