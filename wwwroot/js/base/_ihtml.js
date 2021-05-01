/*
 * html input, use summernote !!
 */
var _ihtml = $.extend({}, _ibase, {

    //constant
    //BoxFilter: '.date',

    getO: function (obj) {
        //return obj.html();
        //return obj.val();
        return obj.summernote('code');
    },

    setO: function (obj, value) {
        //value = $('<div/>').html(value).text(); //decode
        obj.summernote('code', value);
        //obj.html(value);
        //obj.val(value);
    },

    /**
     * init html editor
     * param obj {objects} html input object array
     * param prog {string} program code
     * param height {int} input height(px)
     * param fnFileName {function} 傳回filename後面部分字串
     */
    init: function (box, prog, height, fnFileName) {
        height = height || 250;
        box.find('[data-type=html]').summernote({
            height: height,
            //new version use callbacks
            callbacks: {
                onImageUpload: function (files) {
                    var editor = $(this);   //summernote instance !!
                    var data = new FormData();
                    data.append('file', files[0]);
                    //fileName for file name
                    var fileName = (fnFileName === undefined)
                        ? prog + '_' + _obj.getFid($(this).closest('textarea'))
                        : fnFileName();
                    data.append('fileName', fileName);
                    $.ajax({
                        data: data,
                        type: "POST",
                        url: "../Image/Upload",
                        cache: false,
                        contentType: false,
                        processData: false,
                        success: function (url) {
                            //create image element & add into editor
                            var image = document.createElement('img');
                            image.src = url;
                            //new version syntax !!
                            editor.summernote('insertNode', image);
                        }
                    });
                },
            },

            //=== add image ext attr start ===
            popover: {
                image: [
                    ['custom', ['imageAttributes']],
                    ['imagesize', ['imageSize100', 'imageSize50', 'imageSize25']],
                    ['float', ['floatLeft', 'floatRight', 'floatNone']],
                    ['remove', ['removeMedia']]
                ],
            },
            lang: _fun.locale,
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
            //=== add image ext attr start ===

        });
    },

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
        var filter = '#' + fid;
        var obj = (box === undefined) ? $(filter) : box.find(filter);
        //obj.text(value);
        //obj.summernote('code', $(filter).text());
        //debugger;
        obj.summernote('code', obj.text());
    },
    updates: function (fids, box) {
        for (var i = 0; i < fids.length; i++)
            _ihtml.update(fids[i], box);
    },
    
}); //class