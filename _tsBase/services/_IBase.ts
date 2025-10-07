import _Obj from "./_Obj";

//base class of all input field, use 'this' instead of '_ibase'
//must loaded first, or will got error !!
export default class _IBase {

    /**
     * get value by fid, get -> getF -> getO
     * param fid {string}
     * param box {object}
     * return {string | null}
     */
    static get(fid: string, box?: JQuery): string | null {
        // @ts-ignore: 'this' will be _IBase at runtime for static methods
        return this.getO(_Obj.get(fid, box));
    }
    //get value by filter
    static getF(ft: string, box?: JQuery): string | null {
        // @ts-ignore: 'this' will be _IBase at runtime for static methods
        return this.getO(_Obj.getF(ft, box));
    }
    //get value by id
    static getD(id: string, box?: JQuery): string | null {
        // @ts-ignore: 'this' will be _IBase at runtime for static methods
        return this.getO(_Obj.getD(id, box));
    }
    //get value by object
    static getO(obj: JQuery | null): string | null {
        return obj == null ? null : obj.val() as string;
    }

    //get input border for show red border
    //default return this, drive class could rewrite.
    static getBorder(obj: JQuery): JQuery {
        return obj;
    }

    //set value, set -> setF -> setO
    static set(fid: string, value: any, box?: JQuery): void {
        // @ts-ignore: 'this' will be _IBase at runtime for static methods
        this.setO(_Obj.get(fid, box), value)
    }
    static setF(ft: string, value: any, box?: JQuery): void {
        // @ts-ignore: 'this' will be _IBase at runtime for static methods
        this.setO(_Obj.getF(ft, box), value)
    }
    static setO(obj: JQuery, value: any): void {
        obj.val(value);
        obj.text(value);    //for XiRead
    }

    //set edit status
    static setEdit(fid: string, status: boolean, box?: JQuery): void {
        // @ts-ignore: 'this' will be _IBase at runtime for static methods
        this.setEditO(_Obj.get(fid, box), status);
    }
    static setEditF(ft: string, status: boolean, box?: JQuery): void {
        // @ts-ignore: 'this' will be _IBase at runtime for static methods
        this.setEditO(_Obj.getF(ft, box), status);
    }
    static setEditO(obj: JQuery, status: boolean): void {
        obj.prop('readonly', !status);
    }

};//class