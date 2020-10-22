<?php
    header('content-type:text/html;charset=utf-8;');

    /* 获取前端数据源 */
    $uname=$_GET['username'];
    $upss=$_GET['password'];

    //连接服务器
    $conn=mysqli_connect('127.0.0.1','root','root','user');
    $sql="INSERT INTO `info` VALUES (null,'$uname','$upss')";
    $res=mysqli_query($conn,$sql);
    mysqli_close($conn);

    if($res){
        echo json_encode(array("code"=>1,"msg"=>"账户创建成功"));
    }else{
        echo json_encode(array("code"=>2,"msg"=>"服务器错误"));
    }
    
?>