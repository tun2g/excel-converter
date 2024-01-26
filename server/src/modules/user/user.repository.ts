import { DataSource, EntityRepository, FindOptionsWhere, Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { Injectable } from "@nestjs/common";

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    
    constructor(private dataSource: DataSource)
    {
        super(User, dataSource.createEntityManager());
    }

    async findUserByEmailWithRoles(
        email: string
    ){
        const users = await this.query(
            `
            SELECT *
            FROM users
            WHERE users.email = $1;
            `,
            [email]
        )
        if(users.length === 0){
            return null;
        }
        const user = users[0];
        const userRoles = await this.query(
            `SELECT roles."id" AS "id", roles.name AS "name"
            FROM roles
                LEFT JOIN user_roles ON roles.id = user_roles."roleId" AND user_roles."userId" = $1
            `,
            [user.id]
        )
        user.roles = userRoles;
        return user;
    }
    
}