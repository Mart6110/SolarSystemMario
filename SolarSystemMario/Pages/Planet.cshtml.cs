using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using SolarSystemMario.Models;

namespace SolarSystemMario.Pages
{
    public class PlanetModel : PageModel
    {
        PlanetDAL objplanet = new PlanetDAL();
        public Planet planet { get; set; }
        public ActionResult OnGet(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }
            planet = objplanet.GetPlanetData(id);

            if (planet == null)
            {
                return NotFound();
            }
            return Page();
        }
    }
}
