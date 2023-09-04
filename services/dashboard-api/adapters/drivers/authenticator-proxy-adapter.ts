import { AuthenticatedUser } from "../../app/schemas";
import { DashboardApi } from "../../app/dashboard-api";
import { ForAuthenticating } from "../../ports/drivers";

export class AuthenticatorProxyAdapter implements ForAuthenticating{
    constructor(
        private readonly dashboardApi: DashboardApi
    ){}

    async login(email: string, password: string): Promise<AuthenticatedUser> {
        return this.dashboardApi.login(email, password)
    }

    async register(user: any, password: string): Promise<AuthenticatedUser> {
        return this.dashboardApi.register(user, password)
    }
}