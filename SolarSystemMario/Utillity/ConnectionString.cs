using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SolarSystemMario.Utillity
{
    public static class ConnectionString
    {
        private static string cName = "Data Source=WEBSERVER\\VETCLINIC2022;Initial Catalog=Solar;User ID=sa;Password=Kode1234!";
        public static string CName { get => cName; }
    }
}
