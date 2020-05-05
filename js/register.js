window.onload = function() {
    //表单正则表达式
    var regtel = /^1[3|4|5|7|8]\d{9}$/;
    var regqq = /^[1-9]\d{4,}$/;
    var regname = /^[\u4e00-\u9fa5]{2,8}$/;
    var regmsg = /^\d{6}$/;
    var regpwd = /^[a-zA-Z0-9_-]{6,16}$/;

    var tel = document.querySelector('#tel');
    var qq = this.document.querySelector('#QQ');
    var name = this.document.querySelector('#name');
    var msg = this.document.querySelector('#msg');
    var pwd = this.document.querySelector('#pwd');
    var confirm_pwd = this.document.querySelector('#confirm_pwd');


    regexp(tel, regtel); //手机号码
    regexp(qq, regqq); //qq号
    regexp(name, regname); //昵称
    regexp(msg, regmsg); //短信验证
    regexp(pwd, regpwd); //密码框验证


    //表单验证的函数
    function regexp(ele, reg) {
        ele.onblur = function() {
            if (reg.test(this.value)) {
                this.nextElementSibling.className = 'success';
                this.nextElementSibling.innerHTML = '<i class="success_icon"></i>恭喜您输入正确';
            } else {
                this.nextElementSibling.className = 'error';
                this.nextElementSibling.innerHTML = '<i class="error_icon"></i>输入格式不正确，请重新输入';
            }
        }
    };
    //确认密码验证
    confirm_pwd.onblur = function() {
        if (this.value == pwd.value) {
            this.nextElementSibling.className = 'success';
            this.nextElementSibling.innerHTML = '<i class="success_icon"></i>恭喜您输入正确';
        } else {
            this.nextElementSibling.className = 'error';
            this.nextElementSibling.innerHTML = '<i class="error_icon"></i>两次密码输入不一致';
        }
    };
}