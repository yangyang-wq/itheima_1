$(function () {
    let form = layui.form
    // 定义一个查询的参数对象，将来请求数据的时候，
    // 需要将请求参数对象提交到服务器
    var q = {
        pagenum: 1, // 页码值，默认请求第一页的数据
        pagesize: 2, // 每页显示几条数据，默认每页显示2条
        cate_id: '', // 文章分类的 Id
        state: '' // 文章的发布状态
    };
    fn()
    initCate()
    // 初始化文章分类列表
    function fn() {
        $.ajax({
            method: "GET",
            url: "/my/article/list",
            data: q,
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg("获取文章列表失败")
                } else {
                    // layui.layer.msg("获取文章列表成功")

                    let htmlStr = template('tpl-list', res)
                    $("tbody").html(htmlStr)
                    renderPage(res.total)
                }
            }
        })
    }
    // 利用template设置一个过滤器将时间改样式
    template.defaults.imports.dataFn = function (date) {
        let dt = new Date(date)
        let y = dt.getFullYear()
        let m = dt.getMonth() + 1
        m = m < 10 ? '0' + m : m
        let d = dt.getDate()
        d = d < 10 ? '0' + d : d
        let hh = dt.getHours()
        hh = hh < 10 ? '0' + hh : hh
        let mm = dt.getMinutes()
        mm = mm < 10 ? '0' + mm : mm
        let ss = dt.getSeconds()
        ss = ss < 10 ? '0' + ss : ss
        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }
    // 筛选按钮


    // 初始化文章分类的方法
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取分类数据失败！')
                }
                // 调用模板引擎渲染分类的可选项
                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                // 通过 layui 重新渲染表单区域的UI结构
                form.render()
            }
        })
    }


    //提交筛选表单里的数据来获取根据要求一样的数据
    $("#form-search").on('submit', function (e) {
        e.preventDefault()
        // 获取两个表单里面的val值
        let cate_id = $('[name=cate_id]').val()
        let state = $('[name=state]').val()
        // 然后将两个表单里面的值赋值给p对象里面cate_id和state
        q.cate_id = cate_id
        q.state = state
        // 根据获取到的表单里面的值 然后重新渲染一下文章列表
        fn()
    })


    // 定义渲染分页的方法
    function renderPage(total) {
        layui.use('laypage', function () {
            var laypage = layui.laypage;
            //执行一个laypage实例
            laypage.render({
                elem: 'test1', //注意，这里的 test1 是 ID，不用加 # 号
                count: total,//数据总数，从服务端得到
                limit: q.pagesize,//设置每页显示的数量
                curr: q.pagenum,//设置默认选择哪一页的
                layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
                limits: [2, 3, 10, 20],
                jump: function (obj, first) {
                    //obj包含了当前分页的所有参数，比如：
                    // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                    // console.log(obj.limit); //得到每页显示的条数
                    q.pagenum = obj.curr//把最新的页码值赋值给q.pagenum
                    q.pagesize = obj.limit
                    //首次不执行
                    if (!first) {
                        //do something
                        fn()
                    }
                }
            });
        });
    }


    // 点击编辑的时候打开弹出层


    // 单击删除按钮的时候删除当前的文章
    $("body").on("click", ".removebtn", function () {
        // 获取当前删除按钮的length
        let len = $(this).length
        // alert(1)
        let id = $(this).attr('data-id')
        // layui提供的模板
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除分类失败！')
                    }
                    layer.msg('删除分类成功！')
                    layer.close(index)

                    if (len == 1) {
                        q.pagenum = q.pagenum == 1 ? 1 : pagenum--
                    }
                    fn()
                }
            })
        })
    })
    $("tbody").on("click", "#btn-edit", function () {
        // location.href = 'atrcle_pub.html?id=' + $(this).attr('data-id')
        location.href = 'atrcle_pub.html?id=' + $(this).attr('data-id')

        $.ajax({
            method: "POST",
            url: "/my/article/add",
            // data: fd,
            contentType: false,
            processData: false,
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg("修改文章失败")
                } else {
                    layer.msg("修改文章成功")
                    form.val(res.data)
                    // location.href = 'article_list.html'
                }
            }
        })



    })





})