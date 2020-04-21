export interface AuthResult {
    expiresIn?: number
    expiresAt: number
    accessToken: string
    idToken: string
    idTokenPayload?: any
    name?: string
    isAuthenticated?: boolean
    isFetching?: boolean
}