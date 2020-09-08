$(function () {
    let form = layui.form
    // 获取文章列表
    fn()
    function fn() {
        $.ajax({
            method: "GET",
            url: "/my/article/cates",
            success: function (res) {
                res.data.reverse();
                let htmlStr = template("tpl-text", res)
                $("tbody").html(htmlStr)

            }
        })
    }


    var indexAdd = null
    $(".tianjiabtn").on("click", function () {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $("#addtxt").html()
        });
    })
    $("body").on("submit", "#form-add", function (e) {
        e.preventDefault()
        $.ajax({
            method: "post",
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg("新增分类失败")
                }

                fn()
                layer.msg('新增分类成功！')
                layer.close(indexAdd)
            }
        })
    })
    // 单击编辑按钮添加点击事件
    let indexEdit = null
    // 点击编辑的时候打开弹出层
    $("tbody").on("click", "#btn-edit", function () {
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $("#dialog-edit").html()
        });
        let id = $(this).attr('data-id')
        $.ajax({
            method: "GET",
            url: '/my/article/cates/' + id,
            success: function (res) {
                // console.log(res);
                form.val('fit', res.data)
            }
        })

        // 将修改的信息上传至服务器
        $("body").on("submit", "#form-edit", function (e) {
            e.preventDefault()
            $.ajax({
                method: "POST",
                url: "/my/article/updatecate",
                data: $(this).serialize(),
                success: function (res) {
                    if (res.status !== 0) {
                        return layui.layer.msg("修改失败")
                    } else {
                        layui.layer.msg("修改成功")
                        layer.close(indexEdit)
                        fn()
                    }
                }
            })
        })
    })

    // 单击删除按钮的时候删除当前的文章
    $("body").on("click", ".removebtn", function () {
        // alert(1)
        let id = $(this).attr('data-id')
        // layui提供的模板
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除分类失败！')
                    }
                    layer.msg('删除分类成功！')
                    layer.close(index)
                    fn()
                }
            })
        })
    })


})