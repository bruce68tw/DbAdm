using System.Collections.Generic;

namespace DbAdm.Models
{
    //for Gen Crud
    public class CrudDto
    {
        //base-crud
        public string Id { get; set; }
        public string Project { get; set; }     //project code
        public string ProjectPath { get; set; }
        public string ProgCode { get; set; }    //program code
        public string ProgName { get; set; } 
        //base-read
        public string ReadSql { get; set; }
        public string TableAs { get; set; }
        public bool LabelHori { get; set; }

        public bool HasCreate { get; set; }
        public bool HasUpdate { get; set; }
        public bool HasDelete { get; set; }
        public bool HasView { get; set; }
        public bool HasExport { get; set; }
        public bool HasReset { get; set; }

        //extend
        public bool HasEditForm { get; set; }   //edit form
        public bool HasFindForm { get; set; }   //find form
        public bool HasFind2Form { get; set; }  //find2 form

        //read from DB
        public List<CrudQitemDto> Fitems { get; set; }      //find column
        public List<CrudQitemDto> F2items { get; set; }     //find2 column
        public List<CrudRitemDto> Ritems { get; set; }      //find result column
        public CrudEtableDto MainTable { get; set; }
        public List<CrudEtableDto> ChildTables { get; set; }

        //extend
        public bool HasFitemCols { get; set; }    //whether fitmem has default cols
        public List<string> RsItemStrs { get; set; }       
        public List<string> JsColDefStrs { get; set; }     //js column define string
        public string ManyTables { get; set; }             //list of ", _me.mXXX" 

        public List<string> ReadSelectCols { get; set; }    //read view select cols
        public List<string> EditSelectCols { get; set; }    //edit view select cols

        //find
        public bool HasFile { get; set; }

        //crud.AuthType == 0,1,2
        public bool AuthType0 { get; set; }
        public bool AuthType1 { get; set; }
        public bool AuthType2 { get; set; }
    }
}