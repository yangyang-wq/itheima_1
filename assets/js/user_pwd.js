$(function () {
    // 先导入layui里面的form
    let form = layui.form
    let layer = layui.layer
    // 自定义校验规则  
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        namepwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同'
            }
        },
        revepwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码输入不一致'
            }
        }
    })

    // 提交表单重置密码  单击重置按钮的时候需要将密码提交至服务器
    $(".layui-form").on("submit", function (e) {
        // 阻止表单默认提交
        e.preventDefault()
        // 发起ajax请求
        $.ajax({
            method: "post",
            url: "/my/updatepwd",
            // 快速获取表单的数据
            data: $('.layui-form').serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("修改密码失败")
                    // 如果密码修改成功需要重置表单

                } else {
                    layer.msg('修改密码成功')
                    // reset是原生方法,所以在使用的时候需要将jq方法,转换为原生js,所以在jq方法后面加上[0]就可以将jq放大转换为原生js
                    $('.layui-form')[0].reset()
                }
            }
        });
    })
})