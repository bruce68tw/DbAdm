class UiItemTypeEstr {
}
UiItemTypeEstr.Input = 'I'; //輸入欄位(含唯讀欄位)
UiItemTypeEstr.Group = 'G'; //分群文字
UiItemTypeEstr.Checks = 'CS'; //check list, 行為類似 input, 不是容器
//static readonly Span = 'S';	//只能放 input
UiItemTypeEstr.RowBox = 'R'; //2/3欄, 只能放 group, input, checks, span
UiItemTypeEstr.Table = 'T'; //只能放 input
UiItemTypeEstr.TabPage = 'TP'; //(暫不使用)只能放 box, group, input, checks, span
export default UiItemTypeEstr;
