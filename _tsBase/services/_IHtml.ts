// @ts-nocheck
import _IBase from "./_IBase";

/**
 * /*
 * html input, use summernote !!
 */
export default class _IHtml extends _IBase {

    //constant
    static Filter: string = '[data-type=html]';

    static getO(obj: JQuery): string {
        //return obj.html();
        //return obj.val();
        // Assuming summernote is attached to JQuery, type casting is needed for 'summernote' method
        return (obj as any).summernote('code');
    }

    static setO(obj: JQuery, value: string): void {
        //value = $('<div/>').html(value).text(); //decode
        (obj as any).summernote('code', value);
        //obj.html(value);
        //obj.val(value);
    }

    //set edit status
    static setEditO(obj: JQuery, status: boolean): void {
        (obj as any).summernote(status ? 'enable' : 'disable');
    }

    /**
     * init html editor
     * param edit {object} EditOne/EditMany object. Assuming it has a validator and eform property.
     * param prog {string} program code
     * param height {int} (optional)input height(px)
     */
    static init(edit: { eform: JQuery, validator: { element: (obj: JQuery) => void } }, prog: string, height?: number): void {
        edit.eform.find(_IHtml.Filter).each(function () {
            const upMe = $(this);
            upMe.data('prog', prog);    //for onImageUpload()
            //init summernote
            (upMe as any).summernote({
                height: height || 200,
                //new version use callbacks !!
                callbacks: {
                    /*
                    */
                    //https://codepen.io/ondrejsvestka/pen/PROgzQ
                    onChange: function (contents: string, $editable: JQuery) {

                        //sync value
                        const me = $(this);
                        if ((me as any).summernote('isEmpty')) {
                            me.val('');
                            //empty html value, carefully cause endless loop !!
                            if ((me as any).summernote('code') != '')
                                (me as any).summernote('code', '');
                        } else {
                            me.val(contents);
                        }
                        //me.val(me.summernote('isEmpty') ? '' : contents);

                        //re-validate
                        edit.validator.element(me);

                        /*
                        var me = $(this);
                        me.val(me.summernote('isEmpty') ? "" : contents);
                        edit.validator.element(me);
                        */
                    },
                    onImageUpload: function (files: File[]) {
                        const me = $(this);   //jquery object
                        const data = new FormData();
                        data.append('file', files[0]);
                        //data.append('prog', me.data('prog'));
                        $.ajax({
                            data: data,
                            type: "POST",
                            url: "SetHtmlImage",    //backend fixed action !!
                            cache: false,
                            contentType: false,
                            processData: false,
                            success: function (url: string) {
                                //create image element & add into editor
                                const image = document.createElement('img');
                                image.src = url;
                                (me as any).summernote('insertNode', image); //new version syntax !!
                            }
                        });
                    },
                },

                //=== add image ext attr start ===
                /*
                lang: _fun.locale,
                popover: {
                    image: [
                        ['custom', ['imageAttributes']],
                        ['imagesize', ['imageSize100', 'imageSize50', 'imageSize25']],
                        ['float', ['floatLeft', 'floatRight', 'floatNone']],
                        ['remove', ['removeMedia']]
                    ],
                },
                imageAttributes: {
                    imageDialogLayout: 'default', // default|horizontal
                    icon: '<i class="note-icon-pencil"/>',
                    removeEmpty: false // true = remove attributes | false = leave empty if present
                },
                displayFields: {
                    imageBasic: true,  // show/hide Title, Source, Alt fields
                    imageExtra: false, // show/hide Alt, Class, Style, Role fields
                    linkBasic: false,   // show/hide URL and Target fields for link
                    linkExtra: false   // show/hide Class, Rel, Role fields for link
                },
                */
                //=== add image ext attr start ===

            });//summernote()

        });//each()
    }

    //set edit status for all html input
    static setEdits(box: JQuery, subFilter: string, status: boolean): void {
        const items = box.find(_IHtml.Filter + subFilter);
        if (items.length > 0)
            (items as any).summernote(status ? 'enable' : 'disable');
    }

    /*
    //see: https://stackoverflow.com/questions/14346414/how-do-you-do-html-encode-using-javascript
    encode: function (value) {
        return $('<div/>').text(value).html();
    },

    decode: function(value){
        return $('<div/>').html(value).text();
    },

    //encode row
    encodeRow: function (row, fids) {
        for (var i = 0; i < fids.length; i++) {
            var fid = fids[i];
            row[fid] = _ihtml.encode(row[fid]);
        }
        return row;
    },

    //更新html欄位內容, 讀取 text()
    update: function(fid, box) {
        //var filter = '#' + fid;
        //var obj = (box === undefined) ? $(filter) : box.find(filter);
        var obj = _obj.get(fid, box);
        //obj.text(value);
        //obj.summernote('code', $(filter).text());
        //debugger;
        obj.summernote('code', obj.text());
    },
    updates: function (fids, box) {
        for (var i = 0; i < fids.length; i++)
            _ihtml.update(fids[i], box);
    },
    */

} //class