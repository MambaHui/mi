$(function(){
    /* 下拉列表 */
    (function(){
        $('.nav-list>.nav-item').each(function(i,item){
            if(i<=6){
                $(item).hover(function(){
                    $.ajax({
                        url:`../json/header-menu${i+1}.json`,
                        type:'get',
                        dataType:'json',
                        cache:false,
                        async:false,
                        success:function(res){
                            $.each(res,function(i,v){
                                // console.log(v.price);
                                $('.header-nav-menu-active li').eq(i).find('img').attr('src',v.img);
                                $('.header-nav-menu-active li').eq(i).find('.ltitle').html(v.title);
                                $('.header-nav-menu-active li').eq(i).find('.price').html(v.price);
                            })
                        }
                    });
                    $('.header-nav-menu-active').stop();
                    $('.header-nav-menu-active').slideDown(300);
                },function(){
                    $('.header-nav-menu-active').stop();
                    $('.header-nav-menu-active').slideUp(300);
                })
            }
        })
        $('.header-nav-menu-active').hover(function(){
            $('.header-nav-menu-active').stop()
            $('.header-nav-menu-active').slideDown(300)
        },function(){
            $('.header-nav-menu-active').stop()
            $('.header-nav-menu-active').slideUp(300)
            /* .con-mainNav .header-nav-menu-active */
        })
    })();
    /* 轮播图 */
    (function(){
        var mySwiper = new Swiper ('.Big-banner', {
            /* direction: 'horizontal', // 垂直切换选项  默认horizontal(横向) */
            loop: true, // 循环模式选项
            autoplay:{
                delay:7000,
                disableOnInteraction: false
            },
            speed:800,//设置transition-duration 的时间戳
            /* effect:'flip', */
            effect : 'fade',
            fadeEffect: {
                  crossFade: true,
              },
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
              clickable :true,
            },
            
            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
              disabledClass: 'my-button-disabled',
            },
            
          }) 
    })();
    /* 倒计时 */
    (function(){
          function delta(){
            var myDate=new Date();
            //获取当前年
            var year=myDate.getFullYear();
            //获取当前月
            var mon=myDate.getMonth()+1;
            //获取当前日
            var day=myDate.getDate();
            //目标时间
            var targetTime = $('.caption').html().substr(0,2);
            //目标时间到格林威治时间的时间差
            let date=new Date(year,mon,day,targetTime).getTime();
            //当前时间到格林威治时间的时间差
            let nowTime=myDate.getTime();
            //目标时间与当前时间的时间差(把毫秒换算成秒)
            var timeDif=parseInt((date-nowTime)/1000);
            if(timeDif<0){
                clearInterval(times);
            }
            //计算出多少天
            var deltaD=Math.floor(timeDif/(24*60*60));
            //计算多少个小时
            var afterHours=timeDif-deltaD*24*60*60;
            var hours=parseInt(afterHours/3600);
            //计算多少分钟
            var afterMinutes=afterHours-hours*3600;
            var minutes=Math.floor(afterMinutes/60);
            //计算多少秒
            var seconds=afterMinutes-minutes*60;
            //把时间显示在页面
            $(".schedule").children('span').each(function(i,val){
                switch(i){
                    case i=0:
                        //判断时间的位数
                        if(hours<10){
                            val.innerHTML='0'+hours;
                        }else{
                            val.innerHTML=hours;
                        }
                    break;
                    case i=1:
                        if(minutes<10){
                                val.innerHTML='0'+minutes;
                            }else{
                                val.innerHTML=minutes;
                            }
                    break;
                    case i=2:
                        if(seconds<10){
                                val.innerHTML='0'+seconds;
                            }else{
                                val.innerHTML=seconds;
                            }
                    break;
                }
            });
        }
        delta();
        let times=setInterval(function(){
            delta()   
        },1000);
    })();
    /* 闪购轮播图 */
    (function(){
        var mySwiper = new Swiper ('.swiper-iflashbuy', {
            /* direction: 'horizontal', // 垂直切换选项  默认horizontal(横向) */
            // loop: true, // 循环模式选项
            autoplay:{
                delay:4000,
            },
            speed:1000,//设置transition-duration 的时间戳
            slidesPerView : 4,
            slidesPerGroup : 4,
            spaceBetween:14,
            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-flashsale-prev',
              prevEl: '.swiper-flashsale-next',
            },
            
          })
    })();
    
    //登录特效
    (function(){
        $('.triumph').hover(function(){
            $(this).css('backgroundColor','#fff');
            $(this).children().eq(1).slideDown();
        },function(){
            $(this).css('backgroundColor','#333');
            $(this).children().eq(1).slideUp();
        })
    })();

    //获取cookie
    (function(){

        var num =getCookie("cookie");
        if(num == null || num == ""){
            $('.fist').show();
            $('.two').hide();
        }else{
            $('.fist').hide();
            $('.two').show();
            $('.triumph span').html(num);
            $('.user-menu-wrapper ul').children().eq(4).click(function(){
                setCookie('cookie',num,-1);
                $('.fist').show();
                $('.two').hide();
            })
        }

        function getCookie(key){
            var str = "";
            var tmp = document.cookie.split('; ');
            for(var i=0;i<tmp.length;i++){
                var t = tmp[i].split('=');
                if(t[0]===key){
                    str = t[1];
                }
            }
            return str; 
        }
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

