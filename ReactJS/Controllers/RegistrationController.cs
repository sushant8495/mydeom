using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ReactJS.Model;
using ReactJS.DbClass;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Data;
using Microsoft.AspNetCore.Http;

namespace ReactJS.Controllers
{
    public class RegistrationController : Controller
    {
        RegistraionDB registraionDB = new RegistraionDB();
        [HttpPost]
        [Route("Registration/InsertUpdate")]
        public string InsertUpdate([FromBody]Registration registration)
        {
            try
            {
                return registraionDB.InsertUpdate(registration);
            }
            catch (Exception)
            {
                return "Operation Successfully not done";
                throw;
            }
        }

        [HttpPost]
        [Route("Registration/Login")]
        public bool Login([FromBody]Registration registration)
        {
            try
            {
                DataTable dataTable = registraionDB.UserLogin(registration);
                if (dataTable.Rows.Count == 0)
                    return false;
                else {
                    CookieOptions cookieOptions = new CookieOptions();
                    foreach (DataRow dr in dataTable.Rows)
                    {
                        Response.Cookies.Append("UserName", dr["UserName"].ToString());
                        Response.Cookies.Append("RegistrationID", dr["RegistrationID"].ToString());
                    }

                    return true;
                }
            }
            catch (Exception ex)
            {
                return false;
                throw;
            }
        }

    }
}