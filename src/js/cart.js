$(function(){
    (function(){
                showTbody();
                function showTbody(){
                    $.ajax({
                        url:'http://localhost/xiaomi/src/php/interface/showlist.php',
                        success:function(res){
                            if(res.code){
                                var arr = res.data;
                                $('.cart').show();
                                $('.vacancy').hide();
                                $('.header-title p').show();

                                //在list-body清空
                                $('.list-body').empty();
                                var totalArr=[];
                                $.each(arr,function(index,item){
                                    $('.list-body').append(`<div class="item-box" id="${item.product_id}">
                                    <div class="item-table">
                                        <div class="item-row clear">
                                            <div class="col col-check check-color">
                                                <i class="iconfont icon-checkbox">&#xe614;</i>
                                            </div>
                                            <div class="col col-img">
                                                <a href="javascript:void(0);">
                                                    <img src="${item.product_img}" alt="" width="80" height="80">
                                                </a>
                                            </div>
                                            <div class="col col-name">${item.product_name}</a>
                                            </div>
                                            <div class="col col-price">${item.product_price}元</div>
                                            <div class="col col-num">
                                                <div class="change-goods-num clear">
                                                    <a href="javascript:void(0);" class='jian iconfont'>&#xe608;</a>
                                                    <span id="goods-span">${item.product_num}</span>
                                                    <a href="javascript:void(0);" class="add iconfont">&#xe620;</a>
                                                </div>
                                            </div>
                                            <div class="col col-total">${(item.product_price)*(item.product_num)}元</div>
                                            <div class="col col-action">
                                                <a href="javascript:void(0);" title="删除" class="del iconfont">&#xe6a6;</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>`)
                                    var total=item.product_price*item.product_num;
                                    totalArr.push(total);
                                    if(index==arr.length-1){
                                        function sum(arr){
                                            var s=0;
                                            for(var i=arr.length-1;i>=0;i--){
                                                s+=arr[i];
                                            }
                                            return s;
                                        }
                                        $('.total-price em').html(sum(totalArr));
                                        $('.no-select-tip').hide();
                                        $('.total-price a').css({
                                            'backgroundColor':'#f25807',
                                            'borderColor': '#f25807',
                                            'color':'#fff'
                                        });
                                        //全部添加颜色
                                        $('.cart-goods-list .icon-checkbox').attr('id','colorChk');
                                        //点击全选 其他删掉
                                        clickAll()
                                        function clickAll(){
                                            var flag=true;
                                            $('.cart-goods-list .icon-checkbox').eq(0).click(function(){
                                                if(flag){
                                                    $('.cart-goods-list .icon-checkbox').removeAttr("id");
                                                    $('.total-price em').html(sum(totalArr)*0);
                                                    $('.no-select-tip').show();
                                                    $('.total-price a').css({
                                                        'backgroundColor':'#e0e0e0',
                                                        'borderColor': '#e0e0e0',
                                                        'color':'#b0b0b0',
                                                        'cursor':'default'
                                                    });
                                                    $('.section-left-span i').eq(1).html(arr.length*0);
                                                    flag=false;
                                                }else{
                                                    $('.cart-goods-list .icon-checkbox').attr('id','colorChk');
                                                    $('.total-price em').html(sum(totalArr));
                                                    $('.no-select-tip').hide();
                                                    $('.total-price a').css({
                                                        'backgroundColor':'#f25807',
                                                        'borderColor': '#f25807',
                                                        'color':'#fff',
                                                        'cursor':'pointer'
                                                    });
                                                    $('.section-left-span i').html(arr.length);
                                                    flag=true;
                                                }
                                                
                                            });
                                        }
                                        
                                        // /*单击某个商品 */
                                        // $('.cart-goods-list .icon-checkbox').click(function(){
                                        //     var flag=true;
                                        //     if($(this).index()){
                                        //         clickAll();
                                        //     }else{
                                               
                                        //         var danNum=parseInt($(this).parents().eq(1).children().eq(5).html().split('元')[0]);
                                        //         if(flag){
                                        //             $('.cart-goods-list .icon-checkbox').eq(0).removeAttr("id");
                                        //             $(this).removeAttr("id");
                                        //             $('.total-price em').html(sum(totalArr)-danNum);
                                        //             flag=false;
                                        //         }else{
                                        //             $('.cart-goods-list .icon-checkbox').eq(0).attr('id','colorChk');
                                        //             $(this).attr('id','colorChk');
                                        //             $('.total-price em').html(sum(totalArr)+danNum);
                                        //             flag=true;
                                        //         }
                                        //     }

                                        // })
                                        
                                    }


                                });

                                $('.section-left-span i').html(arr.length);

                            }else{
                                $('.cart').hide();
                                $('.vacancy').show();
                                $('.header-title p').hide();
                            }
                        },
                        dataType:'json',
                        cache:false
                    })
                }
                $('.list-body').click(function(e){
                    var target=e.target;
                    e.stopPropagation();
                    //target是一个节点
                    if($(target).hasClass('jian')||$(target).hasClass('add')){
                        var classNa=target.className.trim().split(' ')[0];
                        $.ajax({
                            url:'http://localhost/xiaomi/src/php/interface/updatewq.php',
                            data:{
                                type:classNa,
                                id:$(target).parents('.item-box').attr('id')
                            },
                            success:function(res){
                                if(res.code){
                                    showTbody();
                                }
                            },
                            dataType:'json'
                        });
                    }else if($(target).hasClass('del')){
                        $('.bigFixed').show();
                        $('.btn-primary').click(function(){
                            $.ajax({
                                url:'http://localhost/xiaomi/src/php/interface/delwq.php',
                                data:{
                                    id:$(target).parents('.item-box').attr('id')
                                },
                                success:function(res){
                                    if(res.code){
                                        showTbody();
                                        $('.bigFixed').hide();
                                    }
                                },
                                dataType:'json'
                            });
                        });
                        $('.btn-gray').click(function(){
                            $('.bigFixed').hide();
                        });
                    }
                })
    })()
})