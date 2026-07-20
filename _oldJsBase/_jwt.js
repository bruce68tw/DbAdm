
var _jwt = {

    //??
    //get header json object for jwt
    jsonAddJwtHeader: function (json) {
        if (_fun.jwtToken)
            json.headers = _jwt.getJwtAuth();
    },

    getJwtAuth: function () {
        return {
            'Authorization': _jwt.getJwtBearer()
        };
    },

    getJwtBearer: function () {
        return 'Bearer ' + _fun.jwtToken;
    },

}; //class