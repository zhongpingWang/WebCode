
using System.Data;
using System.Web;
using System.Threading.Tasks;
using Newtonsoft.Json;


namespace Web.ajaxpage
{
    /// <summary>
    /// Comm 的摘要说明
    /// </summary>
    public class Comm : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {

            if (context.Request["op"] != null)
            {
                string op = context.Request["op"].ToString();
                switch (op)
                {
                    case "select":
                        Select(context);
                        break;
                    default:
                        Error();
                        break;

                }
            }

            context.Response.ContentType = "text/plain";
            
            context.Response.End();
        }

        //查找
        private void Select(HttpContext context)
        {
            DataRow[] dr = DAL.CommTable.CreateTable().Select();
            JavaScriptObject javaScriptObject = new JavaScriptObject();
            JavaScriptArray javaScriptArray = new JavaScriptArray();
            Parallel.ForEach(dr, (item) =>
                {
                    JavaScriptObject jsonFolder = new JavaScriptObject();
                    jsonFolder.Add("ID", item["ID"]);
                    jsonFolder.Add("Name", item["Name"]);
                    javaScriptArray.Add(jsonFolder);
                }); 
            //for (int i = 0; i < dr.Length; i++)
            //{
            //    JavaScriptObject jsonFolder = new JavaScriptObject();
            //    jsonFolder.Add("ID", dr[i]["ID"]);
            //    jsonFolder.Add("Name", dr[i]["Name"]);
            //    javaScriptArray.Add(jsonFolder);
            //}
            javaScriptObject.Add("totalResultsCount", dr.Length.ToString());
            javaScriptObject.Add("items", javaScriptArray);

            string jsonStr = JavaScriptConvert.SerializeObject(javaScriptObject);
            context.Response.Clear();
            context.Response.AddHeader("Content-Type", "Application/json");
            context.Response.Write(jsonStr);
            context.Response.End();
        }

        private void Test(HttpContext context)
        {
            JavaScriptObject javascriptobject = new JavaScriptObject();

            JavaScriptArray javascriptarray = new JavaScriptArray();
            javascriptarray.Add("dd");

            javascriptobject.Add("1", javascriptarray);

            string strjson = JavaScriptConvert.SerializeObject(javascriptobject);

            strjson = strjson.Replace("\r", string.Empty).Replace("\t", string.Empty); 
 
            context.Response.Clear();
            context.Response.AddHeader("Content-Type","Application/json");
            context.Response.Write(strjson);
            context.Response.End();



        }




        //错误
        private void Error()
        {
            
        }


        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}