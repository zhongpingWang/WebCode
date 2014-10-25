var indexOp = {
    //改语言
    loadLangHTML: function (code, callback) {
        var xmlURL = "xml/" + code + ".xml";
        $.ajax({
            type: "get",
            url: xmlURL,
            beforeSend: function (XMLHttpRequest) {
                //ShowLoading();
            },
            success: function (data, textStatus) {
                $("[rel='lang']").each(function (d) {
                    var value = $(data).find("#" + $(this).attr("lang")).text();
                    if (value != "") {
                        $(this).html(value);
                    }
                });
            },

            complete: function (XMLHttpRequest, textStatus) {
                //HideLoading();
            },
            error: function () {
                alert("error");
                //请求出错处理
            }
        });

    },
    //登陆
    login: function () {
        $("#login").click(function () {
            //用户名
            var txtName = $("#userName").val();
            //密码
            var pwd = $("#pwd").val();
            setCookie("userName", txtName);
            if (txtName == "ABC" && pwd == 123) {
                if ($("#ckimg").hasClass("remoberPwd")) {
                    pwd = doit(pwd);
                    setCookie("pwd", pwd);
                } else {
                    delCookie("pwd");
                }

                alert("Ok");
                $("#userName").val("");
                $("#pwd").val("");
            } else {
                alert("No");

            } 

        });

        //退出
        $("#exit").click(function () {
            window.opener = null;
            window.open('', '_self');
            window.close();
        });


        $("#ckimg").click(function () {
            if ($(this).hasClass("remoberPwd")) {
                $(this).removeClass("remoberPwd");
            } else {
                $(this).addClass("remoberPwd");
            }
        });

    },

    init: function () {
        var code;
        if (getCookie("lang") != null) {
            code = getCookie("lang");
        } else {
            code = "zh";
        }
        //        if (navigator.language) {
        //            code = navigator.language;
        //        } else {
        //            code = navigator.browserLanguage;
        //        }
        //        var index = code.indexOf("-");
        //        if (index != -1) {
        //            code = code.substring(0, index);
        //        }
        indexOp.loadLangHTML(code);
        $("#langGJ option[value='" + code + "']").attr("selected", true);
        $("#langGJ").live("change", function () {
            code = $(this).val();
            setCookie("lang", code);
            indexOp.loadLangHTML(code);
        });

        if (getCookie("userName") != null) {
            $("#userName").val(getCookie("userName"));
        }
        if (getCookie("pwd") != null) {
            $("#pwd").val(toDoit(getCookie("pwd")));
        }

        indexOp.login();

    }
};  

$(function () {
    indexOp.init();
});