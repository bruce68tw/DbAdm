"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moment_1 = require("moment");
var _Str_1 = require("./_Str");
var _Fun_1 = require("./_Fun");
//import _BR from "./_BR";
var _IDate_1 = require("./_IDate");
var _ISelect_1 = require("./_ISelect");
/**
 * 日期/時間格式包含: 資料庫、c#/js(兩者設定為一致)、UI
 * for date related
 * short name:
 * 1.date: moment date
 * 2.dt: moment datetime
 * 3.ds: date string
 * 4.dts: datetime string
 */
var _Date = /** @class */ (function () {
    function _Date() {
    }
    /**
      ?? 傳回起迄日期(json) for 日期欄位查詢
      param {string} start 開始日期欄位id
      param {string} end 結束日期欄位id
      params {object} box box object
      return {json} 包含start, end欄位
     */
    _Date.getStartEnd = function (start, end, box) {
        //const start2 = box.find
    };
    /**
     * get today date string in UI format
     */
    _Date.uiToday = function () {
        var mm = (0, moment_1.default)();
        return _Date.mmToUiDate(mm);
    };
    /**
     * get this week monday in UI format
     */
    _Date.uiWeekMonday = function () {
        var mm = (0, moment_1.default)().day(1);
        return _Date.mmToUiDate(mm);
    };
    _Date.uiWeekFriday = function () {
        var mm = (0, moment_1.default)().day(5);
        return _Date.mmToUiDate(mm);
    };
    /**
     * get this month first day
     */
    _Date.uiMonthDay1 = function () {
        var mm = (0, moment_1.default)().startOf('month');
        return _Date.mmToUiDate(mm);
    };
    /**
     * get this month last day
     */
    _Date.uiMonthDayLast = function () {
        var mm = (0, moment_1.default)().endOf('month');
        return _Date.mmToUiDate(mm);
    };
    /**
     * get current year, ex: 2021
     */
    _Date.nowYear = function () {
        return (new Date()).getFullYear();
    };
    _Date.mmToUiDate = function (mm) {
        return mm.format(_BR.MmUiDateFmt);
    };
    _Date.mmToUiDt = function (mm) {
        return mm.format(_BR.MmUiDtFmt);
    };
    _Date.mmToUiDt2 = function (mm) {
        return mm.format(_BR.MmUiDt2Fmt);
    };
    _Date.dtsToUiDate = function (dts) {
        return _Str_1.default.isEmpty(dts)
            ? ''
            : _Date.mmToUiDate((0, moment_1.default)(dts, _Fun_1.default.MmDtFmt));
    };
    /**
     * js date string to ui date string
     * param ds {string} js date string
     * return {string} ui date string
     */
    _Date.dtsToDateFormat = function (ds) {
        return _Str_1.default.isEmpty(ds)
            ? ''
            : _Date.mmToUiDate((0, moment_1.default)(ds, _Fun_1.default.MmDateFmt));
    };
    _Date.dtsToUiDt = function (dts) {
        return _Str_1.default.isEmpty(dts)
            ? ''
            : _Date.mmToUiDt((0, moment_1.default)(dts, _Fun_1.default.MmDtFmt));
    };
    /**
     * js datetime string to ui datetime2 string(no second)
     * param dts {string} js datetime string
     * return {string} ui datetime2 string(no second)
     */
    _Date.dtsToUiDt2 = function (dts) {
        return _Str_1.default.isEmpty(dts)
            ? ''
            : _Date.mmToUiDt2((0, moment_1.default)(dts, _Fun_1.default.MmDtFmt));
    };
    _Date.dtsToFormat = function (dts, format) {
        return (_Str_1.default.isEmpty(dts))
            ? ''
            : (0, moment_1.default)(dts, _Fun_1.default.MmDtFmt).format(format);
    };
    //get datetime value for compare
    _Date.dtsToValue = function (dts) {
        return (_Str_1.default.isEmpty(dts))
            ? 0
            : (0, moment_1.default)(dts, _Fun_1.default.MmDtFmt).valueOf();
    };
    _Date.dtsToMoment = function (dts) {
        return (_Str_1.default.isEmpty(dts))
            ? null
            : (0, moment_1.default)(dts, _Fun_1.default.MmDtFmt);
    };
    /**
     * ui date string to js date string
     * param ds {string} ui date string
     * return {string} js date string
     */
    _Date.uiToMmDate = function (ds) {
        var date = _Str_1.default.isEmpty(ds)
            ? '' : (0, moment_1.default)(ds, _BR.MmUiDateFmt).format(_Fun_1.default.MmDateFmt);
        return date;
    };
    /**
     * timeStamp to ui datetime string
     * param ts {string} timeStamp value, unit is second, convert to mini second
     * return {string}
     */
    _Date.tsToUiDt = function (ts) {
        return (ts == '')
            ? ''
            : (0, moment_1.default)(parseInt(ts) * 1000).format(_BR.MmUiDtFmt);
    };
    /**
     * get hour string from datetime string
     * param dts {string} datetime string
     * return {string}
     */
    _Date.getHourStr = function (dts) {
        // implementation missing in original code
        return '';
    };
    //?? get datetime string
    //time為下拉欄位
    _Date.getDt = function (fDate, fTime, box) {
        var date = _IDate_1.default.get(fDate, box);
        var time = _ISelect_1.default.get(fTime, box);
        if (_Str_1.default.isEmpty(date))
            return '';
        else
            return _Str_1.default.isEmpty(time) ? date : date + ' ' + time;
    };
    /**
     * compare two js date/datetime string
     * param ds1 {string} start js date string
     * param ds2 {string} end js date string
     * return {bool}
     */
    _Date.isBig = function (ds1, ds2) {
        return (0, moment_1.default)(ds1, _Fun_1.default.MmDtFmt).isAfter((0, moment_1.default)(ds2, _Fun_1.default.MmDtFmt));
    };
    /**
     * get month difference by date string
     * param ds1 {string} start date string
     * param ds2 {string} end date string
     * return {int}
     */
    _Date.getMonthDiff = function (ds1, ds2) {
        // Original code has an error: it uses 'start' and 'end' which are not defined.
        // Assuming it should use ds1 and ds2 as a check for empty, and then pass moment objects.
        return (_Str_1.default.isEmpty(ds1) || _Str_1.default.isEmpty(ds2))
            ? 0
            : _Date.getMonthDiffByDate((0, moment_1.default)(ds1, _Fun_1.default.MmDtFmt), (0, moment_1.default)(ds2, _Fun_1.default.MmDtFmt));
    };
    /**
     * get month difference by date
     * param dt1 {moment obj} start date
     * param dt2 {moment obj} end date
     * return {int}
     */
    _Date.getMonthDiffByDate = function (dt1, dt2) {
        // Note: moment().getFullYear() and moment().getMonth() are not standard moment methods.
        // Assuming the intent was to use the underlying Date object or moment's API methods like year() and month().
        // Based on the original JS code structure, it likely relies on moment's underlying implementation allowing this or expects moment-like objects.
        // Using standard Moment methods here for better type safety and clarity, assuming moment.js is used.
        return (dt2.year() - dt1.year()) * 12
            + dt2.month() - dt1.month() + 1;
    };
    /**
     * js date string add year
     * jsDateAddYear -> dsAddYear
     * param ds {string} js date string
     * param year {int} year to add
     * return {string} new js date string
     */
    _Date.dsAddYear = function (ds, year) {
        //return (parseInt(date.substring(0, 4)) + year) + date.substring(4);
        return (0, moment_1.default)(ds, _Fun_1.default.MmDtFmt).add(year, 'y').format(_Fun_1.default.MmDtFmt);
    };
    return _Date;
}());
exports.default = _Date;
