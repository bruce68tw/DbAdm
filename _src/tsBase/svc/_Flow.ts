//簽核流程相關
class _Flow {
    //顯示簽核記錄
    static showSignRows(tbody: JQuery, rows?: Json[]): void {
        tbody.empty();
        if (rows == null) return;

        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
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
    }
}
window._Flow = _Flow;