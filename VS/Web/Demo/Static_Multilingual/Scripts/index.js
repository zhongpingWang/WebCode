var lanStatic = {
    //0 首次加载  1动态加载
    Init: function (type, codeDy) {
        var code = "";
        if (type == 0) {
            if (navigator.language) {
                code = navigator.language;
            } else {
                code = navigator.browserLanguage;
            }
            $("#lans").val(code.toLowerCase());
        } else {
            code = codeDy;
        }
        var lansJsUrl = "lans/" + code + "/lang.js";
        //                        var index = code.indexOf("-");
        //                        if (index != -1) {
        //                            code = code.substring(0, index);
        //                        }
        //加载资源文件
        $.getScript(lansJsUrl, function (data) {
            //回调
            $("[rel='lan']").each(function () {
                var id = $(this).attr("id"); 

                if ($(this).is("img")) {
                    if (md_lang[id] == undefined) {
                        $(this).attr("src", "");
                    } else {
                        $(this).attr("src", md_lang[id]);
                    }
                } else {
                    $(this).html(md_lang[id]);
                }


            });
        });
    },
    //动态加载语言
    DaynicLans: function () {
        $("#lans").change(function () {

            var code = $(this).val();
            lanStatic.Init(1, code);
        });
    }
}

$(function () {
    lanStatic.Init(0);
    lanStatic.DaynicLans();
});