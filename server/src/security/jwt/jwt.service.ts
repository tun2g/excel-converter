import { Injectable } from "@nestjs/common";
import { sign, verify } from "jsonwebtoken"
import { TokenType } from "../constants";
import { EnvVariableService } from "src/lib/configs/env/env.service";

@Injectable()
export class JwtService {
    constructor(
        private envService: EnvVariableService
    ) { }

    async generateToken(tokenType: TokenType, user :any, roleName: string): Promise<string> {
        let expiresIn: string = this.envService.getEnv().auth.accessTokenExpirationTime;
        let secretKey : string = this.envService.getEnv().auth.accessTokenSecret;
        if(tokenType === TokenType.REFRESH_TOKEN){
            expiresIn = this.envService.getEnv().auth.refreshTokenExpirationTime;
            secretKey = this.envService.getEnv().auth.refreshTokenSecret;
        }
        const payload = {
            userId: user.id,
            email: user.email,
            roleName: roleName,
            tokenType: tokenType, 
        }
        return await sign(payload, secretKey, {expiresIn});
    }

    async verifyToken(token: string, tokenType: TokenType, roleName: string): Promise<any> {
        try {
            let secretKey : string = tokenType === TokenType.REFRESH_TOKEN 
                                    ? this.envService.getEnv().auth.refreshTokenSecret
                                    : this.envService.getEnv().auth.accessTokenSecret;
            const verified = await verify(token, secretKey);
            if (verified.tokenType === tokenType&& roleName === verified.roleName) {
                return {
                    isVerified: true,
                    user: {
                        email: verified.email,
                        id: verified.userId
                    }
                };
            }
            return {isVerified: false};
        } catch (error) {
            return {isVerified: false};
        }

    }

}