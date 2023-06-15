using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;
using SolarSystemMario.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SolarSystemMario.Pages
{
    public class IndexModel : PageModel
    {
        PlanetDAL objplanet = new PlanetDAL();
        public List<Planet> planets { get; set; }

        public void OnGet()
        {
            planets = objplanet.GetAllPlanets().ToList();
        }

        private readonly ILogger<IndexModel> _logger;

        public IndexModel(ILogger<IndexModel> logger)
        {
            _logger = logger;
        }
    }
}
