using Base.Models;
using Base.Services;

//修改:DbAdm 改成你的專案 -> AdoptAdm
//修改:Column 改成你的controller -> Maker
namespace DbAdm.Services
{
    public class ColumnEdit : BaseEditSvc
    {
        public ColumnEdit(string ctrl) : base(ctrl) { }

        override public EditDto GetDto()
        {
            //修改:改成實際要寫入的資料表資訊
            return new EditDto()
            {                
                Table = "dbo.[Column]",
                PkeyFid = "Id",
                Col4 = null,    //Creator,Created,Reviser,Revised 4個欄位

                //修改:如果單筆資料有join, 則必須寫ReadSql, 否則不必, _Fun.FidUser、_Fun.FidDept用來控制資料權限
                ReadSql = $@"
select c.*,
    CreatorName=u.Name,
    p.Code as ProjectCode, t.Code as TableCode,    
    {_Fun.FidUser}=u.Id, {_Fun.FidDept}=u.DeptId
from dbo.[Column] c
join dbo.[Table] t on t.Id=c.TableId
join dbo.Project p on p.Id=t.ProjectId
left join dbo.XpUser u on p.Creator=u.Id
where c.Id=@Id
",
                //修改:要寫入的欄位清單
                Items = [
                    new() { Fid = "Id" },
                    new() { Fid = "Fid" },
                    new() { Fid = "Name" },
                    new() { Fid = "Status" },
                    new() { Fid = "Note" },
                ],
            };
        }

    } //class
}
