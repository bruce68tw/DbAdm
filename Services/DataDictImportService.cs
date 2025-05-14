using Base.Models;
using Base.Services;
using BaseApi.Services;
using DbAdm.Enums;
using DbAdm.Tables;

namespace DbAdm.Services
{
    public class DataDictImportService
    {
        /// <summary>
        /// import excel file
        /// </summary>
        /// <param name="file"></param>
        /// <returns>ResultImportDto</returns>
        public async Task<ResultImportDto> ImportA(IFormFile file, string dirUpload)
        {
            var importDto = new ExcelImportDto<DataDict>()
            {
                ImportType = ImportTypeEstr.DataDict,
                TplPath = _Xp.DirTpl + "DataDict.xlsx",
                FnSaveImportRows = FnSaveImportRows,
                CreatorName = _Fun.GetBaseUser().UserName,
            };
            return await _HttpExcel.ImportByFileA(file, dirUpload, importDto);
        }

        /// <summary>
        /// check & save DB
        /// </summary>
        /// <param name="okRows"></param>
        /// <returns>list error/empty, 對應okRows </returns>
        private List<string> FnSaveImportRows(List<DataDict> okRows)
        {
            var db = _Xp.GetDb();
            var errors = new List<string>();
            var tableTypes = db.XpCode
                .Where(a => a.Type == "TableType")
                .Select(a => a.Value)
                .ToList();
            foreach (var row in okRows)
            {
                //資料已經存在
                if (db.DataDict.FirstOrDefault(a => a.Code == row.Code) != null)
                {
                    errors.Add("資料已經存在。");
                    continue;
                }

                //TableType 不正確
                if (!string.IsNullOrEmpty(row.TableType) && tableTypes.FirstOrDefault(a => a == row.TableType) == null)
                {
                    errors.Add("TableType欄位不正確。");
                    continue;
                }

                #region set entity model & save db
                db.DataDict.Add(row);

                //save db
                try
                {
                    db.SaveChanges();
                    errors.Add("");
                }
                catch (Exception ex)
                {
                    errors.Add(ex.InnerException!.Message);
                }
                #endregion
            }
            return errors;
        }
    } //class
}