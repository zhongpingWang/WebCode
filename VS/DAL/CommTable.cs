using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;


namespace DAL
{
   public static  class CommTable
    {
       public static DataTable CreateTable()
       {
           DataTable dt=new DataTable();
           dt.Columns.Add("ID");
           dt.Columns.Add("Name"); 
           DataRow dr;
           for (int i = 0; i < 20; i++)
           {
               dr = dt.NewRow();
               dr["ID"] = i.ToString();
               dr["Name"] = "小米" + i.ToString();
               dt.Rows.Add(dr);
           } 

           return dt;
       }
    }
}
