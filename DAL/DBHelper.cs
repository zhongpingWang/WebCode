using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;

namespace DAL
{
   public static class DBHelper
   {
       private static SqlConnection conn;

       public static SqlConnection Conn
       {
           get
           {
               try
               {
                   if (conn == null)
                   {
                       string connText = ConfigurationManager.AppSettings["connection"].ToString();
                       conn = new SqlConnection(connText);
                       conn.Open();

                   }
                   else if (conn.State == ConnectionState.Closed)
                   {
                       conn.Open();
                   }
                   else if (conn.State == ConnectionState.Broken)
                   {
                       conn.Close();
                       conn.Open();
                   } 

               }
               catch (Exception e)
               {

                   throw e;
               }
               return conn;
           }

       }


       private static SqlCommand Comm(string commText, SqlParameter[] pas, CommandType type)
       {
           using (SqlCommand comm=new SqlCommand(commText,Conn))
           {
               try
               {
                   comm.CommandType = type;
                   if (pas!=null&&pas.Length>0)
                   {
                       comm.Parameters.AddRange(pas);
                   }
                   return comm;
               }
               catch (Exception e)
               {
                    
                   throw e;
               }
           }
       } 


       public static DataTable getTable(string commText, SqlParameter[] pas, CommandType type)
       {
           try
           {
               using (SqlCommand comm=Comm(commText,pas,type))
               {
                  SqlDataAdapter da=new SqlDataAdapter(comm);
                   DataTable dt = new DataTable();
                   da.Fill(dt); 
                   return dt;
               }
           }
           catch (Exception e)
           {
                
               throw e;
           }
       }



   }
}
