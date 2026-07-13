//import Mustache from "mustache";
import EditModeEstr from '../enum/EditModeEstr';
import _Edit from './_Edit';
import _Str from './_Str';
import _Obj from './_Obj';
import _Input from './_Input';
import _iCheck from './_iCheck';
import _iDate from './_iDate';
import _Var from './_Var';
import _Form from './_Form';
import _Log from './_Log';
import _Fun from './_Fun';
import _iText from './_iText';
import _iFile from './_iFile';
export default class EditMany {
    constructor(kid, rowsBoxId, rowTplId, rowFilter, sortFid) {
        //private [_Edit.Childs]: any = null;
        this.mode = EditModeEstr.Base;
        this.modeData = '';
        this.systemError = '';
        this.rowTpl = '';
        this.rowsBox = $();
        this.eform = $();
        this.deletedRows = [];
        this.newIndex = 0;
        this.kid = kid;
        this.rowFilter = rowFilter || '';
        this.sortFid = sortFid;
        this.hasRowTpl = _Str.notEmpty(rowTplId);
        this.hasRowFilter = _Str.notEmpty(rowFilter);
        if (this.hasRowTpl) {
            this.rowTpl = $('#' + rowTplId).html();
            var rowObj = $(this.rowTpl);
            if (_Obj.get(kid, rowObj) == null) {
                this.systemError = `EditMany.js input kid is wrong (${kid})`;
                alert(this.systemError);
            }
            _Edit.initVars(this, rowObj);
        }
        this.hasEform = _Str.notEmpty(rowsBoxId);
        if (this.hasEform) {
            this.rowsBox = $('#' + rowsBoxId);
            this.eform = this.rowsBox.closest('form');
            if (this.rowsBox.length == 0) {
                this.systemError = `EditMany.js rowsBoxId is wrong (${rowsBoxId})`;
                alert(this.systemError);
            }
        }
        this.deletedRows = [];
        this.newIndex = 0;
    }
    showErrors(rows) {
        if (rows == null)
            return;
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            var item = _Obj.get(row.fid, this.idToRowBox(row.id));
            this.validator.showLabel(item[0], row.msg);
            item.addClass('error');
        }
    }
    setChilds(childs) {
        this._childs = childs;
    }
    initUrm(fids) {
        this.mode = EditModeEstr.UR;
        this.modeData = fids;
    }
    _isNewBox(box) {
        return _Edit.isNewBox(box, this.kid);
    }
    reset(rowsBox, forNew) {
        if (forNew == null)
            forNew = false;
        rowsBox = this._getRowsBox(rowsBox);
        if (this.fnReset) {
            this.fnReset();
        }
        else if (this.mode == EditModeEstr.UR) {
            this._urmReset();
        }
        else if (this.hasEform) {
            rowsBox.empty();
            this._resetVar();
        }
    }
    _resetVar() {
        this.newIndex = 0;
        this._resetDeletes();
    }
    _resetDeletes() {
        this.deletedRows = [];
    }
    _urmLoadRows(rows) {
        this._urmReset();
        if (rows == null)
            return;
        var fids = this.modeData;
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            var obj = this.rowsBox.find(_Input.fidFilter(row[fids[1]]));
            _iCheck.setO(obj, 1);
            obj.data('key', row[fids[0]]);
        }
    }
    _urmGetUpdJson(upKey) {
        var json = {};
        var rows = [];
        var me = this;
        var newIdx = 0;
        var fids = this.modeData;
        this._resetDeletes();
        this.rowsBox.find(':checkbox').each(function () {
            var obj = $(this);
            var key = obj.data('key');
            if (_Str.isEmpty(key)) {
                if (_iCheck.isCheckedO(obj)) {
                    var row = {};
                    row[fids[0]] = --newIdx;
                    row[fids[1]] = _iCheck.getO(obj);
                    me.rowSetFkey(row, upKey);
                    rows[rows.length] = row;
                }
            }
            else {
                if (!_iCheck.isCheckedO(obj)) {
                    me.deleteRow(key);
                }
            }
        });
        if (rows.length > 0)
            json[_Edit.Rows] = rows;
        json[_Edit.Deletes] = this.getDeletes();
        return json;
    }
    _urmReset() {
        this._resetVar();
        var objs = this.rowsBox.find(':checkbox');
        _iCheck.setO(objs, 0);
        objs.data('key', '');
    }
    loadRowsBySys(rows) {
        if (this.fnLoadRows) {
            this.fnLoadRows(rows);
        }
        else if (this.mode == EditModeEstr.UR) {
            this._urmLoadRows(rows);
        }
        else {
            this.loadRowsByRsb(rows, true);
        }
    }
    loadRowByBox(rowBox, row, index) {
        row.Index = index;
        var tr = $(Mustache.render(this.rowTpl, row));
        var fid;
        for (var i = 0; i < this.fidTypeLen; i = i + 2) {
            fid = this.fidTypes[i];
            _Edit.setOld(_Obj.get(fid, tr), row[fid]);
        }
        for (var i = 0; i < this.fidRadios.length; i++) {
            fid = this.fidRadios[i];
            tr.find(`[name='${fid}']`).attr('name', `${fid}_${index}`);
        }
        _iDate.init(tr);
        _Form.loadRow(tr, row);
        tr.appendTo(rowBox);
    }
    loadRowsByRsb(rows, reset, rowsBox) {
        if (!this._checkRowTpl())
            return;
        rowsBox = this._getRowsBox(rowsBox);
        if (_Var.isEmpty(reset) || reset)
            this.reset(rowsBox);
        var rowLen = (rows == null) ? 0 : rows.length;
        if (rowLen == 0)
            return;
        for (var i = 0; i < rowLen; i++) {
            this.loadRowByBox(rowsBox, rows[i], i);
        }
    }
    valid() {
        return this.fnValid ? this.fnValid() :
            this.hasEform ? this.eform.validTable(this.validator) :
                true;
    }
    getKey(rowBox) {
        return _Input.get(this.kid, rowBox);
    }
    _checkRowFilter() {
        if (this.hasRowFilter)
            return true;
        _Log.error('EditMany.js this.rowFilter is empty.');
        return false;
    }
    _checkRowTpl() {
        if (this.hasRowTpl)
            return true;
        _Log.error('EditMany.js this.rowTpl is empty.');
        return false;
    }
    _elmToRowBox(elm) {
        return this._checkRowFilter()
            ? $(elm).closest(this.rowFilter)
            : null;
    }
    idToRowBox(id) {
        var filter = _Input.fidFilter(this.kid) + `[value='${id}']`;
        return this.eform.find(filter).closest(this.rowFilter);
    }
    getUpdJsonBySys(upKey) {
        if (this.fnGetUpdJson)
            return this.fnGetUpdJson(upKey);
        else if (this.mode == EditModeEstr.UR)
            return this._urmGetUpdJson(upKey);
        else
            return this.getUpdJsonByRsb(upKey, this.rowsBox);
    }
    getUpdJsonByRsb(upKey, rowsBox) {
        var json = {};
        json[_Edit.Rows] = this.getUpdRows(upKey, this._getRowsBox(rowsBox));
        json[_Edit.Deletes] = this.getDeletes();
        return json;
    }
    getUpdRow(box) {
        return _Edit.getUpdRow(this, box);
    }
    getUpdRows(upKey, rowsBox) {
        if (!this._checkRowFilter())
            return null;
        rowsBox = this._getRowsBox(rowsBox);
        this.setSort(rowsBox);
        var rows = [];
        var me = this;
        rowsBox.find(me.rowFilter).each(function (idx, item) {
            var box = $(item);
            var key = _Input.get(me.kid, box);
            if (me._isNewBox(box)) {
                var row2 = _Form.toRow(box);
                row2[_Edit.DataFkeyFid] = upKey;
                rows.push(row2);
                return;
            }
            var diffRow = {};
            var diff = false;
            var fid, ftype, value, obj;
            for (var j = 0; j < me.fidTypes.length; j = j + 2) {
                fid = me.fidTypes[j];
                obj = _Obj.get(fid, box);
                if (obj.hasClass('xi-unsave'))
                    continue;
                ftype = me.fidTypes[j + 1];
                value = _Input.getO(obj, box, ftype);
                if (value != _Edit.getOld(obj)) {
                    diffRow[fid] = value;
                    diff = true;
                }
            }
            if (diff) {
                diffRow[me.kid] = key;
                rows.push(diffRow);
            }
        });
        return (rows.length === 0) ? null : rows;
    }
    getDeletes() {
        return (this.deletedRows.length === 0)
            ? null : this.deletedRows.join();
    }
    onAddRow() {
        this.addRow();
    }
    addRow(row, rowsBox, newId) {
        row = row || {};
        rowsBox = this._getRowsBox(rowsBox);
        var obj = this._renderRow(row, rowsBox);
        newId = this.setNewIdByBox(obj, newId);
        row[this.kid] = newId;
        return row;
    }
    onDeleteRow() {
        var box = this._elmToRowBox(_Fun.getMe());
        if (box) {
            this.deleteRow(_iText.get(this.kid, box), box);
        }
    }
    deleteRow(key, rowBox) {
        var deletes = this.deletedRows;
        var found = false;
        var rowLen = deletes.length;
        for (var i = 0; i < rowLen; i++) {
            if (deletes[i] === key) {
                found = true;
                break;
            }
        }
        if (!found)
            deletes[rowLen] = key;
        if (_Obj.notEmpty(rowBox))
            rowBox.remove();
    }
    deleteAll() {
        var me = this;
        this.rowsBox.find(this.rowFilter).each(function () {
            var box = $(this);
            var key = _Input.get(me.kid, box);
            me.deleteRow(key, box);
        });
    }
    async onViewFile(table, fid) {
        var elm = _Fun.getMeElm();
        var box = this._elmToRowBox(elm);
        if (box) {
            var key = this.getKey(box);
            await _Edit.viewFileA(table, fid, elm, key);
        }
    }
    _renderRow(row, rowsBox) {
        if (!this._checkRowTpl())
            return null;
        rowsBox = this._getRowsBox(rowsBox);
        var obj = $(Mustache.render(this.rowTpl, row));
        _Form.loadRow(obj, row);
        obj.appendTo(rowsBox);
        return obj;
    }
    dataAddFiles(levelStr, data, rowsBox) {
        if (!this.hasFile)
            return null;
        if (!this._checkRowFilter())
            return null;
        rowsBox = this._getRowsBox(rowsBox);
        var me = this;
        var fileJson = {};
        var fileIdx = {};
        rowsBox.find(me.rowFilter).each(function (index, item) {
            var tr = $(item);
            for (var i = 0; i < me.fileLen; i++) {
                var fid = me.fileFids[i];
                var serverFid = _Edit.getFileSid(levelStr, fid);
                if (_iFile.dataAddFile(data, fid, serverFid, tr)) {
                    fileIdx[fid] = (fileIdx[fid] == null) ? 0 : fileIdx[fid] + 1;
                    fileJson[serverFid + fileIdx[fid]] = me.getKey(tr);
                }
            }
        });
        return fileJson;
    }
    rowSetFkey(row, fkey) {
        if (row != null && _Edit.isNewRow(row, fkey))
            row[_Edit.DataFkeyFid] = fkey;
    }
    rowsSetFkey(rows, fkey) {
        if (rows != null) {
            for (var i = 0; i < rows.length; i++) {
                var row = rows[i];
                if (row != null && _Edit.isNewRow(row, this.kid))
                    row[_Edit.DataFkeyFid] = fkey;
            }
        }
    }
    rowsToNew() {
        if (this.rowsBox == null || this.rowsBox.length == 0)
            return;
        var me = this;
        me.newIndex = 0;
        me.rowsBox.find(me.rowFilter).each(function () {
            me.newIndex--;
            _iText.set(me.kid, me.newIndex, $(this));
        });
    }
    setNewIndex(index) {
        this.newIndex = Math.abs(index) * -1;
    }
    setNewIdByBox(box, newId) {
        if (newId == null) {
            this.newIndex--;
            newId = this.newIndex;
        }
        var box2 = _Obj.get(this.kid, box).closest(this.rowFilter);
        _iText.set(this.kid, newId, box2);
        return newId;
    }
    setSort(rowsBox) {
        var sortFid = this.sortFid;
        if (_Str.isEmpty(sortFid))
            return;
        var me = this;
        rowsBox = this._getRowsBox(rowsBox);
        rowsBox.find(_Input.fidFilter(sortFid)).each(function (i, item) {
            _iText.set(sortFid, i, $(item).closest(me.rowFilter));
        });
    }
    _getRowsBox(rowsBox) {
        return rowsBox || this.rowsBox;
    }
}
