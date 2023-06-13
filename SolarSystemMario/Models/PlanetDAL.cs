using SolarSystemMario.Utillity;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace SolarSystemMario.Models
{
    public class PlanetDAL
    {
        string connectionString = ConnectionString.CName;

        public IEnumerable<Planet> GetAllPlanets()
        {
            List<Planet> planets = new List<Planet>();

            using(SqlConnection con = new SqlConnection(connectionString))
            {
                SqlCommand cmd = new SqlCommand("SelectAllPlanets", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();

                while (rdr.Read())
                {
                    Planet planet = new Planet();
                    planet.Id = Convert.ToInt32(rdr["Planet_id"]);
                    planet.Name = rdr["Planet_Name"].ToString();
                    planet.Type = rdr["Planet_Type"].ToString();
                    planet.Size = Convert.ToDouble(rdr["Size"]);
                    planet.Distance_From_The_Sun = Convert.ToDouble(rdr["Distance_From_The_Sun"]);
                    planet.Length_Of_Year = Convert.ToDouble(rdr["Length_Of_Year"]);
                    planet.Number_Of_Rings = Convert.ToInt32(rdr["Number_Of_Rings"]);
                    planet.Number_Of_Moons = Convert.ToInt32(rdr["Number_Of_Moons"]);
                    planet.Star_id = Convert.ToInt32(rdr["Star_id"]);

                    planets.Add(planet);
                }

                con.Close();
            }
            return planets;
        }

        // Get a spcific Planet
        public Planet GetPlanetData(int? id)
        {
            Planet planet = new Planet();

            using (SqlConnection con = new SqlConnection(connectionString))
            {
                string sqlQuery = "SELECT * FROM Planet WHERE Planet_id= " + id;
                SqlCommand cmd = new SqlCommand(sqlQuery, con);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();

                while (rdr.Read())
                {
                    planet.Id = Convert.ToInt32(rdr["Planet_id"]);
                    planet.Name = rdr["Planet_Name"].ToString();
                    planet.Type = rdr["Planet_Type"].ToString();
                    planet.Size = Convert.ToDouble(rdr["Size"]);
                    planet.Distance_From_The_Sun = Convert.ToDouble(rdr["Distance_From_The_Sun"]);
                    planet.Length_Of_Year = Convert.ToDouble(rdr["Length_Of_Year"]);
                    planet.Number_Of_Rings = Convert.ToInt32(rdr["Number_Of_Rings"]);
                    planet.Number_Of_Moons = Convert.ToInt32(rdr["Number_Of_Moons"]);
                    planet.Star_id = Convert.ToInt32(rdr["Star_id"]);
                }
                return planet;
            }
        }
    }
}
