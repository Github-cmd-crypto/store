window.addEventListener('load', function() {
    var left = document.querySelector('.left');
    var right = document.querySelector('.right');
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;
    focus.addEventListener('mouseenter', function() {
        left.style.display = 'block';
        right.style.display = 'block';
        clearInterval(timer);
        timer = null; //清除定时器变量节省空间
    });
    focus.addEventListener('mouseleave', function() {
        left.style.display = 'none';
        right.style.display = 'none';
        timer = setInterval(function() {
            right.click();
        }, 2000);
    });
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.dot');
    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        // 设置自定义属性index
        li.setAttribute('index', i)
        ol.appendChild(li);
        li.addEventListener('click', function() {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'selected';
            var index = this.getAttribute('index');
            num = circle = index;
            animate(ul, -index * focusWidth);
        });
    }
    ol.children[0].className = 'selected';
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    var num = 0;
    var circle = 0;
    var flag = true; //设置节流阀
    right.addEventListener('click', function() {
        if (flag) {
            flag = false //关闭节流阀
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function() {
                flag = true;
            });
            circle++;
            if (circle == ol.children.length) {
                circle = 0;
            }
            circleChange()
        }
    });
    left.addEventListener('click', function() {
        if (flag) {
            flag = false;
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';

            }
            num--;
            animate(ul, -num * focusWidth, function() {
                flag = true;
            });
            circle--;
            if (circle < 0) {
                circle = ol.children.length - 1;
            }
            circleChange()
        }
    });

    function circleChange() {
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'selected';
    }
    var timer = setInterval(function() {
        right.click();
    }, 2000);
});

$(function() {
    var flag = true;
    var toolTop = $(".recom_hd").offset().top;
    toggleTool();

    function toggleTool() {
        if ($(document).scrollTop() >= toolTop) {
            $(".fixedtool").fadeIn();
        } else {
            $(".fixedtool").fadeOut();
        }
    }
    $(window).scroll(function() {
            toggleTool();
            // 页面滚动到某个内容区域，左侧的电梯导航的小li添加和删除相应的current类名
            if (flag) {
                $(".floor .w").each(function(i, ele) {
                    if ($(document).scrollTop() >= $(ele).offset().top) {
                        // console.log(i);
                        $(".fixedtool li").eq(i).addClass("current").siblings().removeClass();
                    }
                })
            }
        })
        // 点击电梯导航页面可以滚动到相应的内容区域
    $(".fixedtool li").click(function() {
        // console.log($(this).index());
        flag = false;
        var current = $(".floor .w").eq($(this).index()).offset().top;
        $("body,html").stop().animate({
            scrollTop: current
        }, function() {
            flag = true;
        });
        $(this).addClass("current").siblings().removeClass();
    })
})