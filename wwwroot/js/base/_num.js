
//數字相關
var _num = {
    //是否為數字而且大於(等於)0
    //zeor: 可否為0
    isBigZero: function (value, zero) {
        if (isNaN(value))
            return false;
        else if (!zero && (value === '0' || value === 0)) 
            return false;
        else if (parseInt(value) < 0)
            return false;
        else
            return true;
    },

    isNum: function (value) {
        return !isNaN(value);
    },

    toBool: function (value) {
        return (value === 1);
    },

    rowToBool: function (row, fids) {
        for (var i = 0; i < fids.length; i++) {
            var fid = fids[i];
            row[fid] = _num.toBool(row[fid]);
        }
        return row;
    },

    //http://www.mredkj.com/javascript/numberFormat.html
    addComma: function (str) {
        str += '';
        x = str.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return x1 + x2;
    },

};//class
