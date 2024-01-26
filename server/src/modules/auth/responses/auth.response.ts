import { ApiProperty } from "@nestjs/swagger";
import { RoleType } from "src/lib/constants";
import { AuthProviderType } from "src/security/constants";

export class AuthResponse {
    @ApiProperty()
    username: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    userId: string;

    @ApiProperty()
    isActive: boolean;

    @ApiProperty()
    authProvider: AuthProviderType; 

    @ApiProperty()
    refreshToken: string;

    @ApiProperty()
    accessToken: string;

    @ApiProperty()
    roles: Array<RoleType>;

}