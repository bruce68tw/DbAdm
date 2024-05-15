using Base.Models;
using Base.Services;

namespace DbAdm.Services
{
    public class MyCrudEdit : BaseEditSvc
    {
        public MyCrudEdit(string ctrl) : base(ctrl) { }

        override public EditDto GetDto() {
            //4 tables
            return new EditDto
            {
                Table = "dbo.Crud",
                PkeyFid = "Id",
                Col4 = new string[] { "", "Created", "", "Revised"},
                Items = new EitemDto[] {
                    new() { Fid = "Id" },
                    new() { Fid = "ProjectId", Required = true },
                    new() { Fid = "ProgCode", Required = true },
                    new() { Fid = "ProgName", Required = true },
                    new() { Fid = "LabelHori", Required = true },
                    new() { Fid = "ReadSql" },
                    new() { Fid = "TableAs" },
                    new() { Fid = "HasCreate" },
                    new() { Fid = "HasUpdate" },
                    new() { Fid = "HasDelete" },
                    new() { Fid = "HasView" },
                    new() { Fid = "HasExport" },
                    new() { Fid = "HasReset" },
                    new() { Fid = "AuthType", Required = true },
                    new() { Fid = "Status", Required = true },
                },
                Childs = new EditDto[]
                {
                    new EditDto
                    {
                        //all child readSql use 'in'
                        ReadSql = @"
select a.*,
	c.Code, c.Name, c.DataType
from dbo.CrudQitem a
join dbo.[Column] c on a.ColumnId=c.Id
where a.CrudId=@Id
order by a.Sort
",
                        Table = "dbo.CrudQitem",                        
                        PkeyFid = "Id",
                        FkeyFid = "CrudId",
                        OrderBy = "Sort",
                        Col4 = null,
                        Items = new EitemDto[] {
                            new() { Fid = "Id" },
                            new() { Fid = "CrudId" },
                            new() { Fid = "ColumnId", Required = true },
                            new() { Fid = "TableAs" },
                            new() { Fid = "QitemType", Required = true },
                            new() { Fid = "ItemData" },
                            new() { Fid = "Op", Required = true },
                            new() { Fid = "IsRange" },
                            new() { Fid = "IsFind2" },
                            new() { Fid = "PosGroup" },
                            new() { Fid = "LayoutCols" },
                            //new() { Fid = "ExtInfo" },
                            new() { Fid = "Sort", Required = true },
                        },
                    },
                    new EditDto
                    {
                        ReadSql = @"
select a.*
from dbo.CrudRitem a
where a.CrudId=@Id
order by a.Sort
",
                        Table = "dbo.CrudRitem",
                        PkeyFid = "Id",
                        FkeyFid = "CrudId",
                        OrderBy = "Sort",
                        Col4 = null,
                        Items = new EitemDto[] {
                            new() { Fid = "Id" },
                            new() { Fid = "CrudId" },
                            new() { Fid = "ColumnCode", Required = true },
                            new() { Fid = "Name", Required = true },
                            new() { Fid = "Width", /*Type = ItemTypeEnum.Num*/ },
                            new() { Fid = "RitemType", Required = true },
                            //new() { Fid = "ExtInfo" },
                            new() { Fid = "Sort", Required = true },
                        },
                    },
                    new EditDto
                    {
                        Table = "dbo.CrudEtable",
                        PkeyFid = "Id",
                        FkeyFid = "CrudId",
                        OrderBy = "Sort",
                        Col4 = null,
                        Items = new EitemDto[] {
                            new() { Fid = "Id" },
                            new() { Fid = "CrudId" },
                            new() { Fid = "TableId", Required = true },
                            new() { Fid = "PkeyFid", Required = true },
                            new() { Fid = "FkeyFid" },
                            new() { Fid = "AutoIdLen" },
                            new() { Fid = "Col4" },
                            new() { Fid = "HalfWidth" },
                            new() { Fid = "OrderBy" },
                            new() { Fid = "Sort", Required = true },
                        },
                        Childs = new []
                        {
                            //注意: 第2層child ReadSql where 使用 xxx in ({0}) 
                            new EditDto
                            {
                                ReadSql = @"
select a.*,
	c.Code, c.Name, c.DataType
from dbo.CrudEitem a
join dbo.[Column] c on a.ColumnId=c.Id
where a.EtableId in ({0})
order by a.Sort
",
                                Table = "dbo.CrudEitem",
                                PkeyFid = "Id",
                                FkeyFid = "EtableId",
                                OrderBy = "Sort",
                                Col4 = null,
                                Items = new EitemDto[] {
                                    new() { Fid = "Id" },
                                    new() { Fid = "EtableId" },
                                    new() { Fid = "ColumnId", Required = true },
                                    new() { Fid = "EitemType", Required = true },
                                    new() { Fid = "ItemData" },
                                    new() { Fid = "Required" },
                                    new() { Fid = "HasCreate" },
                                    new() { Fid = "HasUpdate" },
                                    new() { Fid = "PlaceHolder" },                                    
                                    new() { Fid = "DefaultValue" },
                                    new() { Fid = "PosGroup" },
                                    new() { Fid = "LayoutCols" },
                                    new() { Fid = "Width" },
                                    new() { Fid = "CheckType" },
                                    new() { Fid = "CheckData" },
                                    new() { Fid = "Sort" },    //by backend
                                },
                            },
                        },
                    },
                },
            };      
        }

    } //class
}
