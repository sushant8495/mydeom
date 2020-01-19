using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using ReactJS.Model;
using System.Data;

namespace ReactJS.DbClass
{
    public class RegistraionDB
    {
        string conn = "";
        SqlConnection sqlConnection;
        public RegistraionDB()
        {
            conn = Startup.configurationConnection;
            sqlConnection = new SqlConnection(conn);
        }
        public string InsertUpdate(Registration registration)
        {
            try
            {
                SqlCommand com = new SqlCommand("usp_InsertAndUpdate_Registrions", sqlConnection);
                com.CommandType = CommandType.StoredProcedure;
                sqlConnection.Open();
                com.Parameters.AddWithValue("@RegistrationID", registration.RegistrationID);
                com.Parameters.AddWithValue("@FullName ", registration.FullName.ToString());
                com.Parameters.AddWithValue("@UserName", registration.UserName.ToString());
                com.Parameters.AddWithValue("@Password", registration.Password.ToString());
                com.Parameters.AddWithValue("@ContactNumber ", registration.ContactNumber.ToString());
                com.ExecuteNonQuery();
                return "Registration Successfully Done !!";

            }
            catch (Exception)
            {
                return "Department Successfully not done";
                throw;
            }
        }

        public DataTable UserLogin(Registration registration )
        {
            try
            {
                SqlCommand com = new SqlCommand("usp_Login", sqlConnection);
                com.CommandType = CommandType.StoredProcedure;
                sqlConnection.Open();
                com.Parameters.AddWithValue("@UserName", registration.UserName.ToString());
                com.Parameters.AddWithValue("@Password", registration.Password.ToString());
                SqlDataReader rdr = com.ExecuteReader();
                DataTable dataTable = new DataTable();
                dataTable.Load(rdr);
                return dataTable;
            }
            catch (Exception ex)
            {

                throw;
            }
        }
    }
}
