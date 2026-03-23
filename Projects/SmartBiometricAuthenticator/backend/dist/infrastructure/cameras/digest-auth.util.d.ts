export declare function parseDigestChallenge(wwwAuthenticate: string): Record<string, string>;
export declare function buildDigestAuthorizationHeader(method: string, requestUri: string, username: string, password: string, wwwAuthenticate: string): string | null;
