$(function(){
    /* 登录tab选项卡 */
    (function(){
        $('.tabs a').click(function(){
            //记录点击的a
            var index=$(this).index('a');
            $(this)
            .addClass('now')
            .siblings()
            .removeClass('now')
            .parent()
            .next()
            .children()
            .removeClass('active')
            .eq(index-2)
            .addClass('active')
        })
    })();

    //登录
    (function(){
        $('input').eq(2).click(function(){
            var uName=$('#username').val();
            var uPass=$('#password').val();
            if((uName == null || uName == "")||(uPass == null || uPass == "")){
                $('.err_tip').css("visibility",'visible');
            }else{
                $.ajax({
                    url:'../php/user/login.php',
                    type:'get',
                    data:{
                        username:uName,
                        password:uPass
                    },
                    dataType:'json',
                    cache:false,
                    success:function(res){
                        if(res.code==1){
                                setCookie('cookie',$('#username').val(),700000);
                                location.href='./index.html';
                        }else if(res.code==2){
                            $('.error').show();
                        }
                    },
                    error:function(){
                        alert('无法连接至服务器');
                    }
                });
            }
        })
        
        function setCookie(key,value,expires){
            if(expires){
                var time = new Date();
                time.setTime(time.getTime()-8*60*60*1000 + 1000*expires);
                document.cookie = key+"="+value+";expires="+time;
            }else{
                document.cookie = key+"="+value;
            }
        }

    })();
    
});