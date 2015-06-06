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
        // code = "test-en-us";
        var lansJsUrl = "langs_Static/" + code + "/lang.js";
        var lansCssUrl = "langs_Static/" + code + "/lang.css";
        //加载资源文件
        $.getScript(lansJsUrl, function (data) {
            //回调
            //            var link = document.createElement('link');
            //            link.type = 'text/css';
            //            link.rel = 'stylesheet';
            //            link.href = lansCssUrl;
            //            document.getElementsByTagName("head")[0].appendChild(link); 
            $("#staticCss").attr("href", lansCssUrl);
            lanStatic.LoadLangs();
        }).fail(function () {
            if (arguments[0].readyState == 0) {
                //script failed to load
                lanStatic.failLangs();
            } else {
                //script loaded but failed to parse
                lanStatic.failLangs();
                //  alert(arguments[2].toString());
            }
        });
    },

    failLangs: function () {
        var lansJsUrl = "langs_Static/en-us/lang.js";
        var lansCssUrl = "langs_Static/en-us/lang.css";
        $("#staticCss").attr("href", lansCssUrl);
        //        var link = document.createElement('link');
        //        link.type = 'text/css';
        //        link.rel = 'stylesheet';
        //        link.href = lansCssUrl;
        //        document.getElementsByTagName("head")[0].appendChild(link);
        //加载资源文件
        $.getScript(lansJsUrl, function (data) {
            //回调
            lanStatic.LoadLangs();

        });
    },



    LoadLangs: function () {
        $("[rels='lang']").each(function () {
            var id = $(this).attr("langs");
            if ($(this).is("img")) {
                if (md_lang[id] != undefined) {
                    $(this).attr("src", md_lang[id]);
                }
            } else if ($(this).is("input")) {
                var type = $(this).attr("type");
                if (("text" == type || "password" == type) && md_lang[id] != undefined) {
                    $(this).attr("placeholder", md_lang[id]);

                } else if ("button" == type && md_lang[id] != undefined) {
                    $(this).val(md_lang[id]);

                }
            } else {
                $(this).html(md_lang[id]);
            }

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
    //加载
    lanStatic.Init(0);
    //切换多语言 未用
    // lanStatic.DaynicLans(); 
});