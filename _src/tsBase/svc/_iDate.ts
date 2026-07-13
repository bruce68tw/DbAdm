//import 'bootstrap-datepicker';
import _iBase from './_iBase';
import _Obj from './_Obj';
import _Fun from './_Fun';
import _Str from './_Str';
import _Date from './_Date';

export default class _iDate extends _iBase {
  public static BoxFilter: string = '.date';

  /**
   * get ymd with format _Fun.MmDateFmt
   * param obj {object} date input object
   * return mm date
   */
  public static getO(obj: JQuery): string {
    return _Date.uiToMmDate(obj.val() as string);
  }

  /**
   * set input value
   * param obj {object} date input object
   * param value {string} format: _Fun.MmDateFmt
   */
  public static setO(obj: JQuery, value: string): void {
    _iDate._boxSetDate(_iDate._objToBox(obj), value);
  }

  /**
   * set edit status
   * param obj {object} date input object
   */
  public static setEditO(obj: JQuery, status: boolean): void {
    obj.prop('disabled', !status);
  }

  /**
   * initial, called by _me.crudE.js
   * 注意:
   * 欄位必須放在 form裡面, 因為使用 validator !!
   * param box {object}
   * param fid {string} optional
   */ 
  public static init(box: JQuery, fid?: string): void {
    const obj = _Str.isEmpty(fid)
      ? box.find(_iDate.BoxFilter)
      : _Obj.get(fid, box).closest(_iDate.BoxFilter);
      
    if (obj.length === 0) return;

    //initial
    (obj as any).datepicker({
      language: _Fun.locale,
      autoclose: true,
      showOnFocus: false,
      todayHighlight: true,
    }).on('changeDate', function (this: any, e: any) {
      _iDate._boxGetInput($(this)).valid();
    });

    //stop event, or it will popup when reset(jquery 3.21) !!
    obj.find('.input-group-addon').off('click');
  }

  //show/hide datepicker
  public static onToggle(): void {
    const btn = _Fun.getMeElm();
    (_iDate._elmToBox(btn) as any).datepicker('show');
  }

  //reset value
  public static onReset(): void {
    const btn = _Fun.getMeElm();
    const box = _iDate._elmToBox(btn);
    const input = _iDate._boxGetInput(box);
    if (_iDate.getEditO(input)) {
      _iDate._boxSetDate(box, '');
    }
  }    

  //get edit status, return bool
  public static getEditO(obj: JQuery): boolean {
    return !obj.is(':disabled');
  }

  /**
   * input element to date box
   * return {object}
   */
  private static _elmToBox(elm: Elm): JQuery {
    return _iDate._objToBox($(elm));
  }

  private static _objToBox(obj: JQuery): JQuery {
    return obj.closest(_iDate.BoxFilter);
  }

  private static _boxSetDate(box: JQuery, date: string): void {
    date = _Date.dsToUiDate(date);
    (box as any).datepicker('update', date);
    box.trigger({
      type: 'changeDate',
      date: date
    } as any);
  }

  private static _boxGetInput(box: JQuery): JQuery {
    return box.find('input');
  }
}