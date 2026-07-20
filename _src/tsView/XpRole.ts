class XpRoleVo {
    mUserRole = new EditMany('Id', 'tbodyUserRole', 'tplUserRole', 'tr');
    mRoleProg = new EditMany('Id', 'tbodyRoleProg', 'tplRoleProg', 'tr');

    divUrBody = $('#tbodyUserRole');    //tbody of user role
    tplUr = $('#tplUserRole').html();   //tpl of user role
    modalUser = $('#modalUser');        //modal for select user
    modalUserBody: JQuery;  // = modalUser.find('tbody');
    tplUser = $('#tplUser').html();     //tpl of modal user row

    constructor() {
        this.modalUserBody = this.modalUser.find('tbody');
    }

    //on open select user modal
    onOpenUser() {
        _Modal.show(this.modalUser);
    }

    //onclick find user
    async onFindUserA() {
        var data = {
            account: _iText.get('Account', this.modalUser),
            deptId: _iSelect.get('DeptId', this.modalUser),
            name: _iText.get('Name', this.modalUser),
        };
        await _Ajax.getJsonA('GetUsers', data, (rows) => {
            this.modalUserBody.empty();
            for (var i = 0; i < rows.length; i++) {
                //這裡不必註記"新增"
                this.modalUserBody.append($(Mustache.render(this.tplUser, rows[i])));
            }
        });
    }

    //onclick ok at Item(R/Q/E) modal
    onUserModalOk() {
        //get checked columns list
        var rows = [];
        this.modalUserBody.find(':checkbox:checked').each(function (idx) {
            var obj = $(this);
            var tr = obj.closest('tr');
            //data 屬性不區分大小寫 !!
            rows[idx] = {
                UserId: tr.data('id'),
                Account: tr.data('account'),
                UserName: tr.data('username'),
                DeptName: tr.data('deptname'),
            };
        });
        var rowLen = rows.length;
        if (rowLen === 0) {
            _Tool.msg('請先選取資料。');
            return;
        }

        //append rows if not existed
        for (var i = 0; i < rowLen; i++) {
            //check existed
            var row = rows[i];
            if (this.divUrBody.find('[value=' + row.UserId + ']').length > 0)
                continue;

            var tr = $(Mustache.render(this.tplUr, row));
            _Form.loadRow(tr, row);
            this.mUserRole.setNewIdByBox(tr);
            this.divUrBody.append(tr);
        }

        //remove checked for next usage, hide modal
        this.modalUser.find(':checkbox:checked').prop('checked', false);
        _Modal.hide(this.modalUser);
    }
}
_vo = new XpRoleVo();
var vo = _vo as XpRoleVo;

_me = {
    init: function () {        
        //datatable config
        var config = {
            columns: [
                { data: 'Name' },
                { data: '_Fun' },
            ],
            columnDefs: [
				{ targets: [1], render: function (data, type, full, meta) {
                    return _me.crudR.dtCrudFun(full.Id, full.Name, true, true, true);
                }},
            ],
        };

        //initial
        new CrudR(config, [null, _vo.mUserRole, _vo.mRoleProg]);
    },

}; //class
