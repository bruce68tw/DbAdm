export default class UiItemTypeEstr {

	static readonly Input = 'I';		//輸入欄位(含唯讀欄位)
	static readonly Group = 'G';		//分群文字
	static readonly Checks = 'CS';	//check list, 行為類似 input, 不是容器
	//static readonly Span = 'S';	//只能放 input
	static readonly RowBox = 'R';	//2/3欄, 只能放 group, input, checks, span
	static readonly Table = 'T';		//只能放 input
	static readonly TabPage = 'TP';	//(暫不使用)只能放 box, group, input, checks, span
}