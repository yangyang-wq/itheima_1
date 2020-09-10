$(function () {
    let layer = layui.layer
    let form = layui.form
    initCate()
    function initCate() {
        $.ajax({
            method: "get",
            url: "/my/article/cates",
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg("获取文章列表失败")
                } else {
                    let htmlStr = template("tpl-cate", res)
                    $("[name=cate_id]").html(htmlStr)
                    form.render()
                }
            }
        })
    }

    // 调用富文本的函数,让富文本在页面中显示出来   初始化编辑器
    initEditor()
    // 文章封面选择裁剪区域
    // 1. 初始化图片裁剪器
    var $image = $('#image')
    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }
    // 3. 初始化裁剪区域
    $image.cropper(options)
    // 单击选择封面按钮触发的事件
    $("#chooseImageBtn").on("click", function () {
        $("#coverFile").click()
    })

    // 为coverFile表单注册change改变事件
    $("#coverFile").on("change", function (e) {
        let files = e.target.files
        // console.log(e);
        if (files.length == 0) {
            return
        }
        // 根据文件创建所对应的URL地址
        let newImgURL = URL.createObjectURL(files[0])
        // 为裁剪区域重新设置图片
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })

    var art_state = '已发布'
    $("#draftBtn").on("click", function () {
        art_state = '草稿'
    })
    // 监听表单的提交事件
    $("#form-pub").on("submit", function (e) {
        e.preventDefault()
        // 快速生成一个formdata表单对象,注意 formdata里面只接受原生参数传值不接jq的方法
        let fd = new FormData($(this)[0])
        fd.append('state', art_state)
        // 4. 将封面裁剪过后的图片，输出为一个文件对象
        $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {
                // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                // 5. 将文件对象，存储到 fd 中
                fd.append('cover_img', blob)
                // 6. 发起 ajax 数据请求
                publishArticle(fd)
            })
    })
    function publishArticle(fd) {
        $.ajax({
            method: "POST",
            url: "/my/article/add",
            data: fd,
            contentType: false,
            processData: false,
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg("发布文章失败")
                } else {
                    layer.msg("发布文章成功")
                    location.href = 'article_list.html'
                }
            }
        })
    }
})