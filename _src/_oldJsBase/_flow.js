
var _flow = {

    showSignRows: function (tbody, rows) {
        tbody.empty();
        if (rows == null) return;

        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            tbody.append(`
<tr>
    <td>${row.NodeName}</td>
    <td>${row.SignerName}</td>
    <td>${row.GetTime}</td>
    <td>${row.SignStatusName}</td>
    <td>${row.Note}</td>
</tr>`
            );
        }
    },

}; //class