<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="Web.Default" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>MDTask</title>
    <script src="jquery/jquery-1.8.3.min.js" type="text/javascript"></script>
    <script type="text/javascript">

//        $(function() {

//            $.ajax({
//                type: "GET",

//                url: "../ajaxpage/Test.ashx?op=1",
//                data: { name: "" },
//                dataType: "json",
//                // jsonp: "jsonpcallback",
//                cache: false,
//                beforeSend: function(XMLHttpRequest) {
//                },
//                complete: function(XMLHttpRequest, textStatus) {
//                    //alert("complete");
//                },
//                error: function() { alert("error"); },
//                success: function() {
//                  //  alert("success");
//                }
//            });


//        });

    </script>
</head>
<body>
    <form id="form1" runat="server">MDTask
    <div>
    <label runat="server" id="txtName"></label>
    <div id="res"></div>
    </div>
    </form>
</body>
</html>
