/**
 * Created by xuwei on 2016/9/29 0029.
 */
var s = 60;
$(function ($) {
    $.cookie("UserInfo", null, {path: '/'});
    //createCode();
    //发送验证码
    $("#btnSendSMS").on("click", function () {
        if (s == 60) {
            GetSMSCode();
        }
    });

    //注册
    $("#btnReg").on("click", function () {
        Register();
    })
});


//获取验证码
function GetSMSCode() {
    // if (!validate()) {
    //     layer.open({
    //         content: '图片验证码错误！',
    //         style: 'background-color:#fff; color:#000; border:none;width:60%',
    //         time: 2
    //     });
    //     return;
    // }
    var PhoneNum = $("#Phone").val();
    if (!PhoneNum) {
        layer.open({
            content: '请输入手机号',
            style: 'background-color:#fff; color:#000; border:none;width:60%',
            time: 2
        });
        return;
    }
    if (PhoneNum.length != 11) {
        layer.open({
            content: '请输入正确的手机号',
            style: 'background-color:#fff; color:#000; border:none;width:60%',
            time: 2
        });
        return;
    }
    var param = {Phone: PhoneNum, Type: 1};
    var result = $Course.GetAjaxJson(param, ApiUrl + "Account/GetSMSCode");
    if (result.Msg == "OK") {
        var time = setInterval(function () {
            s--;
            $("#btnSendSMS").html(s + '秒');
            if (s == 0) {
                clearInterval(time);
                $("#btnSendSMS").html('发送验证码');
                s = 60;
            }
        }, 1000);
    } else {
        layer.open({
            content: '手机号已被注册！',
            style: 'background-color:#fff; color:#000; border:none;width:60%',
            time: 2
        });
    }
}
//注册
function Register() {
    var PhoneNum = $("#Phone").val();

    if (!PhoneNum) {
        layer.open({
            content: '请输入手机号',
            style: 'background-color:#fff; color:#000; border:none;width:60%',
            time: 2
        });
        return;
    }
    if (PhoneNum.length < 11) {
        layer.open({
            content: '请输入正确的手机号',
            style: 'background-color:#fff; color:#000; border:none;width:60%',
            time: 2
        });
        return;
    }
    var _VerificationCode = $("#VerificationCode").val();
    // if (VerificationCode != _VerificationCode) {
    //     layer.open({
    //         content: '验证码错误!',
    //         style: 'background-color:#fff; color:#000; border:none;width:60%',
    //         time: 2
    //     });
    //     return;
    // }
    if (!_VerificationCode) {
        layer.open({
            content: '请输入验证码!',
            style: 'background-color:#fff; color:#000; border:none;width:60%',
            time: 2
        });
        return;
    }
    var Pwd = $("#Pwd").val();
    if (!Pwd) {
        layer.open({
            content: '请输入密码！',
            style: 'background-color:#fff; color:#000; border:none;width:60%',
            time: 2
        });
        return;
    }
    Pwd = $Course.MD5(Pwd);
    var RefUserID = $Course.RequestUrlParams("RefUserID");
    RefUserID = RefUserID == null ? 0 : RefUserID;
    var IsAble = $Course.RequestUrlParams("IsAble");
    IsAble = IsAble || 0;
    var param = {Phone: PhoneNum, Pwd: Pwd, Code: _VerificationCode, RefUserID: RefUserID,IsAble:IsAble};
    var result = $Course.GetAjaxJson(param, ApiUrl + "Account/Register");
    if (result.Msg == "OK") {
        layer.open({
            content: '注册成功！',
            style: 'background-color:#fff; color:#000; border:none;width:60%',
            time: 2,
            end: function () {
                window.location.href = "Login.html";
            }
        });
    } else {
        layer.open({
            content: result.Msg,
            style: 'background-color:#fff; color:#000; border:none;width:60%',
            time: 2
        });
    }
}