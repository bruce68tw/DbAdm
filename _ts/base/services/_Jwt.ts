//Web不會用到JWT
import _Fun from "./_Fun";

export default class _Jwt {

    /*
    //??
    //get header json object for jwt
    static jsonAddJwtHeader(json: Json): void {
        if (_Fun.jwtToken)
            json.headers = _Jwt.getJwtAuth();
    }

    static getJwtAuth(): { 'Authorization': string } {
        return {
            'Authorization': _Jwt.getJwtBearer()
        };
    }

    static getJwtBearer(): string {
        return 'Bearer ' + _Fun.jwtToken;
    }
    */
} //class