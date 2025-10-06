import _Fun from "./_Fun";

export default class _Jwt {

    //??
    //get header json object for jwt
    public static jsonAddJwtHeader(json: { [key: string]: any }): void {
        if (_Fun.jwtToken)
            json.headers = _Jwt.getJwtAuth();
    }

    public static getJwtAuth(): { 'Authorization': string } {
        return {
            'Authorization': _Jwt.getJwtBearer()
        };
    }

    public static getJwtBearer(): string {
        return 'Bearer ' + _Fun.jwtToken;
    }

} //class