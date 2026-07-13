export interface JwtHeaders {
    Authorization: string;
    [key: string]: string;
}
export default class _Jwt {
    /**
     * get header json object for jwt
     */
    static jsonAddJwtHeader(json: Json): void;
    static getJwtAuth(): JwtHeaders;
    static getJwtBearer(): string;
}
