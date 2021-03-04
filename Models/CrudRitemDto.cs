namespace DbAdm.Models
{
    //for Gen Crud
    public class CrudRitemDto
    {
        //base
        public string CrudId { get; set; }
        //public string Column { get; set; }
        public string ColumnCode { get; set; }
        public string RitemType { get; set; }
        public string ExtInfo { get; set; }
        public string Name { get; set; }
        public int Width { get; set; }

        //extend
        public string ViewStr { get; set; }
    }
}