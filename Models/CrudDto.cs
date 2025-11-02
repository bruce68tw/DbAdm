using System.Collections.Generic;

namespace DbAdm.Models
{
    //for Gen Crud
    public class CrudDto
    {
        //base crud
        public string Id { get; set; } = "";
        public bool IsUi { get; set; }
        public string Project { get; set; } = "";     //project code
        public string ProjectPath { get; set; } = "";
        public string ProgCode { get; set; } = "";    //program code
        public string ProgName { get; set; } = "";

        //base read
        public string ReadSql { get; set; } = "";
        public string TableAs { get; set; } = "";
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
        public List<CrudQitemDto>? Qitems { get; set; }      //find columns
        public List<CrudQitemDto>? Qitems2 { get; set; }     //find2 columns
        public List<CrudRitemDto>? Ritems { get; set; }      //find result columns
        public CrudEtableDto MainTable { get; set; } = null!;
        public List<CrudEtableDto>? ChildTables { get; set; }

        //extend
        public bool HasFitemCols { get; set; }    //whether fitem has default cols

        /// <summary>
        /// read service item string
        /// </summary>
        public List<string>? RsItemStrs { get; set; }

        /// <summary>
        /// js column define string
        /// </summary>
        public List<string>? JsColDefStrs { get; set; }

        /// <summary>
        /// list of ", _me.mXXX" 
        /// </summary>
        public string ManyTables { get; set; } = "";

        /// <summary>
        /// (controller)read view select/radio col string list
        /// </summary>
        public List<string>? ReadSelectCols { get; set; }

        /// <summary>
        /// (controller)edit view select/radio col string list
        /// </summary>
        //public List<string>? EditSelectCols { get; set; }

        /// <summary>
        /// has async ReadSelectCols or EditSelectCols
        /// </summary>
        public bool HasSelectA { get; set; }

        //file
        public bool HasFile { get; set; }

        /// <summary>
        /// file input arguments string, variables name
        /// </summary>
        public string FileEditArg { get; set; } = "";

        /// <summary>
        /// type and name
        /// </summary>
        public string FileEditTypeArg { get; set; } = "";

        /// <summary>
        /// only master file
        /// </summary>
        public bool FileType0 { get; set; }

        /// <summary>
        /// has both master and child files
        /// </summary>
        public bool FileType1 { get; set; }

        /// <summary>
        /// master/child file string list for editService
        /// </summary>
        public List<string>? FileEditStrs { get; set; }

        /// <summary>
        /// crud.AuthType == 0,1,2
        /// </summary>
        public bool AuthType0 { get; set; }
        public bool AuthType1 { get; set; }
        public bool AuthType2 { get; set; }
    }
}