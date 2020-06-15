function animate(obj, target, callback) {
    // 首先清除掉之前的所有定时器，只保留当前一个定时器执行即可
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft == target) {
            // 停止定时器
            clearInterval(obj.timer);
            // 回调函数紧跟在定时器结束之后
            // if (callback) {
            //     callback();
            // }
            callback && callback();
        }
        // 步长公式：（目标值 - 现在的位置）/ 10
        obj.style.left = obj.offsetLeft + step + 'px';
    }, 15);
}