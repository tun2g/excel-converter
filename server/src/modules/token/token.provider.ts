import { TokenUsageRepository } from "./token.repository";

export const TokenUsageProviders = [
    {
        provide: 'TokenUsageRepository',
        useClass: TokenUsageRepository
    },
]