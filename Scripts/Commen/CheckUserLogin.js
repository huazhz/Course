/**
 * Created by xuwei on 2016/9/25 0025.
 */

//用户票据
//判断用户是否登录，没登录，跳到登录页面，请只在需要的页面添加引用
var UserInfo = $.cookie("UserInfo") || "";
if (UserInfo == "" || UserInfo == "null" || UserInfo == undefined) {
    window.location.href = "/Course/Views/Index.html"
}