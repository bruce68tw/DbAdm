var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import $ from "jquery";
import _Ajax from "./_Ajax";
import _BR from "./_BR";
import _Form from "./_Form";
import _ICheck from "./_ICheck";
import _IDate from "./_IDate";
import _Input from "./_Input";
import _IRadio from "./_IRadio";
import _Json from "./_Json";
import _Me from "./_Me";
import _Obj from "./_Obj";
import _Prog from "./_Prog";
import _Str from "./_Str";
import _Tool from "./_Tool";
import _Var from "./_Var";
import CrudE from "./CrudE";
import Datatable from "./Datatable";
import EstrFun from "./EstrFun";
/**
 * 改為非靜態類別
 * trigger _me.fnAfterFind(result) if any
 * crud read function
 * main for admin Web system
 * this properties:
 * //divEdit
 * divRead
 * //hasRead
 * rform
 * rform2
 * dt
 * _updName
*/
export default class CrudR {
    /**
     * default datatable layout
     * toolbar layout:l(length),f(filter),r(processing),t(table),i(info),p(page)
     */
    //dtDom: '<"toolbar">t<li>p',
    /**
     * default datatable column define
     
    dtColDef: {
        className: 'x-center',
        orderable: false,
        targets: '_all',
    },
    */
    /**
     * initial crud read & edit
     * param1 dtConfig {Object} datatables config
     * param2 edits {object Array} for edit form
     * 1.null: means one table, get eform
     * 2.many edit object, if ary0 is null, then call new EditOne()
     * param3 updName {string} update name, default to _BR.Update
     */
    constructor(dtConfig, edits, updName) {
        /**
         * save middle variables
         */
        this.temp = {};
        // public properties (matching the function comments)
        this.divRead = null;
        this.rform = null;
        this.rform2 = null;
        this.dt = null; // Datatable instance
        this._updName = updName;
        this._init(dtConfig, edits, updName);
    }
    _init(dtConfig, edits, updName) {
        //1.set instance variables
        this.divRead = $('#divRead');
        const hasRead = (this.divRead.length > 0);
        if (hasRead) {
            this.rform = $('#formRead');
            if (this.rform.length === 0)
                this.rform = null;
            this.rform2 = $('#formRead2');
            if (this.rform2.length === 0)
                this.rform2 = null;
            if (this.rform != null)
                _IDate.init(this.rform);
            if (this.rform2 != null)
                _IDate.init(this.rform2);
            //4.Create Datatable object
            //傳入 _me.fnAfterFind if any !!
            if (_Var.notEmpty(dtConfig)) {
                this.dt = new Datatable('#tableRead', 'GetPage', dtConfig, this._getFindCond(), null, null, _Me.fnAfterFind || null);
            }
        }
        //2.init edit
        new CrudE(edits);
        //3.initial forms(recursive)
        _Prog.init(); //prog path
        //set _me
        _Me.crudR = this;
        _Me.hasRead = hasRead;
        _Me.divRead = this.divRead;
    }
    /**
     * checkbox for multiple select
     * param value {string} [1] checkbox value
     * param editable {bool} [true]
     * //param fid {string} [_icheck.Check0Id] data-fid value
     */
    dtCheck0(value, editable) {
        if (_Str.isEmpty(value))
            value = '1';
        //attr
        let attr = "data-fid='" + _ICheck.Check0Id + "'" +
            " data-value='" + value + "'";
        if (editable === false)
            attr += ' readonly';
        //if (checked)
        //    attr += ' checked';
        //x-no-label for checked sign position
        return "" +
            "<label class='xi-check x-no-label'>" +
            "   <input " + attr + " type='checkbox'>" +
            "   <span class='xi-cspan'></span>" +
            "</label>";
    }
    /*
    this.dtCheck0 = function (value, editable, fid) {
        if (editable === undefined)
            editable = true;
        fid = fid || _icheck.Check0Id;
        return _icheck.render2(0, fid, value, false, '', editable);
    };
    */
    //??
    dtRadio1(value, editable) {
        if (editable === undefined)
            editable = true;
        return _IRadio.render(_ICheck.Check0Id, '', false, value, editable);
    }
    /**
     * set status column(checkbox)
     * param value {string} checkbox value, will translate to bool
     * param fnOnClick {string} onclick function, default to this.onSetStatusA
     */
    dtSetStatus(key, value, fnOnClick) {
        //TODO: pending
        return '';
        /*
        //debugger;
        var checked = _str.toBool(value);
        if (_str.isEmpty(fnOnClick)) {
            fnOnClick = `_me.crudR.onSetStatusA(this,\'{0}\')`, key);
        }
        //??
        return _icheck.render2(0, '', 1, checked, '', true, '', "onclick=" + fnOnClick);
        */
    }
    dtStatusName(value) {
        return (value === '1')
            ? '<span>' + _BR.StatusYes + '</span>'
            : '<span class="text-danger">' + _BR.StatusNo + '</span>';
    }
    dtYesEmpty(value) {
        return (value === '1') ? _BR.Yes : '';
    }
    //顯示紅色
    dtRed(text, status) {
        return status
            ? '<span class="text-danger">' + text + '</span>'
            : '<span>' + text + '</span>';
    }
    /**
     * !! change link to button
     * crud functions: update,delete,view
     * param key {string} row key
     * param rowName {string} for show row name before delete
     * param hasUpdate {bool} has update icon or not
     * param hasDelete {bool} has delete icon or not
     * param hasView {bool} has view icon or not
     */
    dtCrudFun(key, rowName, hasUpdate, hasDelete, hasView, fnOnUpdate, fnOnDelete, fnOnView) {
        let funs = '';
        if (hasUpdate)
            funs += `<button type="button" class="btn btn-link" data-onclick="${(fnOnUpdate == null ? '_me.crudR.onUpdateA' : fnOnUpdate)}" data-args="${key}"><i class="ico-pen" title="${_BR.TipUpdate}"></i></button>`;
        if (hasDelete)
            funs += `<button type="button" class="btn btn-link" data-onclick="${(fnOnDelete == null ? '_me.crudR.onDeleteA' : fnOnDelete)}" data-args="${key},${rowName}"><i class="ico-delete" title="${_BR.TipDelete}"></i></button>`;
        if (hasView)
            funs += `<button type="button" class="btn btn-link" data-onclick="${(fnOnView == null ? '_me.crudR.onViewA' : fnOnView)}" data-args="${key}"><i class="ico-eye" title="${_BR.TipView}"></i></button>`;
        return funs;
    }
    /**
     * get Find condition
     */
    _getFindCond() {
        if (this.rform == null)
            return null;
        const row = _Form.toRow(this.rform);
        const find2 = this.rform2;
        if (find2 !== null && _Obj.isShow(find2))
            _Json.copy(_Form.toRow(find2), row);
        return row;
    }
    /**
     * change newDiv to active
     * param toRead {bool} show divRead or not
     * param nowDiv {object} (default _me.divEdit) now div to show
     * param fnCallback {function} (optional) callback function
     */
    swap(toRead, nowDiv = null, fnCallback) {
        if (!_Me.hasRead || !_Me.hasEdit) {
            if (fnCallback)
                fnCallback();
            return;
        }
        const isDefault = _Var.isEmpty(nowDiv);
        if (isDefault)
            nowDiv = _Me.divEdit;
        let oldDiv, newDiv;
        if (toRead) {
            oldDiv = nowDiv;
            newDiv = this.divRead;
        }
        else {
            oldDiv = this.divRead;
            newDiv = nowDiv;
        }
        if (newDiv === null)
            return; // Safety check
        /*
        if (_obj.isShow(oldDiv)) {
            oldDiv.fadeToggle(200);
            newDiv.fadeToggle(500);
        }
        */
        /*
        oldDiv.fadeOut(200, function () {
            newDiv.fadeIn(500);
            if (fnCallback)
                fnCallback();
        });
        */
        oldDiv.addClass('x-off');
        setTimeout(() => {
            oldDiv.addClass('d-none').removeClass('x-off');
            newDiv.removeClass('d-none').addClass('x-on');
            setTimeout(() => {
                newDiv.removeClass('x-on');
                if (fnCallback)
                    fnCallback();
            }, 500);
        }, 200);
        /*
        // fadeOut 用 d-none 隱藏
        oldDiv.animate({ opacity: 0 }, 200, function () {
            oldDiv.addClass('d-none').css('opacity', 1);  // 動畫結束後隱藏並還原透明度

            // fadeIn 用 d-none 顯示
            newDiv.removeClass('d-none').css('opacity', 0).animate({ opacity: 1 }, 500);

            if (fnCallback)
                fnCallback();
        });
        */
        /*
        newDiv.fadeIn(500, function () {
            //debugger;
            oldDiv.fadeOut(200);
        });
        
        if (toRead) {
            //nowDiv.fadeOut(200);
            //this.divRead.fadeIn(500);
        } else {
            //this.divRead.fadeOut(200);
            //nowDiv.fadeIn(500);
        }
        */
        if (isDefault)
            this._afterSwap(toRead);
    }
    //XpFlowSign Read.cshtml 待處理!!
    //to edit(U/V) mode
    //toEditMode = function(fun, data) {
    toEditMode(fun, fnCallback) {
        this.swap(false, null, fnCallback); //call first
        _Prog.setPath(fun, this._updName);
    }
    /**
     * back to list form
     */
    toReadMode() {
        //_obj.show(this.divReadTool);
        _Prog.resetPath();
        this.swap(true);
    }
    /**
     * call fnAfterSwap if existed
     * param toRead {bool} to read mode or not
     */
    _afterSwap(toRead) {
        if (_Me.fnAfterSwap)
            _Me.fnAfterSwap(toRead);
    }
    //=== event start ===
    /**
     * onclick find rows
     */
    onFind() {
        const cond = this._getFindCond();
        this.dt.find(cond);
    }
    /**
     * onclick find2 button for show/hide find2 form
     */
    onFind2() {
        const find2 = this.rform2;
        if (find2 == null)
            return;
        else if (_Obj.isShow(find2))
            _Form.hideShow([find2]);
        else
            _Form.hideShow(null, [find2]);
    }
    /**
     * onclick reset find form
     */
    onResetFind() {
        _Form.reset(this.rform);
        if (this.rform2 != null)
            _Form.reset(this.rform2);
    }
    /**
     * onClick export excel button
     */
    onExport() {
        const find = this._getFindCond();
        window.location.href = 'Export?find=' + _Json.toStr(find);
    }
    /**
     * onclick toRead button
     */
    onToRead() {
        this.toReadMode();
    }
    /**
     * onclick Create button
     */
    onCreate() {
        //var fun = EstrFun.Create;
        //this.swap(false);  //call first
        //_prog.setPath(fun);
        _Me.crudE.onCreate();
        this.toEditMode(EstrFun.Create);
    }
    /**
     * onclick Update button
     * param key {string} row key
     */
    onUpdateA(key) {
        return __awaiter(this, void 0, void 0, function* () {
            //_me.crudE._getJsonAndSetMode(key, EstrFun.Update);
            //this.toEditMode(EstrFun.Update);
            yield _Me.crudE.onUpdateA(key);
        });
    }
    /**
     * onclick View button
     * param key {string} row key
     */
    onViewA(key) {
        return __awaiter(this, void 0, void 0, function* () {
            //_me.crudE._getJsonAndSetMode(key, EstrFun.View);
            yield _Me.crudE.onViewA(key);
            //this.toEditMode(EstrFun.View);
        });
    }
    /**
     * click setStatus, 固定呼叫後端 SetStatus action
     * me {element} checkbox element
     * key {string} row key
     */
    onSetStatusA(me, key) {
        return __awaiter(this, void 0, void 0, function* () {
            const status = _ICheck.checkedO($(me));
            yield _Ajax.getStrA('SetStatus', { key: key, status: status }, function (msg) {
                _Tool.alert(_BR.UpdateOk);
            });
        });
    }
    /**
     * TODO: need test
     * onclick check all, check/uncheck box all checkbox of fid field
     * param me {string} row key
     * param box {string} row key
     * param fid {string} fid
     */
    onCheckAll(me, box, fid) {
        _ICheck.setF(_Input.fidFilter(fid) + ':not(:disabled)', _ICheck.checkedO($(me)), box);
    }
    /**
     * onclick Delete, call backend Delete()
     * key {string} row key
     * rowName {string} for confirm
     */
    onDeleteA(key, rowName) {
        return __awaiter(this, void 0, void 0, function* () {
            //_temp.data = { key: key };
            const me = this;
            _Tool.ans(_BR.SureDeleteRow + ' (' + rowName + ')', function () {
                return __awaiter(this, void 0, void 0, function* () {
                    yield _Ajax.getJsonA('Delete', { key: key }, function (msg) {
                        _Tool.alert(_BR.DeleteOk);
                        me.dt.reload();
                    });
                });
            });
        });
    }
    /**
     * TODO: need test
     * no called
     * 刪除選取的多筆資料, 後端固定呼叫 DeleteByKeys()
     * box {string} row key
     * fid {string}
     */
    onDeleteRowsA(box, fid) {
        return __awaiter(this, void 0, void 0, function* () {
            //get selected keys
            const keys = _ICheck.getCheckeds(box, fid);
            if (keys.length === 0) {
                _Tool.msg(_BR.PlsSelectDeleted);
                return;
            }
            //刪除多筆資料, 後端固定呼叫 DeleteByKeys()
            //_temp.data = { keys: keys };
            const me = this;
            _Tool.ans(_BR.SureDeleteSelected, function () {
                return __awaiter(this, void 0, void 0, function* () {
                    yield _Ajax.getStrA('DeleteByKeys', { keys: keys }, function (msg) {
                        _Tool.alert(_BR.DeleteOk);
                        me.dt.reload();
                    });
                });
            });
        });
    }
}
//# sourceMappingURL=../../../_tsBase/wwwroot/map/base/CrudR.js.map