$(function () {
    let form = layui.form
    let layer = layui.layer
    // 先将用户的信息渲染到表单中
    initUserInfo()
    function initUserInfo() {
        $.ajax({
            method: "get",
            url: "/my/userinfo",
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("获取用户信息失败")
                } else {
                    $(".layui-input").val(res.data)
                    // console.log(res);
                    // 使用form.val的时候需要先给表单设置lay-filter=""属性,
                    form.val('usertxt', res.data)
                }
            }
        });
    }
    // 定义表单的验证规则
    form.verify({
        // 定义用户昵称的验证规则
        // 谁调用这个nickname就将谁的value传过来
        nickname: function (value) {
            if (value.length > 6) {
                return '用户昵称需在1-6个字符之间'
            }
        }
    })
    // 定义重置按钮
    $(".btnReset").on("click", function (e) {
        // 阻止表单的默认行为
        e.preventDefault()
        // 重新调用initUserInfo函数
        // initUserInfo()
        $(".layui-form input").val("")
    })

    // 监听表单的提交事件
    $(".layui-form").on("submit", function (e) {
        // 阻止表单的默认提交行为
        e.preventDefault()
        // 发起ajax请求
        $.ajax({
            method: "POST",
            url: "/my/userinfo",
            //jquery中提供的快速获取表单的方法
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    layer.msg("更新用户信息失败")
                } else {
                    layer.msg("更新用户信息成功")
 
                    // window.parent.getUserInfo()
                }
            }
        })
    })






























































    // // 定义验证规则
    // form.verify({
    //     // 用户昵称验证规则不能大于6个字符
    //     nickname: function (value) {
    //         if (value.length > 6) {
    //             return '昵称长度必须在1-6个字符之间'
    //         }
    //     }
    // })
    // // 初始化用户的基本信息
    // // 定义函数
    // function initUserInfo() {
    //     $.ajax({
    //         method: "GET",
    //         url: '/my/userinfo',
    //         success: function (res) {
    //             if (res.status != 0) {
    //                 return layer.msg("获取用户信息失败")
    //             } else {
    //                 // console.log(res);
    //                 $(".layui-input").val(res.data.username)
    //                 // 获取用户输入输入的信息
    //                 form.val('usertxt', res.data)
    //             }
    //         }
    //     })
    // }
    // initUserInfo()

    // // 定义重置按钮事件
    // $(".btnReset").on("click", function (e) {
    //     // 阻止阻止表单的默认提交行为
    //     e.preventDefault()
    //     // console.log(1111);
    //     initUserInfo()
    // })

    // //    监听表单提交事件
    // $(".layui-form").on("submit", function (e) {
    //     e.preventDefault()
    //     $.ajax({
    //         method: "POST",
    //         url: "/my/userinfo",
    //         //serialize()可以获取表单的所有数据
    //         data: $(".layui-form").serialize(),
    //         success: function (res) {
    //             if (res.status == 0) {
    //                 return layer.msg('更新用户信息成功')
    //                 // 用户信息更新完成后 将用户的信息渲染到住页面   通过window.parent来渲染
    //                 window.parent.getUserInfo()
    //             } else {
    //                 return layer.msg('更新用户信息失败')
    //             }
    //         }
    //     })
    // })

})