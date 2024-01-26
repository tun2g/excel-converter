import {
    IsEmail,
    IsString,
    Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/modules/user/entities/user.entity';
import { IsExistField } from 'src/lib/validators';

export class LoginUserDto {
    
    @IsEmail({},{message: "Invalid email address"})
    @IsExistField([ User, (validationArguments) => ({ email: validationArguments.value })])
    @ApiProperty()
    readonly email: string;

    @IsString()
    @Matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 
        {message: 'Password too weak'}
    )
    @ApiProperty()
    password: string;
}