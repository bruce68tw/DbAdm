// 假設的依賴靜態類別
import _Obj from "./_Obj";
// 假設 JQuery 已經在專案中定義或透過 @types/jquery 引入

/**
 * button helper class
 */
export default class _Btn {

    /**
     * Set the disabled status of a button or element identified by ID.
     * It relies on _Obj.getById to find the element.
     * param id {string} The ID of the button/element.
     * param status {boolean} true=enabled (disabled=false), false=disabled (disabled=true).
     * param box {any} (Optional) The context/container object for finding the element.
     */
    static setEdit(id: string, status: boolean, box?: any): void {
        //use _obj.getById() !!
        // 假設 _Obj.getById 返回一個 jQuery 物件
        _Btn.setEditO(_Obj.getById(id, box), status);
    }
    
    /**
     * Set the disabled status of a button or element using its object reference.
     * param obj {JQuery<HTMLElement>|any} The button/element object (usually a jQuery object).
     * param status {boolean} true=enabled (disabled=false), false=disabled (disabled=true).
     */
    static setEditO(obj: JQuery<HTMLElement> | any, status: boolean): void {
        // .prop('disabled', true) 會禁用按鈕，所以當 status 為 false 時應禁用
        obj.prop('disabled', !status);
    }
    
    /**
     * Set the disabled status of a button or element identified by form type (ft).
     * It relies on _Obj.getF to find the element.
     * param ft {string} The form type identifier.
     * param status {boolean} true=enabled (disabled=false), false=disabled (disabled=true).
     * param box {any} (Optional) The context/container object for finding the element.
     */
    static setEditF(ft: string, status: boolean, box?: any): void {
        // 假設 _Obj.getF 返回一個 jQuery 物件
        _Btn.setEditO(_Obj.getF(ft, box), status);
    }

}