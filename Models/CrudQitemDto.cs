namespace DbAdm.Models
{
    //for Gen Crud Fitems/F0items
    public class CrudQitemDto : CrudQEitemDto
    {
        //base
        public string CrudId { get; set; } = "";

        public bool IsFind2 { get; set; }   //for copy to FitemDto
        public string Op { get; set; } = "";

        //extend-for read view
        public string RvStr { get; set; } = "";       //Read View item str
    }
}