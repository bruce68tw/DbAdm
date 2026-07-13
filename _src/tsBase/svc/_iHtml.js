import _iBase from './_iBase';
class _iHtml extends _iBase {
    static getO(obj) {
        //return obj.html();
        //return obj.val();
        return obj.summernote('code');
    }
    static setO(obj, value) {
        //value = $('<div/>').html(value).text(); //decode
        obj.summernote('code', value);
        //obj.html(value);
        //obj.val(value);
    }
    //set edit status
    static setEditO(obj, status) {
        obj.summernote(status ? 'enable' : 'disable');
    }
    /**
     * init html editor
     * param edit {object} EditOne/EditMany object
     * param prog {string} program code
     * param height {int} (optional)input height(px)
     */
    static init(edit, prog, height) {
        edit.eform.find(_iHtml.Filter).each(function () {
            const upMe = $(this);
            upMe.data('prog', prog); //for onImageUpload()
            //init summernote
            upMe.summernote({
                height: height || 200,
                //new version use callbacks !!
                callbacks: {
                    /*
                    */
                    //https://codepen.io/ondrejsvestka/pen/PROgzQ
                    onChange: function (contents, $editable) {
                        //sync value
                        const me = $(this);
                        if (me.summernote('isEmpty')) {
                            me.val('');
                            //empty html value, carefully cause endless loop !!
                            let me2 = me;
                            if (me2.summernote('code') !== '') {
                                me2.summernote('code', '');
                            }
                        }
                        else {
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
                    onImageUpload: function (files) {
                        const me = $(this); //jquery object
                        const data = new FormData();
                        data.append('file', files[0]);
                        //data.append('prog', me.data('prog'));
                        $.ajax({
                            data: data,
                            type: "POST",
                            url: "SetHtmlImage", //backend fixed action !!
                            cache: false,
                            contentType: false,
                            processData: false,
                            success: function (url) {
                                //create image element & add into editor
                                const image = document.createElement('img');
                                image.src = url;
                                me.summernote('insertNode', image); //new version syntax !!
                            }
                        });
                    },
                },
                //=== add image ext attr start ===
                /*
                lang: _Fun.locale,
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
            }); //summernote()
        }); //each()
    }
    //set edit status for all html input
    static setEdits(box, subFilter, status) {
        const item = box.find(_iHtml.Filter + subFilter);
        if (item.length > 0) {
            item.summernote(status ? 'enable' : 'disable');
        }
    }
}
//constant
_iHtml.Filter = '[data-type=html]';
export default _iHtml;
Object.assign(_iHtml, _iBase);
