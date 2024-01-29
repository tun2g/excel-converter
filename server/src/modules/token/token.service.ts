import { Injectable } from '@nestjs/common';
import { RoleType } from 'src/lib/constants';
import { EnvVariableService } from 'src/lib/configs/env/env.service';
import { TokenUsageRepository } from './token.repository';

@Injectable()
export class TokenService {
    private tokensMap:  { [key in RoleType]: number };
    constructor(
        private readonly tokenUsageRepository: TokenUsageRepository ,
        
        private readonly envVarService: EnvVariableService
    ){
        this.tokensMap = {
            [RoleType.USER] : this.envVarService.getEnv().tokenUsage.user,
            [RoleType.NON_USER]: this.envVarService.getEnv().tokenUsage.nonUser,
            [RoleType.ADMIN] : 0 
        }
    }
    async getUsedTokenToday(usedBy : string){
        const used = await this.tokenUsageRepository.getUsedTokenToday(usedBy);
        const date = new Date();
        return {used, date}
    }

    async useToken(roleType: RoleType, usedBy: string){
        const used = await this.tokenUsageRepository.getUsedTokenToday(usedBy);
        if(used >= this.tokensMap[roleType]){
            return false;
        }

        await this.tokenUsageRepository.save(
            this.tokenUsageRepository.create({usedBy})
        )
        return true;
    }
}
