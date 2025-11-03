namespace DbAdm.Models
{
    //for Gen Crud
    public class CrudUiItemDto
    {
        public string Id { get; set; } = "";
        public string CrudId { get; set; } = "";
        public string BoxId { get; set; } = "";

        public int ChildNo { get; set; }

        public string ItemType { get; set; } = "";
        public string Info { get; set; } = "";
        public int Sort { get; set; }

    }
}