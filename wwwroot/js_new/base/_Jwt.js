import _Fun from "./_Fun";
export default class _Jwt {
    //??
    //get header json object for jwt
    static jsonAddJwtHeader(json) {
        if (_Fun.jwtToken)
            json.headers = _Jwt.getJwtAuth();
    }
    static getJwtAuth() {
        return {
            'Authorization': _Jwt.getJwtBearer()
        };
    }
    static getJwtBearer() {
        return 'Bearer ' + _Fun.jwtToken;
    }
} //class
//# sourceMappingURL=../../../_tsBase/wwwroot/map/base/_Jwt.js.map