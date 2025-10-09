//flow node type enum
class NodeTypeEstr {
}
// 原始物件字面量中的常數值被轉換為 static readonly 屬性，以符合 class 語法
// 且保持 NodeTypeEstr.Start 這樣的外部存取方式。
NodeTypeEstr.Start = 'S'; //startNode
NodeTypeEstr.End = 'E'; //endNode
NodeTypeEstr.Node = 'N'; //normal node
export default NodeTypeEstr;
//# sourceMappingURL=../../../../_ts/wwwroot/map/base/services/NodeTypeEstr.js.map