using SolarSystemMario.Utillity;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace SolarSystemMario.Models
{
    public class MoonDAL
    {
        string connectionString = ConnectionString.CName;

        public IEnumerable<Moon> GetAllMoons()
        {
            List<Moon> moons = new List<Moon>();

            using (SqlConnection con = new SqlConnection(connectionString))
            {
                SqlCommand cmd = new SqlCommand("SelectAllMoons", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();

                while (rdr.Read())
                {
                    Moon moon = new Moon();
                    moon.Id = Convert.ToInt32(rdr["Planet_id"]);
                    moon.Name = rdr["Planet_Name"].ToString();
                    moon.Size = Convert.ToDouble(rdr["Size"]);
                    moon.Average_Distance_From_Planet = Convert.ToDouble(rdr["Average_Distance_From_Planet"]);
                    moon.Orbit_Around_Planet = Convert.ToDouble(rdr["Orbit_Around_Planet"]);
                    moon.Number_Of_Rings = Convert.ToInt32(rdr["Number_Of_Rings"]);
                    moon.Number_Of_Moons = Convert.ToInt32(rdr["Number_Of_Moons"]);
                    moon.Planet_id = Convert.ToInt32(rdr["Planet_id"]);

                    moons.Add(moon);
                }

                con.Close();
            }
            return moons;
        }

        // Get a spcific Moon
        public Moon GetMoonData(int? id)
        {
            Moon moon = new Moon();

            using (SqlConnection con = new SqlConnection(connectionString))
            {
                string sqlQuery = "SELECT * FROM Moon WHERE Moon_id= " + id;
                SqlCommand cmd = new SqlCommand(sqlQuery, con);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();

                while (rdr.Read())
                {
                    moon.Id = Convert.ToInt32(rdr["Planet_id"]);
                    moon.Name = rdr["Planet_Name"].ToString();
                    moon.Size = Convert.ToDouble(rdr["Size"]);
                    moon.Average_Distance_From_Planet = Convert.ToDouble(rdr["Average_Distance_From_Planet"]);
                    moon.Orbit_Around_Planet = Convert.ToDouble(rdr["Orbit_Around_Planet"]);
                    moon.Number_Of_Rings = Convert.ToInt32(rdr["Number_Of_Rings"]);
                    moon.Number_Of_Moons = Convert.ToInt32(rdr["Number_Of_Moons"]);
                    moon.Planet_id = Convert.ToInt32(rdr["Planet_id"]);
                }
                return moon;
            }
        }
    }
}
