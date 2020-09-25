//每次调用$.get()  $.post() $.ajax() 会先调用这个函数
$.ajaxPrefilter(function (options) {
    options.url = 'http://127.0.0.1:3000' + options.url
    console.log(options.url);

    // 判断请求接口是否有权限限制
    if (options.url.indexOf('/my/')) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }


    options.complete = function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
            // 强制清空token
            localStorage.removeItem('token')
            // 跳转回登录页面
            location.href = "/login.html"
        }
    }
})