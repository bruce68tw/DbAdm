import _Fun from './_Fun';

//todo
export interface JwtHeaders {
    Authorization: string;
    [key: string]: string;
}

export default class _Jwt {
    /**
     * get header json object for jwt
     */
    static jsonAddJwtHeader(json: Json): void {
        if (_Fun.jwtToken) {
            json.headers = _Jwt.getJwtAuth();
        }
    }

    static getJwtAuth(): JwtHeaders {
        return {
            'Authorization': _Jwt.getJwtBearer()
        };
    }

    static getJwtBearer(): string {
        return 'Bearer ' + (_Fun.jwtToken || '');
    }
}