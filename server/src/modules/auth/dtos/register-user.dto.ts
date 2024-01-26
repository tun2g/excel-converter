import {
    IsEmail,
    IsString,
    MaxLength,
    IsNotEmpty,
    Matches,
    MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/modules/user/entities/user.entity';
import { MatchField, UniqueField } from 'src/lib/validators';

export class RegisterUserDto {
    @IsNotEmpty({message: "username not empty"})
    @IsString()
    @MinLength(4,{message: "username must be at least 4 characters"})
    @MaxLength(30,{message: "username must must be less than 30 characters"})
    @ApiProperty()
    readonly username: string;
    
    @IsEmail({},{message: "Invalid email address"})
    @UniqueField([ User, (validationArguments) => ({ email: validationArguments.value }) ])
    @ApiProperty()
    readonly email: string;

    @IsString()
    @Matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 
        {message: 'Password too weak'}
    )
    @ApiProperty()
    password: string;

    @MatchField('password',{
        message:"Passwords do not match", 
        context:{
            error: 'password_not_match'
        }
    })
    @ApiProperty()
    readonly confirmPassword: string;

    @IsString()
    @IsNotEmpty({message:"Fullname is required"})
    @ApiProperty()
    readonly fullname: string;
}