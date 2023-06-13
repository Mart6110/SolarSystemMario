using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace SolarSystemMario.Models
{
    public class Star
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public double Size { get; set; }
        [Required]
        public string Type { get; set; }
        [Required]
        public double Age { get; set; }
        
    }
}
