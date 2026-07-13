import _Obj from './_Obj';

export default class _iBase {
  /**
   * get value by fid, get -> getF -> getO
   * param fid {string}
   * param box {object}
   * return {string}
   */
  static get(fid: string, box: JQuery): any {
    return this.getO(_Obj.get(fid, box));
  }

  //get value by id
  static getD(id: string, box: JQuery): any {
    return this.getO(_Obj.getById(id, box));
  }

  //get value by filter
  static getF(ft: string, box: JQuery): any {
    return this.getO(_Obj.getByFt(ft, box));
  }

  //get value by object
  static getO(obj: JQuery): StrNumN {
    return obj == null ? null : obj.val() as StrNumN;
  }

  //set value, set -> setF -> setO
  static set(fid: string, value: any, box: JQuery): void {
    this.setO(_Obj.get(fid, box), value);
  }

  static setD(id: string, value: JQuery, box: any): void {
    this.setO(_Obj.getById(id, box), value);
  }

  static setF(ft: string, value: any, box: JQuery): void {
    this.setO(_Obj.getByFt(ft, box), value);
  }

  static setO(obj: JQuery, value: any): void {
    obj.val(value);
  }

  //get input border for show red border
  //default return this, drive class could rewrite.
  static getBorder(obj: JQuery): any {
    return obj;
  }

  //set edit status
  static setEdit(fid: string, status: boolean, box: JQuery): void {
    this.setEditO(_Obj.get(fid, box), status);
  }

  static setEditO(obj: JQuery, status: boolean): void {
    obj.prop('readonly', !status);
  }
}