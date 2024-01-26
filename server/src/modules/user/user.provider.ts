import { UserRepository } from "./user.repository";

export const UserProviders = [
    {
        provide: 'UserRepository',
        useClass: UserRepository
    },
]