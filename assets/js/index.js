
getUserInfo()
function getUserInfo() {
    $.ajax({
        method: "get",
        url: "/my/userinfo",
        // headers: {
        //     // 取出本地存储的数据
        //     Authorization: localStorage.getItem('token') || '',
        // },
        success: function (res) {
            console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg("获取用户信息失败")
            }
            else {
                renderAvatar(res.data)
            }
        },
        // 如果用户直接输入 后台网址的话进行加密处理  必须先登录才能进去
        //complete也是ajax的一种回调函数  
        complete: function (res) {
            console.log(res, "------");
            if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
                // 强制清空token
                localStorage.removeItem('token')
                // 跳转回登录页面
                location.href = "/login.html"
            }
        }
    })
}
// 渲染 用户名和用户头像
function renderAvatar(data) {
    let name = data.nickname || data.username
    $(".welcome").html("欢迎&nbsp;&nbsp;" + name)
    if (data.user_pic !== null) {
        $(".layui-nav-img").attr("src", data.user_pic).show()
        $(".text-avatar").hide()
    } else {
        $(".layui-nav-img").hide()
        let first = name[0].toUpperCase()
        $(".text-avatar").html(first).show()
    }
}
// 单击退出按钮事件
let layer = layui.layer
$("#btn").on("click", function () {
    // console.log(1);
    layer.confirm('确认退出登录?', { icon: 3, title: '提示' }, function (index) {
        //do something
        // 清除本地的token值
        localStorage.removeItem('token')
        // 页面跳转回login页面
        location.href = '/login.html'
        // 关闭弹出框
        layer.close(index);
    });
})