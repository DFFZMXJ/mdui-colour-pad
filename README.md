# MDUI Colour Pad - MDUI主题调色盘

## 简介

目前在JQ22网站有投稿，[可以点我查看](http://www.jq22.com/yanshi19463)。

[MDUI](https://www.mdui.org)是个不错的Material Design框架，支持多种主题配色，可惜的是，即使是官网，开发者也只是简单的弄了个radio选择：

![MDUI官网的主题切换器](https://i.loli.net/2018/07/03/5b3b129210c90.png)

实用性不用多说，但美观性肯定不是特别好了。于是我仿照[MDL](https://getmdl.io "Material Design Lite")的主题调色盘，为MDUI制作了一套主题调色。无图无真相：

![](https://i.loli.net/2018/07/03/5b3b14d888e2c.png)

## 特点

* 支持主题预览
* 响应式兼容
* 长的漂亮（长得不漂亮我就不会做这个调色板了）
* 大部分符合Material Design标准（除了有2个FAB不符合外）

## FAQ

### 我想让主题保存在服务器里，怎么办？

按下保存时触发是AJAX上传。

假想发送到后台的数据为：

```json
{
  "primary":"主色",
  "accent":"强调色"
}
```

这里以用PHP将信息存储在JSON里为栗子：

```php
<?php
  $file = "settings.json";
  switch($_SERVER["REQUEST_METHOD"]){
    case "GET":
      if(!file_exists){
        header("HTTP/1.1 404 Not Found");
        die(json_encode(['error'=>true,'data'=>'服务器无存储']));
      }
      die(json_encode('error'=>false,'data'=>json_decode(file_get_contents($file),true)));
      break;
    case "POST":
      if(empty($_POST["primary"])||empty($_POST["accent"])){
        header("HTTP/1.1 406 Unacceptable");
        die(json_encode(['error'=>true,'data'=>'数据不完整']));
      }else{
        file_put_contents($file,json_encode(['primary'=>$_POST['primary'],'accent'=>$_POST['accent']]));
        header("HTTP/1.1 203 Created");
      }
      break;
    default:
      header("HTTP/1.1 405 Method Not Allowed");
      die(json_encode(['error'=>true,'方法不允许']));
      break;
  }
```

## 关于我

联系信息写在[Hi社的介绍](https://github.com/DFFZMXJ/hi-buluo)里了。
