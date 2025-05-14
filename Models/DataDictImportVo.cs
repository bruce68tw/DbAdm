using System.ComponentModel.DataAnnotations;

namespace DbAdm.Models
{
    public class DataDictImportVo
    {
        [Required]
        [StringLength(20)]
        public string Name { get; set; } = "";

        [Required]
        [StringLength(20)]
        public string Account { get; set; } = "";

        [Required]
        [StringLength(32)]
        public string Pwd { get; set; } = "";

        [Required]
        [StringLength(10)]
        public string DeptId { get; set; } = "";

        /*
        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            //when validate fail.
            yield return new ValidationResult(
                $"Error Msg",
                new[] { nameof(field name) });
        }
        */

    }//class
}