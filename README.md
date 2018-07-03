# MDUI Colour Pad - MDUI主题调色盘

## 简介

[MDUI](https://www.mdui.org)是个不错的Material Design框架，支持多种主题配色，可惜的是，即使是官网，开发者也只是简单的弄了个radio选择：

![MDUI官网的主题切换器](https://i.loli.net/2018/07/03/5b3b129210c90.png)

实用性不用多说，但美观性肯定不是特别好了。于是我仿照[MDL](https://getmdl.io "Material Design Lite")的主题调色盘，为MDUI制作了一套主题调色。无图无真相：

![](https://i.loli.net/2018/07/03/5b3b14d888e2c.png)

## 特点

* 支持主题预览
* 响应式兼容
* 长的漂亮（长得不漂亮我就不会做这个调色板了）
* 100%符合Material Design标准

## FAQ

### 我想让主题能保存到浏览器里，下次自动加载，怎么办？

在按下保存按钮时将主题信息存储到localStorage里，下次载入时再从localStorage读取就可以了。不会自己实现的话，可以在`actions.js`里追加一下代码：

```js
$("#apply").on('click',function(){
  localStorage.theme = JSON.stringify(setting);//酌情修改theme
});
if(localStorage.theme)
  theme.set.page(JSON.stringify(localStorage.theme).primary,JSON.stringify(localStorage.theme).accent);
else
  localStorage.theme=setting;
```

### 我想让主题保存在服务器里，怎么办？

如上，只是按下保存时触发的是AJAX。

```js
$("#apply").on('click',function(){
  $.ajax({
    url:"yourPHPFile.php",//请修改，否则会404
    type:"POST",
    data:setting,
    error:function(){
      mdui.snackbar("保存失败！");
    },
    success:function(){
      mdui.snackbar("保存成功");
    }
  });
});
$.ajax({
  url:"yourPHPFile.php",//请修改，否则会404
  type:"GET",
  error:function(){
    mdui.snackbar("主题加载失败！");
  },
  success:function(rq,st,xhr){
    var t = JSON.parse(rq);
    theme.set.page(t.primary,t.accent);
  }
});
```

后端逻辑请自己脑补，这里以用PHP将信息存储在JSON里为栗子：

```php
<?php
  $default = [
    'primary'=>'blue',
    'accent'=>'pink'
  ];//默认主题
  $file = "theme.json";//主题存储的位置
  switch($_SERVER["REQUEST_METHOD"]){
    case "GET":
      header("Content-Type:application/json");
      if(!file_exists($file))
        echo json_encode($default,JSON_PRETTY_PRINT);
      else {
        $f = fopen($file,"r");
        $s = "";
        while(!feof($f)) $s.=fgets($f);
        fclose($f);
        echo $s;
      }
      break;
    case "POST":
      if(empty($_POST["primary"])||empty($_POST["accent"])){
        header("HTTP/1.1 400 Bad Request");
      }else{
        $f = fopen($file);
        fputs(json_encode([
          'primary'=>$_POST["primary"],
          'accent'=>$_POST["accent"]
        ],JSON_PRETTY_PRINT),$f);
        header("HTTP/1.1 203 Created");
      }
      break;
    default:
      header("HTTP/1.1 405 Method Not Allowed");
      header("Allow: GET, POST");
      break;
  }
```

### 我想揍死你/干死你/骂死你，怎么办？

三年起步，最高死刑。

## 关于我

联系信息写在[Hi社的介绍](https://github.com/DFFZMXJ/hi-buluo)里了。
