/**
 * Created by waylen on 2016/10/6.
 */
var type = $Course.RequestUrlParams("type");
var UserID = $Course.RequestUrlParams("UserID") || 0;
$(function ($) {
    $("#header").load("../Commen/header.html");
    if (type == 1) {
        $("#btnSave").hide();
    }
    $("#btnSave").on("click", function () {
        UserInfo_Edit(UserID);
    });
    if (UserID != null) {
        $("#phonediv").hide();
        $("#FatherPhonediv").hide();
        $("#MotherPhonediv").hide();

        UserInfoEdit_Get(UserID);

    } else {
        $("#phonebox").hide();
        $("#FatherPhonebox").hide();
        $("#MotherPhonebox").hide();
    }
    laydate(start);
})

var UserID = $Course.RequestUrlParams("UserID");
function UserInfoEdit_Get(UserID) {
    var param = {UserID: UserID};
    console.log(UserID);
    var result = $Course.GetAjaxJson(param, ApiUrl + "User/GetUserInfoByUserID");
    console.log(result);
    $("#NickName").val(result.Data.NickName);
    $("#Sex").val(result.Data.Sex);
    $("#BirthDay").val(result.Data.BirthDay);
    $("#School").val(result.Data.School);
    $("#Grade").val(result.Data.Grade);
    $("#ClassName").val(result.Data.ClassName);
    $("#Email").val(result.Data.Email);
    $("#Phone").val(result.Data.Phone);
    $("#FatherName").val(result.Data.FatherName);
    $("#FatherPhone").val(result.Data.FatherPhone);
    $("#MotherName").val(result.Data.MotherName);
    $("#MotherPhone").val(result.Data.MotherPhone);
    $("#Tel").val(result.Data.Tel);
    $("#Address").val(result.Data.Address);
    $("#Account").val(result.Data.Account);
}


//编辑或新增
function UserInfo_Edit(UserID) {
    var NickName = $("#NickName").val();//
    var Sex = $("#Sex").val();//
    var BirthDay = $("#BirthDay").val();//
    var School = $("#School").val();
    var Grade = $("#Grade").val();
    var ClassName = $("#ClassName").val();
    var Email = $("#Email").val();
    var Phone = $("#Phone").val();
    var FatherName = $("#FatherName").val();//
    var MotherName = $("#MotherName").val();//


    var FatherPhone = "";
    var MotherPhone = "";
    if (UserID == null) {
        FatherPhone = $("#FatherPhone2").val()
        MotherPhone = $("#MotherPhone2").val();

    } else {
        FatherPhone = $("#FatherPhone").val()
        MotherPhone = $("#MotherPhone").val();
    }
    var Tel = $("#Tel").val();//
    var Address = $("#Address").val();//


    if (!NickName) {
        layer.msg("名字不能为空", {icon: 2, time: 2000})
        return;
    }
    if (!Sex) {
        layer.msg("请选择性别", {icon: 2, time: 2000})
        return;
    }
    if (!BirthDay) {
        layer.msg("请选择生日", {icon: 2, time: 2000})
        return;
    }
    if (!FatherName) {
        layer.msg("请输入父亲名字", {icon: 2, time: 2000})
        return;
    }
    if (!MotherName) {
        layer.msg("请输入母亲名字", {icon: 2, time: 2000})
        return;
    }
    if (!Address) {
        layer.msg("请输入家庭住址", {icon: 2, time: 2000})
        return;
    }


    if (!FatherPhone && !MotherPhone) {
        layer.msg("请输入父亲或母亲的手机号", {icon: 2, time: 2000})
        return;
    }

    var dan = $("input[name=dan]:checked").val();
    if (dan == 1) {
        Account = $("#Phone2").val();
    }
    if (dan == 2) {
        Account = $("#FatherPhone2").val();
    }
    if (dan == 3) {
        Account = $("#MotherPhone2").val();
    }
    if (!Account && UserID == null) {
        layer.msg("选中的手机号不能为空", {icon: 2, time: 2000})
        return;
    }


    var param = {
        UserID: UserID,
        NickName: NickName,
        Sex: Sex,
        BirthDay: BirthDay,
        School: School,
        Grade: Grade,
        ClassName: ClassName,
        Email: Email,
        Phone: Phone,
        FatherName: FatherName,
        FatherPhone: FatherPhone,
        MotherName: MotherName,
        MotherPhone: MotherPhone,
        Tel: Tel,
        Address: Address,
        Account: Account

    };
    var result = $Course.PostAjaxJson(param, ApiUrl + "User/UserInfo_Edit");
    if (result.Msg == "OK") {
        layer.msg("保存成功！", {icon: 1, time: 2000}, function () {
            window.location.href = "UserList.html";
        });
    }
}


var start = {
    elem: '#BirthDay',
    format: 'YYYY-MM-DD',
    max: laydate.now(), //最大日期为当前日期
    istime: true,
    istoday: false,
    choose: function (datas) {
    }
};