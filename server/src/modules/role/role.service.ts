import { Inject, Injectable } from '@nestjs/common';
import { Role } from './entities/role.entity';
import { RoleType } from 'src/lib/constants';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Role)
        private readonly roleRepositpry : Repository<Role>
    ){

    }

    async findOneOrCreate(name: RoleType){
        let role : any = await this.roleRepositpry.findOne({
            where: {
                name: name
            }
        })
        if(!role){
            role = await this.roleRepositpry.save(this.roleRepositpry.create({
                name: name
            }))
        }
        return role;
    }
}
