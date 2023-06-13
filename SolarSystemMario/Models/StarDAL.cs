using SolarSystemMario.Utillity;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace SolarSystemMario.Models
{
    public class StarDAL
    {
        string connectionString = ConnectionString.CName;

        public IEnumerable<Star> GetAllStars()
        {
            List<Star> stars = new List<Star>();

            using (SqlConnection con = new SqlConnection(connectionString))
            {
                SqlCommand cmd = new SqlCommand("SelectAllStars", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();

                while (rdr.Read())
                {
                    Star star = new Star();
                    star.Id = Convert.ToInt32(rdr["Star_id"]);
                    star.Name = rdr["Star_Name"].ToString();
                    star.Type = rdr["Star_type"].ToString();
                    star.Size = Convert.ToDouble(rdr["Size"]);
                    star.Age = Convert.ToDouble(rdr["Age"]);
                }
                con.Close();
            }

            return stars;
        }

        // Get a specific Star
        public Star GetStarData(int? id)
        {
            Star star = new Star();

            using(SqlConnection con = new SqlConnection(connectionString))
            {
                string sqlQuery = "SELECT * FROM Star WHERE Star_id= " + id;
                SqlCommand cmd = new SqlCommand(sqlQuery, con);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();

                while (rdr.Read())
                {
                    star.Id = Convert.ToInt32(rdr["Star_id"]);
                    star.Name = rdr["Star_Name"].ToString();
                    star.Type = rdr["Star_type"].ToString();
                    star.Size = Convert.ToDouble(rdr["Size"]);
                    star.Age = Convert.ToDouble(rdr["Age"]);
                }

                return star;
            }
        }
    }
}
