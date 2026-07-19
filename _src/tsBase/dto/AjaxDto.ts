class AjaxDto {
    url: string;
    type: string;
    data: any;
    dataType: string;
    cache?: boolean;
    contentType?: boolean | string;
    processData?: boolean;
}
window.AjaxDto = AjaxDto;