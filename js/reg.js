window.onload = function() {
    var regTel = /^1[3|4|5|7|8]\d{9}$/;
    var tel = document.querySelector('#tel');
    var regQQ = /^[1-9]\d{4,}$/;
    var qq = document.querySelector('#qq');
    var regNc = /^[\u4e00-\u9fa5]{2,8}$/;
    var nc = document.querySelector('#nc');
    var regMsg = /^\d{6}$/;
    var msg = document.querySelector('#msg');
    var regPwd = /^[a-zA-Z0-9-_.]{6,16}$/;
    var pwd = document.querySelector('#pwd');
    var surePwd = this.document.querySelector('#surePwd');

    regexp(tel, regTel);
    regexp(qq, regQQ);
    regexp(nc, regNc);
    regexp(msg, regMsg);
    regexp(pwd, regPwd);

    function regexp(ele, reg) {
        ele.onblur = function() {
            if (reg.test(this.value)) {
                this.nextElementSibling.className = 'success';
                this.nextElementSibling.innerHTML = '<img src="images/success.png" alt=""> 恭喜您输入正确！';
            } else {
                this.nextElementSibling.className = 'error';
                this.nextElementSibling.innerHTML = '<img src="images/error.png" alt=""> 格式不正确，请重新输入！';
            }
        }
    }
    surePwd.onblur = function() {
        if (surePwd.value === pwd.value) {
            this.nextElementSibling.className = 'success';
            this.nextElementSibling.innerHTML = '<img src="images/success.png" alt=""> 恭喜您输入正确！';
        } else {
            this.nextElementSibling.className = 'error';
            this.nextElementSibling.innerHTML = '<img src="images/error.png" alt=""> 两次密码输入不一致，请重新输入！';
        }
    }
}