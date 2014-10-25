using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Web.ajaxpage
{
    /// <summary>
    /// Test 的摘要说明
    /// </summary>
    public class Test : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {

            if (context.Request["op"] != null)
            {
                switch (context.Request["op"])
                {
                    case "1":
                        break;
                    default:
                        break;
                }
            }



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