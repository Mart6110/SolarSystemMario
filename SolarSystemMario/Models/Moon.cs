using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace SolarSystemMario.Models
{
    public class Moon
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public double Size { get; set; }
        [Required]
        public double Average_Distance_From_Planet { get; set; }
        [Required]
        public double Orbit_Around_Planet { get; set; }
        [Required]
        public int Number_Of_Rings { get; set; }
        public int Number_Of_Moons { get; set; }
        public int Planet_id { get; set; }
    }
}
