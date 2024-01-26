import { DataSource, EntityRepository, Repository } from "typeorm";
import { TokenUsage } from "./entities/token-usage.entity";

@EntityRepository(TokenUsage)
export class TokenUsageRepository extends Repository<TokenUsage>{

    constructor(
        private dataSource: DataSource
    ){
        super(TokenUsage, dataSource.createEntityManager());
    }

    async getUsedTokenToday(usedBy: string) : Promise<number>{
        const tokens : any= await this.query(
            `
            SELECT *
            FROM token_usages AS tu
            WHERE tu."usedBy" = $1 AND DATE_TRUNC('day', tu."createdAt") = CURRENT_DATE;
            `,
            [usedBy]
        )
        return tokens.length
    }


}