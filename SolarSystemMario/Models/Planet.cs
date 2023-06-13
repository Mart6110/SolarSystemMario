using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace SolarSystemMario.Models
{
    public class Planet
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public double Size { get; set; }
        [Required]
        public string Type { get; set; }
        [Required]
        public double Distance_From_The_Sun { get; set; }
        [Required]
        public double Length_Of_Year { get; set; }
        public int Number_Of_Rings { get; set; }
        public int Number_Of_Moons { get; set; }
        public int Star_id { get; set; }
    }
}
