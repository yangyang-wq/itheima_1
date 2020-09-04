$(function () {
    // 点击“去注册账号”的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击“去登录”的链接
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 文本框校验开始
    // layui是自动注入的对象
    let form = layui.form
    form.verify({
        // 自定义一个校验pwd规则 
        pwd: [/^[\S]{6,12}$/, '密码必须6-12位,且不能出现空格'],
        // 判断两次密码输入密码师傅一致
        repwd: function (value) {
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return "两次密码输入不一致,请重新输入"
            }
        }
    })

    // 文本框内容校验结束
    let layer = layui.layer
    // 注册表单监听事件  
    $("#form-reg").on("submit", function (e) {
        // 阻止表单的默认提交行为
        e.preventDefault();
        let data = {
            username: $('#form-reg [name=username]').val(),
            password: $('#form-reg [name=password]').val(),
        };
        $.post("/api/reguser", data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功，请登录！')
            // 模拟人的点击行为
            $('#link_login').click()
        });
    })
    //注册表单监听事件结束

    // 登录表单监听注册事件
    $("#form_login").on("submit", function (e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: "post",
            // 快速获取当前表单的数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("用户名或密码输入错误,请检查用户名或密码")
                }
                // console.log(res);
                layer.msg("登录成功")
                // 将数据保存到localStorage中
                localStorage.setItem("token", res.token)
                location.href = "/index.html"
            }
        })
    })

})