$(document).ready(function(){
    function login(){
        var userName= $("#username").val();
        var passWord = $("#password").val();
        if(!userName){
            $("#login-tip").html("请输入用户名");
            return;
        }
        if(!passWord){
            $("#login-tip").html("请输入密码");
            return;
        }
    }
    $("#username").focus();
   $("#login_button").on("click",function(){
       login();
   });
    $('body').on("keydown",function(){
        if(event.keyCode == 13){
            login();
        }else{
            return true;
        }
    })
});