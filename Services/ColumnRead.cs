using Base.Enums;
using Base.Models;
using Base.Services;
using Newtonsoft.Json.Linq;
using System.Threading.Tasks;

//�ק�:DbAdm �令�A���M�� -> AdoptAdm
//�ק�:Column �令�A��controller -> Maker
namespace DbAdm.Services
{
    public class ColumnRead
    {
        private readonly ReadDto dto = new()
        {
            //�ק�:Ū����ƪ�sql,��쥲�������d�ߵ��G���������
            //1.set ReadSql
            ReadSql = @"
Select c.*,
    CreatorName=u.Name,
    p.Code as ProjectCode, t.Code as TableCode
From dbo.[Column] c
inner join dbo.[Table] t on t.Id=c.TableId
inner join dbo.Project p on p.Id=t.ProjectId
left join dbo.XpUser u on p.Creator=u.Id
Order by p.Id, t.Id, c.Sort
",
            TableAs = "c",

            //�ק�:�d�߱����J���,�P�d�ߵe������
            //2.set query fields
            Items = [
                new() { Fid = "ProjectId", Col = "t.ProjectId" },
                new() { Fid = "TableCode", Col = "t.Code", Op = ItemOpEstr.Like },
                new() { Fid = "Code", Op = ItemOpEstr.Like },
            ],
        };

        //�Ǧ^�@�����, DtDto�]�t�n�d�ߪ�����M�����B����
        public async Task<JObject?> GetPageA(DtDto dt)
        {
            //3.call CrudRead.GetPage()
            return await new CrudReadSvc().GetPageA(dto, dt);
        }        

    } //class
}
