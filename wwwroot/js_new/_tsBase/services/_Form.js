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
    static toRow(form) {
        //skip link & read fields
        let row = {};
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
        let json: { [key: string]: any } = {};
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
    static toRowStr(form) {
        return JSON.stringify(_Form.toRow(form));
    }
    /**
     * load json row into form UI (container object)
     * param form {object} form or box object
     * param json {json}
     */
    static loadRow(form, row) {
        for (const key in row)
            _Input.set(key, row[key], form);
    }
    /**
     * reset all inputs with name attribute
     * param form {object}
     */
    static reset(form) {
        form.find(_Input.fidFilter()).each(function () {
            _Input.setO($(this), '', form);
        });
    }
    /**
     * check has file input or not
     */
    static hasFile(form) {
        return (form.find(':file').length > 0);
    }
    /**
     * set form inputs edit status
     * param form {object} jquery form/box
     * param status {bool} edit status
     */
    static setEdit(form, status) {
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
    static hideShow(hides, shows) {
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
} //class
//# sourceMappingURL=../../../map/_tsBase/services/_Form.js.map