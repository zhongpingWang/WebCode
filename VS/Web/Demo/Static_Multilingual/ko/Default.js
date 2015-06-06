 

$(function() {
    //ko 监控
    var ViewModel = {
        langs: ko.observable(""),
        optionValues: ["en", "ja-jp", "zh-cn"],
        selectedOptionValue: ko.observable(""),
        mulitChange: ko.observable(""),
        lanSize: ko.observable("60px")
    }

    //监控语言发生变化
    ViewModel.selectedOptionValue.subscribe(function () {
        
        if (ViewModel.selectedOptionValue() == "zh-cn") {
            ViewModel.mulitChange("admin_zh");
            ViewModel.lanSize("60px");
        } else if (ViewModel.selectedOptionValue() == "en") {
            ViewModel.mulitChange("admin_en");
            ViewModel.lanSize("50px");
        } else {
            ViewModel.mulitChange("admin_jp");
            ViewModel.lanSize("40px");
        }
        xmlURL = "lans/" + ViewModel.selectedOptionValue() + "/lang.js";
        $.getScript(xmlURL, function () {
            ViewModel.langs(md_lang);
        });
    }); 

    ko.applyBindings(ViewModel);

    //根据浏览器获取语言
    var code = "";
    if (navigator.language) {
        code = navigator.language;
    } else {
        code = navigator.browserLanguage;
    }
    //加载语言 
    ViewModel.selectedOptionValue(code.toLowerCase()); 
   
});

 











