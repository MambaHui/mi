$(function(){

    (function(){
        $('input').eq(2).click(function(){
            var uName=$('#username').val();
            var uPass=$('#password').val();
            if((uName == null || uName == "")||(uPass == null || uPass == "")){
                $('.err_win').hide();
                $('.err_tip').show();

            }else{
                $('.err_win').show();
                $('.err_tip').hide();
                $.ajax({
                url:'../php/user/register.php',
                type:'get',
                data:{
                    username:uName,
                    password:uPass
                },
                dataType:'json',
                cache:false,
                success:function(res){
                    if(res.code == 1){
                        $('.err_win').children().html('账户名可以用').css('color','yellowgreen');
                        $('.err_win2').css({
                            'display':'block',
                            'color':'yellowgreen'
                        });
                        var timer1=setTimeout(function(){
                            location.href='./login.html';
                            clearTimeout(timer1);
                        },3000)
                    }else if(res.code==2){
                        alert('服务器请求失败');
                    }
                },
                error:function(){
                    alert('无法连接至服务器');
                }
            });
            }
        })
    })();

})