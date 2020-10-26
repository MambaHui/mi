
$(function(){
    /* 下拉列表 */
    (function(){
      $('.nav-list>.nav-item').each(function(i,item){
          if(i>0&i<8){
              $(item).hover(function(){
                      $.ajax({
                      url:`../json/header-menu${i}.json`,
                      type:'get',
                      dataType:'json',
                      cache:false,
                      async:false,
                      success:function(res){
                          $.each(res,function(i,v){
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
      })
    })();

    /* 详情页轮播图 */
    (function(){
      var mySwiper = new Swiper ('.swiper-container', {
        //   direction: 'vertical', // 垂直切换选项
          loop: true, // 循环模式选项
          autoplay:{
                delay:5000,
                disableOnInteraction: false
            },
          speed:800,
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
          },
          
          //* / 如果需要滚动条
          /* scrollbar: {
            el: '.swiper-scrollbar',
          }, */
        })
    })();
    
    (function(){
      //购物车
        //点击加入购物车，把商品加入数据库
        $(".btn-primary").click(function(){
          var numBer=parseInt(Math.random() * (20000));
          var numTwo=parseInt(Math.random() * (1000)+1);
          $('.bigFixed').show();
          $('.btn-primary').click(function(){
              $.ajax({
                url:'../php/interface/addwq.php',
                data:{
                    id:numBer,
                    name:'玩具',
                    price:numTwo,
                    img:'../images/mi-cart/swatter.jpg',
                    num:1
                },
                success:function(res){
                    if(res.code){
                        location.href="./cart.html";
                    }
                    isCheckAll();
                },
                dataType:'json'
            });
          });
          $('.btn-gray').click(function(){
            $('.bigFixed').hide();
          })
        });

        function isCheckAll(){
          var allChecks=$('.list-body').find('.item-box'),
              isAll=true,
              total=0,
              count=0,
              totalCount=0;
          // allChecks.each(function(index,item){
          //     // if($(item).find('.col-check i').attr('id')!='colorChk'){
          //     //     isAll=false;
          //     //     console.log($(item).find('.col-price').html().split('元')[0]);
          //     // }else{
          //     //     //计算总数
          //     //     total=$(item).find('.col-price').html().split('元')[0]
          //     // }
          //     console.log(index,item);
          // });
          console.log(allChecks);
        }

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