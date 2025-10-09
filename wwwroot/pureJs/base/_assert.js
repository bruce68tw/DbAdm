var _assert = {

    echo: function (msg) {
        _error.log('_assert.js ' + msg);
    },

    //find array
    //return index
    inArray: function (value, ary) {
        var find = false;
        for (var item in ary) {
            if (item == value) {
                find = true;
                break;
            }
        }
        if (!find)
            _assert.echo('inArray failed: ' + value);
    },

}; //class