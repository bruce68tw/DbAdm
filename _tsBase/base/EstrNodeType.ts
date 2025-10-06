//flow node type enum
export default class EstrNodeType {
    // 原始物件字面量中的常數值被轉換為 static readonly 屬性，以符合 class 語法
    // 且保持 EstrNodeType.Start 這樣的外部存取方式。

    static readonly Start: string = 'S';		//startNode
    static readonly End: string = 'E';		//endNode
    static readonly Node: string = 'N';		//normal node
    //Auto: 'A',	//auto

}