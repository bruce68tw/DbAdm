//數字相關
export default class _Num {
    //是否為數字而且大於(等於)0
    //zeor: 可否為0
    static isBigZero(value: any, zero: boolean): boolean {
        if (isNaN(value))
            return false;
        else if (!zero && (value === '0' || value === 0))
            return false;
        else if (parseInt(value) < 0)
            return false;
        else
            return true;
    }

    static isNum(value: any): boolean {
        return !isNaN(value);
    }

    static toBool(value: number): boolean {
        return (value === 1);
    }

    static rowToBool(row: Json, fids: string[]): Json {
        for (let i = 0; i < fids.length; i++) {
            const fid = fids[i];
            row[fid] = _Num.toBool(row[fid]);
        }
        return row;
    }

    //http://www.mredkj.com/javascript/numberFormat.html
    static addComma(str: string | number): string {
        const strVal = String(str);
        const x = strVal.split('.');
        let x1 = x[0];
        const x2 = x.length > 1 ? '.' + x[1] : '';
        const rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return x1 + x2;
    }

};//class