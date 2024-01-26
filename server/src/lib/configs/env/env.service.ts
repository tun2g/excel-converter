import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as process from "process"

@Injectable()
export class EnvVariableService{
    
    private envVars;
    
    constructor(
        private readonly configService: ConfigService,
    ){

    }

    getEnv(){
        if(!this.envVars){
            this.envVars = {
                nodeEnv: process.env.NODE_ENV,
                db :{
                    type: this.configService.get<string>('DATABASE_TYPE'),
                    host: this.configService.get<string>('DATABASE_HOST'),
                    port: this.configService.get<number>('DATABASE_PORT') || 5432,
                    username: this.configService.get<string>('DATABASE_USERNAME'),
                    password: this.configService.get<string>('DATABASE_PASSWORD'),
                    database: this.configService.get<string>('DATABASE_NAME'),
                },
                redis:{
                    host: this.configService.get<string>('REDIS_HOST'),
                    port: this.configService.get<string>('REDIS_PORT'),
                    username: this.configService.get<string>('REDIS_USER_NAME'),
                    password: this.configService.get<string>('REDIS_PASSWORD'),   
                },
                auth:{
                    accessTokenSecret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
                    accessTokenExpirationTime: this.configService.get<string>('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
                    refreshTokenSecret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
                    refreshTokenExpirationTime: this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRATION_TIME'),
                },
                tokenUsage:{
                    user: this.configService.get<number>('USER_TOKEN_USAGE'),
                    nonUser: this.configService.get<number>('NON_USER_TOKEN_USAGE'),
                },
            }
        }
        return this.envVars;
    }
}