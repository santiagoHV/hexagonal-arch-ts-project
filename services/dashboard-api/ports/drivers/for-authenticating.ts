export interface AuthenticatedUser {
    id: string;
    email: string;
    password: string;
    token: string;
    refreshToken: string;
}

export type User = Pick<AuthenticatedUser, 'email' | 'password'>;

export interface ForAuthenticating {
    login: (email: string, password: string) => Promise<AuthenticatedUser>;
    register: (user: User, password: string) => Promise<AuthenticatedUser>;
}