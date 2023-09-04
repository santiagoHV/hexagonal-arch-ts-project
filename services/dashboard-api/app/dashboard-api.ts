import { AuthenticatedUser, User } from './schemas'
import { ForAuthenticating } from '../ports/drivers'
import { ForControlAuthenticating, ForRepoQuerying } from '../ports/drivens'
export class DashboardApi implements ForAuthenticating{
    constructor(
        private readonly controlAuthenticator: ForControlAuthenticating,
        private readonly repoQueryer: ForRepoQuerying
    ){}

    async login(email: string, password: string): Promise<AuthenticatedUser> {
        const authDetails = await this.controlAuthenticator.getAuthDetails(
            email,
            password
        )

        const permissions = await this.controlAuthenticator.getPermissions(
            email,
            password
        )

        const user = await this.repoQueryer.getUser(email)

        return {
            ...user,
            ...authDetails,
            ...permissions
        }
    }

    async register (user: User, password: string): Promise<AuthenticatedUser>{
        const newUser = await this.repoQueryer.createUser(user, password)
        const authDetails = await this.controlAuthenticator.getAuthDetails(
            newUser.email,
            password
        )
        const permissions = await this.controlAuthenticator.getPermissions(
            newUser.email,
            password
        )

        return {
            ...newUser,
            ...authDetails,
            ...permissions
        }
    }
}