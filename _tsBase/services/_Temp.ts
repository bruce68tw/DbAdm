//temp variables
export default class _Temp {

    // 在 TypeScript 靜態類別中，通常會使用靜態屬性來代替原始 JS 對象的屬性。
    // 由於原始 JS 文件中 _temp 是一個空對象，我們可以用一個靜態屬性來表示其作為臨時變量容器的角色。
    // 或者只保留類別本身作為命名空間。這裡採用保留類別的結構。

} //class

// 如果需要一個可供外部訪問的靜態屬性作為容器，可以這樣寫:
// export default class _Temp {
//     public static data: { [key: string]: any } = {};
// }
// 但為了最嚴格地符合原始代碼 (空對象)，我們只保留類別結構。