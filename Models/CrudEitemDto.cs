namespace DbAdm.Models
{
    //for Gen Crud
    public class CrudEitemDto : CrudEitem0Dto
    {
        //base
        public string CrudId { get; set; }
        public string EtableId { get; set; }

        public bool HasCreate { get; set; }
        public bool HasUpdate { get; set; }

        //extend
        public string ServiceStr { get; set; }
        public string ViewStr { get; set; }
        public string HeadStr { get; set; }     //for child table, header string

    }
}