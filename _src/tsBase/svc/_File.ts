import _Str from './_Str';

export default class _File {
  /**
   * get file name by path
   */
  static getFileName(path: string): string {
    const sep: '/' | '\\' = path.indexOf('/') > 0 ? '/' : '\\';
    return _Str.getTail(path, sep);
  }

  /**
   * get file ext without '.' in lowerCase, ex: txt
   */
  static getFileExt(path: string): string {
    return _Str.getTail(path, '.').toLowerCase();
  }

  static isImageExt(ext: string): boolean {
    return ",jpg,jpeg,png,gif,tif,tiff,".indexOf("," + ext + ",") >= 0;
  }

  static isExcelExt(ext: string): boolean {
    return ",xls,xlsx,".indexOf("," + ext + ",") >= 0;
  }
}