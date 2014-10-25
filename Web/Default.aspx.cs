using System;
using System.Data;
using DAL;
namespace Web
{
    public partial class Default : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string sql = "SELECT * FROM dbo.Task";
            DataTable dt = new DataTable();

            dt = DBHelper.getTable(sql, null, CommandType.Text);

            txtName.InnerText = dt.Rows[2][4].ToString();

        }
    }
}