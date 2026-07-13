export default class _Flow {
    static showSignRows(tbody, rows) {
        tbody.empty();
        if (rows == null)
            return;
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            tbody.append(`
<tr>
    <td>${row.NodeName}</td>
    <td>${row.SignerName}</td>
    <td>${row.GetTime}</td>
    <td>${row.SignStatusName}</td>
    <td>${row.Note}</td>
</tr>`);
        }
    }
}
