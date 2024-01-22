import { FindOptionsWhere, Repository } from "typeorm";
import { User } from "./entities/user.entity";

export class UserRepository extends Repository<User>{
    
    async findUserByIdWithRoles(
        userId: string
    ){
        await this.query(
            `
            SELECT *
            FROM users
            WHERE userId = $1;
            `,
            [userId]
        )
    }
    
}