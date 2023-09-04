import { DashboardApi } from "./dashboard-api"
import { ControlAuthenticatorStub, RepoQuerierStub } from "../adapters/drivens"
import { AuthenticatorProxyAdapter } from "../adapters/drivers"

const compositionMock = () => {

    const controlAuthenticatorStub = new ControlAuthenticatorStub()
    const repoQuerierStub = new RepoQuerierStub()

    const dashboardApiMock = new DashboardApi(controlAuthenticatorStub, repoQuerierStub)

    const authenticatorProxyAdapter = new AuthenticatorProxyAdapter(dashboardApiMock)

    return {
        authenticatorProxyAdapter
    }
}

export const  { authenticatorProxyAdapter } = compositionMock()


const registerMock = {
    name: 'name',
    email: 'email'
}

authenticatorProxyAdapter.login('email', 'password')
authenticatorProxyAdapter.register(registerMock, 'password')
