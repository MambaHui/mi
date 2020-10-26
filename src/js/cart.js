$(function () {

    (function () {
        
        
        //渲染商品
        function showTbody() {
            $.ajax({
                url: '../php/interface/showlist.php',
                success: function (res) {
                    if (res.code) {
                        var arr = res.data;
                        $('.cart').show();
                        $('.vacancy').hide();
                        $('.header-title p').show();
                        //在list-body清空
                        $('.list-body').empty();
                        var totalArr = [];
                        $.each(arr, function (index, item) {
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
                        });

                        $('.cart .icon-checkbox').attr('id', 'colorChk');

                        isCheckAll();
                    } else {
                        $('.cart').hide();
                        $('.vacancy').show();
                        $('.header-title p').hide();
                    };

                },
                dataType: 'json',
                cache: false
            });
        }

        //删除商品
        $('.list-body').click(function (e) {
            var target = e.target;
            e.stopPropagation();
            //target是一个节点
            if ($(target).hasClass('jian') || $(target).hasClass('add')) {
                var classNa = target.className.trim().split(' ')[0];
                $.ajax({
                    url: '../php/interface/updatewq.php',
                    data: {
                        type: classNa,
                        id: $(target).parents('.item-box').attr('id')
                    },
                    success: function (res) {
                        if (res.code) {
                            showTbody();
                        }
                    },
                    dataType: 'json'
                });

            } else if ($(target).hasClass('del')) {
                $('.bigFixed').show();
                $('.btn-primary').click(function () {
                    $.ajax({
                        url: '../php/interface/delwq.php',
                        data: {
                            id: $(target).parents('.item-box').attr('id')
                        },
                        success: function (res) {
                            if (res.code) {
                                showTbody();
                                $('.bigFixed').hide();
                            }
                        },
                        dataType: 'json'
                    });
                });
                $('.btn-gray').click(function () {
                    $('.bigFixed').hide();
                });
            }

        });

        //全选按钮 复选按钮 
        function checkFunc(){
            $('.cart .list-head .check-color').find('i').click(function(){
                var sonCheckBox = $('.list-body').find('.item-table .item-row .col-check').find('i');
                if($(this).attr('id')=='colorChk'){
                    $(this).add(sonCheckBox).removeAttr('id');
                }else{
                    $(this).add(sonCheckBox).attr('id', 'colorChk');
                }
                isCheckAll();
            });

            //单复选框 事件委托点击
            $('.list-body').on('click','.item-row .col-check i',function(){
                if($(this).attr('id')=='colorChk'){
                    $(this).removeAttr('id');
                }else{
                    $(this).attr('id', 'colorChk');
                }
                isCheckAll();
            })


        }

        //判断有多少个被选中
        function isCheckAll(){
            var allChecks=$('.list-body').find('.item-box'),
                isAll=true,
                total=0,
                count=0,
                totalCount=0;
            allChecks.each(function(index,item){
                if($(item).find('.col-check i').attr('id')!='colorChk'){
                    isAll=false;
                }else{
                    //计算总数
                    total+=parseInt($(item).find('.col-price').html().split('元')[0])*parseInt($(item).find('.col-num span').html());
                    count+=parseInt($(item).find('.col-num span').html());
                }
                //计算所有购物车共有几件
                totalCount+=parseInt($(item).find('.col-num span').html());
            });
            $('.section-left span i').eq(0).html(totalCount);
            $('.section-left span i').eq(1).html(count);
            $('.total-price em').html(total);
            //判断total 是否为0
            if(total!=0){
                $('.btn-disabled').css({
                    'backgroundColor':'#f25807',
                    'borderColor':'#f25807',
                    'color':'#fff',
                    'cursor':'pointer'
                })
                $('.no-select-tip').hide();
            }else{
                $('.btn-disabled').css({
                    'backgroundColor':'#e0e0e0',
                    'borderColor':'#e0e0e0',
                    'color':'#b0b0b0',
                    'cursor':'default'
                })
                $('.no-select-tip').show();
            }
            //判断是否全选
            if(isAll){
                $('.cart .list-head .check-color i').attr('id', 'colorChk');
            }else{
                $('.cart .list-head .check-color i').removeAttr('id');
            }
        }
            
        

        showTbody();
        checkFunc();
    })();


})