import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { FindOptionsWhere, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { RegisterUserDto } from '../auth/dtos/register-user.dto';
import { generateHash } from 'src/lib/utils';
import { AuthProviderType } from 'src/security/constants';
import { RoleType } from 'src/lib/constants';
import { UserRole } from './entities/user-role.entity';
import { RoleService } from '../role/role.service';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        
        @InjectRepository(UserRole)
        private readonly userRoleRepository: Repository<UserRole>,

        private readonly roleService: RoleService
    ){

    }

    async createNewUser(
        registerDto: RegisterUserDto, 
        roleType: RoleType
    ){
        const hashedPassword = generateHash(registerDto.password);
        
        const newUser :any=  await this.userRepository.save(this.userRepository.create({
            username: registerDto.username,
            email: registerDto.email,
            hashedPassword,
            authProvider: AuthProviderType.DEFAULT,
            isActive: true
        }))

        const userRole = await this.roleService.findOneOrCreate(roleType);

        this.userRoleRepository.insert({
            userId: newUser.id,
            roleId: userRole.id
        })
        newUser.roles = [userRole]
        return newUser;
    }

    async findOne(data: FindOptionsWhere<User>): Promise<User> {
        return this.userRepository.findOne({
          where: data,
        });
    }

    async findOneUserWithRoles(email: string){
        return this.userRepository.findUserByEmailWithRoles(email);
    }

}
