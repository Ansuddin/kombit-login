
export const requestHeader = (state: any) => {
    const token = state.auth.accessToken
    const organization = state.userConfig.selectedOrganization
    let requestHeaders = new Headers();
    requestHeaders.append("Content-Type", "application/json; charset=UTF-8");
    requestHeaders.append("Authorization", "Bearer " + token);
    if (organization && organization.id) {
        requestHeaders.append("Organization", organization.id);
    }
    return requestHeaders
}

