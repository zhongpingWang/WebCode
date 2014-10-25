var Settings = {
    varsion: 1.0
};

 

//格式化
$.format = function (source, params) {
    if (arguments.length == 1)
        return function () {
            var args = $.makeArray(arguments);
            args.unshift(source);
            return $.format.apply(this, args);
        };
    if (arguments.length > 2 && params.constructor != Array) {
        params = $.makeArray(arguments).slice(1);
    }
    if (params.constructor != Array) {
        params = [params];
    }
    $.each(params, function (i, n) {
        source = source.replace(new RegExp("\\{" + i + "\\}", "g"), n);
    });
    return source;
};

//封装StringBuilder
function StringBuilder() { this._string_ = new Array(); } 
StringBuilder.prototype.Append = function(str) { this._string_.push(str); };
StringBuilder.prototype.toString = function () { return this._string_.join(""); };

//判断一个字符串是否为NULL或者空字符串
String.prototype.isNull = function() { return this == null || this.trim().length == 0; };
String.prototype.equals = function(str) { return this == str; };
String.prototype.contains = function (str) { if (str) return this.indexOf(str) != -1; else return false; }

//字符串截取，后面加入...
String.prototype.interceptString = function(len) {
    if (this.length > len) {
        return this.substring(0, len - 1) + "...";
    } else {
        return this;
    }
};

//获得一个字符串的字节数
String.prototype.countLength = function() { 
    var strLength = 0;
    for (var i = 0; i < this.length; i++) {
        if (this.charAt(i) > '~') strLength += 2;
        else strLength += 1;
    }
    return strLength;
};

//根据指定的字节数截取字符串
String.prototype.cutString = function (cutLength) { if (!cutLength) { cutLength = this.countLength(); } var strLength = 0; var cutStr = ""; if (cutLength > this.countLength()) { cutStr = this; } else { for (var i = 0; i < this.length; i++) { if (this.charAt(i) > '~') { strLength += 2; } else { strLength += 1; } if (strLength >= cutLength) { cutStr = this.substring(0, i + 1); break; } } } return cutStr; };

//去掉所有的html标记
String.prototype.cutHTML = function() {
    return this.replace(/<[^>]+>/g, "");
};

//日期格式化
Date.prototype.format = function(format) {
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds()
    };

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
};

//日期加减
Date.prototype.addSomeDay = function(n) {
    var uom = new Date(this - 0 + n * 86400000);
    uom = (uom.getMonth() + 1) + "/" + uom.getDate() + "/" + uom.getFullYear();
    return new Date(uom);
};

//分钟加减
Date.prototype.addSomeMinutes = function(m) {
    var currentDate = new Date(this);
    currentDate.setTime(currentDate.getTime() + parseInt(m) * 60 * 1000);
    return currentDate;
};

//是否闰年
Date.isLeapYear = function (year) {
    return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
};

//这个月有多少天
Date.getDaysInMonth = function (year, month) {
    return [31, (Date.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
};

//是否闰年
Date.prototype.isLeapYear = function () {
    var y = this.getFullYear();
    return (((y % 4 === 0) && (y % 100 !== 0)) || (y % 400 === 0));
};

//月有多少天
Date.prototype.getDaysInMonth = function () {
    return Date.getDaysInMonth(this.getFullYear(), this.getMonth());
};

//时间间隔
function CreateTimeSpan(dateStr) {
    var dateTime = new Date();

    var date = dateStr.split(" ")[0];
    var year = date.split("-")[0];
    var month = date.split("-")[1] - 1;
    var day = date.split("-")[2];

    var time = dateStr.split(" ")[1];
    var hour = time.split(":")[0];
    var minute = time.split(":")[1];
    var second = time.split(":")[2];

    dateTime.setFullYear(year);
    dateTime.setMonth(month);
    dateTime.setDate(day);
    dateTime.setHours(hour);
    dateTime.setMinutes(minute);
    dateTime.setSeconds(second);

    var now = new Date();

    var today = new Date();
    today.setFullYear(now.getFullYear());
    today.setMonth(now.getMonth());
    today.setDate(now.getDate());
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);

    var milliseconds = 0;
    var timeSpanStr;
    if (dateTime - today >= 0) {
        milliseconds = now - dateTime;
        if (milliseconds < 1000 && milliseconds < 60000) {
            timeSpanStr = "刚才";
        } else if (milliseconds > 1000 && milliseconds < 60000) {
            timeSpanStr = Math.floor(milliseconds / 1000) + "秒前";
        } else if (milliseconds > 60000 && milliseconds < 3600000) {
            timeSpanStr = Math.floor(milliseconds / 60000) + "分钟前";
        } else {
            timeSpanStr = "今天 " + hour + ":" + minute;
        }
    }
    else {
        milliseconds = today - dateTime;
        if (milliseconds < 86400000) {
            timeSpanStr = "昨天 " + hour + ":" + minute;
        } else if (milliseconds > 86400000 && milliseconds < 31536000000) {
            timeSpanStr = (month + 1) + "月" + day + "日 " + hour + ":" + minute;
        } else if (milliseconds > 31536000000) {
            timeSpanStr = year + "年" + (month + 1) + "月" + day + "日 " + hour + ":" + minute;
        }
    }
    return timeSpanStr;
}

//月份加减
Date.prototype.addMonths = function (value) {
    var n = this.getDate();
    this.setDate(1);
    this.setMonth(this.getMonth() + value);
    this.setDate(Math.min(n, this.getDaysInMonth()));
    return this;
};

//获取后缀名
File.GetExt = function(fileName) {
    var t = fileName.split(".");
    return t[t.length - 1];
};

//图片
File.isPicture = function(fileExt) {
    var fileExts = [".jpg", ".gif", ".png", ".jpeg", ".bmp"];
    if (fileExt) {
        fileExt = fileExt.toLowerCase();
        return fileExts.contains(fileExt);
        //return fileExt == ".jpg" || fileExt == '.gif' || fileExt == '.png' || fileExt == 'jpeg';
    }
    return false;
};

//文档
File.isDocument = function(fileExt) {
    var fileExts = [".doc", ".docx", ".ppt", ".pot", ".pps", ".pptx", ".xls", ".xlsx", ".pdf", ".txt"];
    if (fileExt) {
        fileExt = fileExt.toLowerCase();
        return fileExts.contains(fileExt);
        //return fileExt == ".doc" || fileExt == ".docx" || fileExt == ".ppt" || fileExt == ".pot" || fileExt == ".pps" || fileExt == ".pptx" || fileExt == ".xls" || fileExt == ".xlsx" || fileExt == ".pdf" || fileExt == ".txt";
    }
    return false;
};

//压缩文件
File.isCompress = function(fileExt) {
    var fileExts = [".zip", ".rar", ".7z", ".mm", ".vsd"];
    if (fileExt) {
        fileExt = fileExt.toLowerCase();
        return fileExts.contains(fileExt);
        //return fileExt == ".zip" || fileExt == ".rar" || fileExt == ".7z";
    }
    return false;
};

//根据数据取得再数组中的索引
Array.prototype.getIndex = function(obj) {
    for (var i = 0; i < this.length; i++) {
        if (obj == this[i] || obj.equals(this[i])) {
            return i;
        }
    }
    return -1;
};

//移除数组中的某元素
Array.prototype.remove = function (obj) {
    for (var i = 0; i < this.length; i++) {
        if (obj.equals(this[i])) {
            this.splice(i, 1);
            break;
        }
    }
    return this;
};

//Cookies 操作
//写入
function setCookie(name, value) {
    var nextyear = new Date();
    nextyear.setFullYear(nextyear.getFullYear() + 10);
    var expireDate = nextyear.toGMTString();
    if (document.domain.indexOf('.BQSOFT.com') == -1) {
        document.cookie = name + "=" + escape(value) + ";expires=" + expireDate + ";path=/";
    } else {
        document.cookie = name + "=" + escape(value) + ";expires=" + expireDate + ";path=/;domain=.BQSOFT.com";
    }
}

//读取
function getCookie(name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) {
        return unescape(arr[2]);
    }
    return null;
}

//删除
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 10000);
    if (getCookie(name) == null) {
        return;
    }
    var cval = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"))[2];
    if (cval != null) {
        if (document.domain.indexOf('.BQSOFT.com') == -1) {
            document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + ";path=/";
        } else {
            document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + ";path=/;domain=.BQSOFT.com";
        }

    }
}

////获取URL里的参数，返回一个参数数组
////调用方法如下
//var Request = GetRequest();
//var 参数1,参数2,参数N;
//参数1 = Request['参数1'];
//参数2 = Request['参数2'];
//参数N = Request['参数N'];  
function GetRequest() {
    var url = location.href;  //获取url中"?"符后的字串  
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substring(url.indexOf("?") + 1);
        str = str.replace(/#/g, "");
        if (url.indexOf("&") == -1) {
            theRequest[str.substring(0, str.indexOf("="))] = str.substring(str.indexOf("=") + 1);
        }
        else {
            var strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].substring(0, strs[i].indexOf("="))] = strs[i].substring(strs[i].indexOf("=") + 1);
            }
        }

    }
    return theRequest;
}



//elementId 输入框ID，如：#city
//requestUrl 请求连接，如：Autocomplete.aspx
//callbackFunction 返回处理函数，如：function SelectedItem(name, value){}
//maxRows 最大呈现个数(默认10个)，如：10 可以不填充
function AutoComplete(elementId, requestUrl, callbackFunction, maxRows) {
    $(elementId).each(function () {
        $(this).autocomplete({
            source: function (request, response) {
                $.ajax({
                    url: requestUrl,
                    data: {
                        maxRows: maxRows == null ? 10 : maxRows,
                        keywords: request.term
                    },
                    cache: false,
                    error: function () { alert("error"); },
                    success: function (data) {
                        response($.map(data.items, function (item) {
                            return {
                                label: item.Name,
                                value: item.ID
                            };
                        }));
                    }
                });
            },
            minLength: 1,
            focus: function (event, ui) {
                return false;
            },
            select: function (event, ui) {
                if (ui.item) {
                    $(this).val(ui.item.label);
                    if (callbackFunction) {
                        callbackFunction(ui.item.label, ui.item.value);
                    }
                    return false;
                }
            }
        });
    });
}

//Md5 加解密
var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
function base64encode(str) {
    var out, i, len;
    var c1, c2, c3;
    len = str.length;
    i = 0;
    out = "";
    while (i < len) {
        c1 = str.charCodeAt(i++) & 0xff;
        if (i == len) {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt((c1 & 0x3) << 4);
            out += "==";
            break;
        }
        c2 = str.charCodeAt(i++);
        if (i == len) {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            out += base64EncodeChars.charAt((c2 & 0xF) << 2);
            out += "=";
            break;
        }
        c3 = str.charCodeAt(i++);
        out += base64EncodeChars.charAt(c1 >> 2);
        out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
        out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
        out += base64EncodeChars.charAt(c3 & 0x3F);
    }
    return out;
}
function base64decode(str) {
    var c1, c2, c3, c4;
    var i, len, out;
    len = str.length;
    i = 0;
    out = "";
    while (i < len) {

        do {
            c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
        } while (i < len && c1 == -1);
        if (c1 == -1)
            break;

        do {
            c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
        } while (i < len && c2 == -1);
        if (c2 == -1)
            break;
        out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

        do {
            c3 = str.charCodeAt(i++) & 0xff;
            if (c3 == 61)
                return out;
            c3 = base64DecodeChars[c3];
        } while (i < len && c3 == -1);
        if (c3 == -1)
            break;
        out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));

        do {
            c4 = str.charCodeAt(i++) & 0xff;
            if (c4 == 61)
                return out;
            c4 = base64DecodeChars[c4];
        } while (i < len && c4 == -1);
        if (c4 == -1)
            break;
        out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
    }
    return out;
}
function utf16to8(str) {
    var out, i, len, c;
    out = "";
    len = str.length;
    for (i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007F)) {
            out += str.charAt(i);
        } else if (c > 0x07FF) {
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
            out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        } else {
            out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        }
    }
    return out;
}
function utf8to16(str) {
    var out, i, len, c;
    var char2, char3;
    out = "";
    len = str.length;
    i = 0;
    while (i < len) {
        c = str.charCodeAt(i++);
        switch (c >> 4) {
            case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
                // 0xxxxxxx
                out += str.charAt(i - 1);
                break;
            case 12: case 13:
                // 110x xxxx　 10xx xxxx
                char2 = str.charCodeAt(i++);
                out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                break;
            case 14:
                // 1110 xxxx　10xx xxxx　10xx xxxx
                char2 = str.charCodeAt(i++);
                char3 = str.charCodeAt(i++);
                out += String.fromCharCode(((c & 0x0F) << 12) | ((char2 & 0x3F) << 6) | ((char3 & 0x3F) << 0));
                break;
        }
    }
    return out;
}
//加密
function doit(pwd) { 
    return base64encode(utf16to8(pwd)); 
}
//解密
function toDoit(pwd) { 
    return utf8to16(base64decode(pwd)); 
}