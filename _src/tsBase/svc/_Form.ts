//UI表
class _Form {
    /**
     * get input values, 排除不儲存的欄位, 可用在多筆的單行
     * param form {object} input form
     * return {json}
     */ 
    static toRow(form: JQuery): Json {
        //skip link & read fields
        const row: Json = {};
        form.find(_Input.fidFilter()).filter(':not(.xi-unsave)').each(function (this: any) {
            const obj = $(this);
            row[_Input.getFid(obj)] = _Input.getO(obj, form);            
        });
        return row;
    }

    static toRowStr(form: JQuery): string {
        return JSON.stringify(_Form.toRow(form));
    }

    /**
     * load json row into form UI (container object)
     * param form {object} form or box object
     * param json {json}
     */
    static loadRow(form: JQuery, row: Json) {
        for (const key in row) {
            if (Object.prototype.hasOwnProperty.call(row, key)) {
                _Input.set(key, row[key], form);
            }
        }
    }

    /**
     * reset all inputs with name attribute
     * param form {object}
     * param init {bool} 是否填入初始值, default false
     */
    static reset(form: JQuery, init?: boolean) {
        const items = form.find(_Input.fidFilter());
        if (init) {
            items.each(function (this: Elm) {
                const obj = $(this);
                _Input.setO(obj, obj.data('init'), form);
            });
        } else {
            items.each(function (this: Elm) {
                _Input.setO($(this), '', form);
            });
        }
    }

    /**
     * check has file input or not
     */ 
    static hasFile(form: JQuery): boolean {
        return form.find(':file').length > 0;
    }

    /**
     * set form inputs edit status
     * param form {object} jquery form/box
     * param status {bool} edit status
     */
    static setEdit(form: JQuery, status: boolean) {
        //text & textArea
        _iText.setEditO(form.find('input:text'), status);
        _iTextarea.setEditO(form.find('textarea'), status);

        //date, dt
        _iDate.setEditO(form.find('.date input'), status);

        //dropdown
        _iSelect.setEditO(form.find('select'), status);

        //checkbox & radio
        _iCheck.setEditO(form.find(':checkbox'), status);
        _iRadio.setEditO(form.find(':radio'), status);

        //TODO: html

        //button
        _Btn.setEdit(form.find('button'), status);
    }

    /**
     * hide(first) & show div with effect
     * param hides {array} object array to hide
     * param shows {array} object array to show
     */
    static hideShow(hides?: JQuery[], shows?: JQuery[]) {
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
}
window._Form = _Form;