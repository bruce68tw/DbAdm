namespace DbAdm.Models
{
    /// <summary>
    /// get from appSettings.json MyConfig section
    /// </summary>
    public class MyConfigDto
    {
        //部門名稱
        public string DeptName { get; set; } = "";

        //web 主機 url for email link
        public string ServerUrl { get; set; } = "";
        
    }
}
