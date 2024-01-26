import { Injectable, Logger } from '@nestjs/common';
import { RegisterUserDto } from './dtos/register-user.dto';
import { CustomBadRequestException } from 'src/lib/exceptions/bad-request';
import { UserService } from '../user/user.service';
import { AuthProviderType, TokenType } from 'src/security/constants';
import { JwtService } from 'src/security/jwt/jwt.service';
import { RoleType } from 'src/lib/constants';
import { AuthResponse } from './responses/auth.response';
import { LoginUserDto } from './dtos/login-user.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {

    private readonly logger = new Logger(AuthService.name);

    constructor(
        readonly userService: UserService,
        readonly jwtService: JwtService,
    ){

    }

    async registerUser(
        registerUserDto: RegisterUserDto, roleType: RoleType
    ){
        try {
            const newUser : any = await this.userService.createNewUser(registerUserDto, roleType);
            const {accessToken, refreshToken} = await this.assignTokens(newUser, roleType);
            
            const authReponse : AuthResponse= {
                username: newUser.username,
                email: newUser.email,
                userId: newUser.id,
                isActive: newUser.isActive,
                authProvider: AuthProviderType.DEFAULT, 
                refreshToken: refreshToken,
                accessToken: accessToken,
                roles: newUser.roles
            } 
            return authReponse;
        } catch (error) {
            throw new CustomBadRequestException({details: [
                { message: error.message }
            ]});  
        }
    }

    async loginUser(
        loginUser: LoginUserDto,
    ){
        try {
            const user : any = await this.userService.findOneUserWithRoles(loginUser.email);
            
            const {accessToken, refreshToken } = await this.assignTokens(user, RoleType.USER);
            const authReponse : AuthResponse= {
                username: user.username,
                email: user.email,
                userId: user.id,
                isActive: user.isActive,
                authProvider: AuthProviderType.DEFAULT, 
                refreshToken: refreshToken,
                accessToken: accessToken,
                roles: user.roles
            } 
            return authReponse;
        } catch (error) {
            throw new CustomBadRequestException({details: [
                { message: error.message }
            ]}); 
        }
    }

    async assignTokens(user: User, roleName: string) {
        const accessToken = await this.jwtService.generateToken(
            TokenType.ACCESS_TOKEN,
            user,
            roleName,
        );
        const refreshToken = await this.jwtService.generateToken(
            TokenType.REFRESH_TOKEN,
            user,
            roleName,
        );

        return {
            accessToken,
            refreshToken,
        };
    }

}
