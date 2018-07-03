/*这必须凌驾于JS上*/
    var $ = mdui.JQ;//MDUI的选择器，不必引入MDUI了。
    var done= true;//颜色是否全部选择
    var theme = function(){
      var page={
        primary:"blue",
        accent:"pink"
      };
      var preview={
        primary:"red",
        accent:"pink"
      };
      this.set = {
        page:function(primary=false,accent=false){
          if(!primary||!accent) return false;
          if(typeof primary!="string"||typeof accent!="string") return false;
          $("body").removeClass("mdui-theme-primary-"+page.primary);
          $("body").removeClass("mdui-theme-accent-"+page.accent);
          $("body").addClass("mdui-theme-primary-"+primary);
          $("body").addClass("mdui-theme-accent-"+accent);
          page={
            primary:primary,
            accent:accent
          };
          return true;
        },
        preview:function(primary,accent){
          if(!primary||!accent) return false;
          if(typeof primary!="string"||typeof accent!="string") return false;
          $("[data-preview-primary]").removeClass("mdui-color-"+preview.primary);
          $("[data-preview-accent]").removeClass("mdui-color-"+preview.accent);
          $("[data-preview-primary]").addClass("mdui-color-"+primary);
          $("[data-preview-accent]").addClass("mdui-color-"+accent);
          preview = {
            primary:primary,
            accent:accent
          };
        }
      };
      this.info = {
        page:function(){return page;},
        preview:function(){return preview;}
      };
      $("body").addClass("mdui-theme-primary-"+page.primary);//初始化
      $("body").addClass("mdui-theme-accent-"+page.accent);
      $("[data-preview-primary]").addClass("mdui-color-"+preview.primary);
      $("[data-preview-accent]").addClass("mdui-color-"+preview.accent);
      return true;
    };
    theme = new theme();
    var setting = {
      primary:theme.info.preview().primary,
      accent:theme.info.preview().accent
    };
    var unsupportedAccent = ["Grey","Blue Grey","Brown"];
    $("g[data-color=\""+setting.primary.replace(/\-/g," ").replace(/^([a-z])| ([a-z])/g,function($1){return $1.toUpperCase();})+"\"]").addClass("selected selected--1");
    $("g[data-color=\""+setting.primary.replace(/\-/g," ").replace(/^([a-z])| ([a-z])/g,function($1){return $1.toUpperCase();})+"\"]").children("g[filter]").attr("filter","url(#drop-shadow)");
    $("g[data-color=\""+setting.accent.replace(/\-/g," ").replace(/^([a-z])| ([a-z])/g,function($1){return $1.toUpperCase();})+"\"]").addClass("selected selected--2");
    $("g[data-color=\""+setting.accent.replace(/\-/g," ").replace(/^([a-z])| ([a-z])/g,function($1){return $1.toUpperCase();})+"\"]").children("g[filter]").attr("filter","url(#drop-shadow)");
    $("g[data-color]").on("click",function(e){
      if(done){
        $("g[data-color=\""+setting.primary.replace(/\-/g," ").replace(/^([a-z])| ([a-z])/g,function($1){return $1.toUpperCase();})+"\"]").removeClass("selected selected--1");
        $("g[data-color=\""+setting.primary.replace(/\-/g," ").replace(/^([a-z])| ([a-z])/g,function($1){return $1.toUpperCase();})+"\"]").children("g[filter]").attr("filter","");
        $("g[data-color=\""+setting.accent.replace(/\-/g," ").replace(/^([a-z])| ([a-z])/g,function($1){return $1.toUpperCase();})+"\"]").removeClass("selected selected--2");
        $("g[data-color=\""+setting.accent.replace(/\-/g," ").replace(/^([a-z])| ([a-z])/g,function($1){return $1.toUpperCase();})+"\"]").children("g[filter]").attr("filter","");
        setting.primary=$(this).attr("data-color").toLowerCase().replace(/ /g,"-");
        console.log("您选择的主色："+$(this).attr("data-color"));
        $(this).addClass("selected selected--1");
        $(this).children("g[filter]").attr("filter","url(#drop-shadow)");
        $("#wheel svg").addClass("hide-nonaccents");
        done=!done;
      }else{
        if($(this).attr("data-color").toLowerCase().replace(/ /g,"-")!=setting.primary&&unsupportedAccent.indexOf($(this).attr("data-color"))==-1){
          setting.accent=$(this).attr("data-color").toLowerCase().replace(/ /g,"-");
          console.log("您选择的强调色："+$(this).attr("data-color"));
          $(this).addClass("selected selected--2");
          $(this).children("g[filter]").attr("filter","url(#drop-shadow)");
          console.log("主题色："+JSON.stringify(setting));
          theme.set.preview(setting.primary,setting.accent);
          $("#wheel svg").removeClass("hide-nonaccents");
          done=!done;
        }
      }
    });
    $("#apply").on("click",function(){
      theme.set.page(setting.primary,setting.accent);
      mdui.snackbar("已应用");
    });
