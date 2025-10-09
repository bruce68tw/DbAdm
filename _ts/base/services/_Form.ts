import _Btn from "./_Btn";
import _ICheck from "./_ICheck";
import _IDate from "./_IDate";
import _Input from "./_Input";
import _IRadio from "./_IRadio";
import _ISelect from "./_ISelect";
import _IText from "./_IText";
import _ITextarea from "./_ITextarea";
import _Obj from "./_Obj";

// 假設這些在其他文件中定義，且因為它們只出現在註釋掉的舊代碼中，我們暫時不引入它們，但如果它們在未註釋的代碼中被需要，則應該引入。
// import _BR from "./_BR";
// import _EditMany from "./_EditMany";
// import _Fun from "./_Fun";
// import _IFile from "./_IFile";
// import _Json from "./_Json";
// import _Str from "./_Str";

/**
 * input form
 * 裡面function預設傳入object(not element or selector) 
 */
export default class _Form {

    /**
     * get input values, 排除不儲存的欄位, 可用在多筆的單行
     * param form {object} input form
     * return {json}
     */
    static toRow(form: JQuery): Json {
        //skip link & read fields
        let row: Json = {};
        form.find(_Input.fidFilter()).filter(':not(.xi-unsave)').each(function () {
            const obj = $(this);
            row[_Input.getFid(obj)] = _Input.getO(obj, form);
        });
        return row;

        /*
        //get input
        const attr = 'name';
        const array = form.serializeArray();  //key-value

        //good: jquery foreach
        let json: Json = {};
        $.each(array, function () {
            json[this.name] = this.value || '';
        });

        //add checkbox input, skip pre name with '-'(for summernote)
        form.find(':checkbox').each(function () {
            const item = $(this);
            const id = item.attr(attr);
            //summernote auto generate checkbox with pre name '-', must skip !!
            if (_Fun.hasValue(id) && id.indexOf('-') < 0)
                json[id] = _ICheck.getO(item);
        });

        //add radio input
        const attr2 = '[' + attr + ']:radio';
        form.find(attr2).each(function () {
            const item = $(this);
            const id = item.attr(attr);
            json[id] = _IRadio.get(id, form);
        });
        return json;
        */
    }

    static toRowStr(form: JQuery): string {
        return JSON.stringify(_Form.toRow(form));
    }

    /**
     * load json row into form UI (container object)
     * param form {object} form or box object
     * param json {json}
     */
    static loadRow(form: JQuery, row: Json): void {
        for (const key in row)
            _Input.set(key, row[key], form);
    }

    /**
     * reset all inputs with name attribute
     * param form {object}
     */
    static reset(form: JQuery): void {
        form.find(_Input.fidFilter()).each(function () {
            _Input.setO($(this), '', form);
        });
    }

    /**
     * check has file input or not
     */
    static hasFile(form: JQuery): boolean {
        return (form.find(':file').length > 0);
    }

    /**
     * set form inputs edit status
     * param form {object} jquery form/box
     * param status {bool} edit status
     */
    static setEdit(form: JQuery, status: boolean): void {
        //text & textArea
        _IText.setEditO(form.find('input:text'), status);
        _ITextarea.setEditO(form.find('textarea'), status);

        //date, dt
        _IDate.setEditO(form.find('.date input'), status);

        //dropdown
        _ISelect.setEditO(form.find('select'), status);

        //checkbox & radio
        _ICheck.setEditO(form.find(':checkbox'), status);
        _IRadio.setEditO(form.find(':radio'), status);

        //TODO: html

        //button
        _Btn.setEditO(form.find('button'), status);

        /*
        form.find(':checkbox').each(function () {
            $(this).icheck(enabled);
        });
        //radio
        form.find(':radio').each(function () {
            $(this).icheck(enabled);
        });
        */
    }

    /**
     * hide & show div with effect
     * param hides {array} object array to hide
     * param shows {array} object array to show
     */
    static hideShow(hides: JQuery[] | null, shows: JQuery[] | null = null): void {
        //hide first
        if (hides) {
            for (let i = 0; i < hides.length; i++) {
                const form1 = hides[i];
                form1.fadeOut(500, function () {
                    _Obj.hide(form1);
                });
            }
        }

        //show
        if (shows) {
            for (let i = 0; i < shows.length; i++) {
                const form2 = shows[i];
                form2.fadeIn(500, function () {
                    _Obj.show(form2);
                });
            }
        }
    }


    //=== below is old and remark ===
    /*
    //get save data without files
    //row: jobject
    //deletes: list<list<string>>
    //rows: list<JArray>
    //return json
    getSaveData: function (isNew: boolean, key: any, row: any, rows: any, deletes: any) {
        return {
            isNew: isNew,
            key: key,
            row: _Json.toStr(row),
            rows: _Json.toStr(rows),
            deletes: _Form.keysToStr(deletes),
        };
    },

    //??
    //單筆資料包含要上傳的多個檔案
    //files 單筆資料要上傳的多個檔案, 每個陣列的內容為 [欄位id, 後端變數名稱]
    getSaveRow: function (isNew: boolean, box: JQuery, row: any, files: [string, string][] | null) {
        files = files || [];
        //multis = multis || [];

        const data = new FormData();
        data.append('isNew', isNew.toString());

        //加上單筆資料要上傳的多個檔案
        //var i;
        for (let i = 0; i < files.length; i++)
            _IFile.rowAddFile(data, row, files[i][0], files[i][1], box);

        data.append('row', _Json.toStr(row));
        return data;
    },
    */

    /** * description 傳回要送到後端的儲存資料
     * param {bool} isNew
     * param {object} box object
     * param {object} row json object, for save
     * param {array} files 單筆資料要上傳的多個檔案, 每個陣列的內容為 [欄位id, 後端變數名稱]
     * param {array} multis 多筆資料 src
     * return {FormData} json
     */
    /*
    //getSaveData: function (isNew, box, row, files, multis) {
    getSaveDataWithFiles: function (isNew: boolean, box: JQuery, row: any, files: [string, string][] | null, multis: any[] | null) {
        files = files || [];
        multis = multis || [];

        const data = new FormData();
        data.append('isNew', isNew.toString());

        //加上單筆資料要上傳的多個檔案
        let i;
        for (i = 0; i < files.length; i++)
            _IFile.rowAddFile(data, row, files[i][0], files[i][1], box);

        //rows 加入單筆
        const rows = [row];

        //多筆資料的異動/刪除
        const deletes: any[][] = [];
        for (i = 0; i < multis.length; i++) {
            //異動資料
            _EditMany.dataAddRows(data, rows, multis[i]); //多筆
            //var hasRows = (multis[i][1] !== null && multis[i][1] !== undefined);
            //if (hasRows)
            //    multis[i][1].rows = rows2;

            //刪除資料
            deletes[i] = multis[i].deletes;
        }

        //加入
        data.append('rows', _Json.toStr(rows));     //加入多筆
        data.append('deletes', _EditMany.keysToStr(deletes));  //輸出字串
        return data;
    },

    //??
    //捲動畫面到第一個錯誤欄位
    zz_scrollTopError: function () {
        $('.' + _Fun.errLabCls).each(function (i, data) {
            if ($(data).is(':visible')) {
                const t = $(data);
                const x = $(t).offset().top - 185;

                if ($('.wrapper').parent().hasClass('slimScrollDiv'))
                    $('.wrapper').slimScroll({ scrollTo: x });
                else if ($('.wrapper').hasClass('noWrapperScroll'))
                    $('.scroolablePanel').slimScroll({ scrollTo: $(t).position().top - 200 });
                else
                    $("html, body").animate({ scrollTop: x }, "slow");
                return (false);
            }
        })
    },

    //keys is two dimension
    zz_keysToStr: function (keys: any[][]) {
        const strs: string[] = [];
        for (let i = 0; i < keys.length; i++) {
            strs[i] = (keys[i].length == 0)
                ? ''
                : keys[i].join(_Fun.RowSep);
        }
        return strs.join(_Fun.TableSep);
    },
    */

    /**
     * ??
     檢查欄位清單內是否有空白欄位, 如果有則顯示必填
     讀取 xd-required class
     如果欄位值有錯誤, 則會focus在第一個錯誤欄位
     包含多筆區域 !!
     //param {array} ids source field id array
     param {object} box box object, for 多筆畫面??
     //param {string} msg error msg, 如果沒輸入, 則使用 _BR.FieldRequired
     return {bool} true(field ok), false(has empty)
    */
    /*
    checkEmpty: function (box: JQuery): boolean {
        //clear error label first
        box.find('.' + _Fun.errCls).removeClass(_Fun.errCls);
        box.find('.' + _Fun.errLabCls).hide();

        //if (_Str.isEmpty(msg))
        //const msg = ;

        //get ids
        //var ids = [];
        let ok = true;
        box.find('.' + _Fun.XdRequired).each(function () {
            const me = $(this);
            if (_Str.isEmpty(_Input.getO(me, box))) {
                ok = false;
                //me.addClass(_Fun.errCls);
                let id = _Obj.getId(me);
                if (_Str.isEmpty(id))
                    id = _Obj.getDid(me);
                _Input.showError(me, id, _BR.FieldRequired, box);
            }
        });
        return ok;

        //check if ids is string
        //if (typeof ids === 'string') {
        //    ids = [ ids ];    //把字串變成陣列
        //if (ids == null || ids.length == 0)
        //    return true;

    },
    */

    /*
    //把json的資料比對checkbox,相同值勾選起來(相同欄位名稱)
    jsonCheckBoxToForm: function (json: Json, boxId: string): void {
        const box = $('#' + boxId);
        Object.keys(json).map(function (key, index) {
            $('input[name=""]' + key).each(function () {
                if ($(this).val() == json[key]) {
                    $(this).prop("checked", true);
                }
            });
        });
    },
    */

    /*
    zz_reset: function (box: JQuery): void {
        //var box = $('#' + box);
        //文字欄位
        box.find('input:text').val('');
    },
    */

} //class