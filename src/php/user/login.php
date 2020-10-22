<?php
    header('content-type:text/html;charset=utf-8;');

    $uName=$_GET['username'];
    $uPass=$_GET['password'];

    //执行sql语句
    $conn=mysqli_connect('127.0.0.1','root','root','user');
    $sql = "SELECT * FROM `info` WHERE `username`='$uName' AND `userpass`='$uPass'";
    $res=mysqli_query($conn,$sql);
    $row=mysqli_fetch_assoc($res);
    mysqli_close($conn);

    if($row){
        //如果登陆成功，并且$expires有值
        // if($expires){
        //     echo json_encode(array("code"=>1,"msg"=>"账户登录成功"));
        //     setcookie('name',$uName,time()+10*24*60*60);
        // }else{
        //     //给浏览器写入cookie,会话时效
        //     setcookie('name',$uName);
        // }
        echo json_encode(array("code"=>1,"msg"=>"账户登录成功"));
    }else{
        echo json_encode(array("code"=>2,"msg"=>"服务器错误"));
    }

?>