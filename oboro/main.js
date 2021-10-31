let bgmls = {
  "music1":"bgm/first.mp3",
  "music2":"bgm/second.mp3",
  "music3":"bgm/third.mp3",
  "music4":"bgm/forth.mp3",
  "music5":"bgm/fifth.mp3",
  "music6":"bgm/sixth.mp3",
  "music7":"bgm/second.mp3",
  "se1":"bgm/close.mp3",
  "se2":"bgm/tryopen.mp3",
  "se3":"bgm/mask.mp3",
  "se4":"bgm/manymask.mp3",
  "se5":"bgm/窓をノック1.mp3",
  "se6":"bgm/ドアをドンドン叩く.mp3",
  "se7":"bgm/ガラスにひびが入る.mp3",
  "se8":"bgm/ガラスが割れる1.mp3"
};

let bgm = new Audio();
let wbgm;

//表示イベント
$(function(){
    load_effect();
    $(window).scroll(function(){
        scroll_effect();
        play_music();
    });

    $(".load-up").on("click",".box",function(){
      console.log("clicked")
      bgm.src = bgmls["music1"];
      bgm.load();
      bgm.play();
    });

    $('.contents').each(function(i, elem){
        let contentsPOS = $(elem).offset().top;
        $(window).on('load scroll resize', function(){
            let winHeight = $(window).height();
            let scrollTop = $(window).scrollTop();
            let showClass = 'show';
            let timing = 100; // 100pxコンテンツが見えたら次のif文がtrue
            if (scrollTop >= contentsPOS - winHeight + timing){
              $(elem).addClass(showClass);
            } else {
              $(elem).removeClass(showClass);
            }
        });
    });
});




//ふわっとロード
function load_effect(){
    let tt = $(window).scrollTop();
    let hh = $(window).height();
    $('.load-up').each(function(){
        let yy = $(this).offset().top;
        if (tt > yy - hh){
            $(this).addClass('done');
        }
    });
}

//ふわっとスクロール
function scroll_effect(){
    let tt = $(window).scrollTop();
    let hh = $(window).height();
    $('.scroll-up').each(function(){
        let yy = $(this).offset().top;//効果発生開始タイミングを操作したい場合は数値を変更する
        if (tt > yy - hh){
            $(this).addClass('done');
        }
    });
    //突然現れて操作不能にする
    $('.scroll-appear').each(function(){
        let yy = $(this).offset().top+$(this).height()/3;//効果発生開始タイミングを操作したい場合は数値を変更する
        if (tt > yy - hh/2){
            $('html *').css('overflow','hidden');
            $(window).on('touchmove.noScroll', function(e){
                e.preventDefault();
            });
            setTimeout(function(){
                $('html *').css('overflow','visible');
                $(window).off('.noScroll');
            }, 2000);
            $(this).removeClass('scroll-appear');
        }
    });
}

function play_music(){
  let tt = $(window).scrollTop();
  $(".music").each(function(){
    let yy = $(this).offset().top;
    let num = this.id;
    let end = $(this).offset().top + $(this).height();
    let clsls = $(this).attr('class').split(" ");
    if(tt > yy && clsls.indexOf('done') == -1 && tt <= end && num != wbgm){
      console.log(num);
      $(this).addClass("done");
      bgm.pause();
      bgm.src = bgmls[num];
      wbgm = num
      bgm.load();
      bgm.play();
    }
  });

  $(".se").each(function(){
    let yy = $(this).offset().top;
    let num = this.id;
    let clsls = $(this).attr('class').split(" ");
    if(tt > yy - 100 && clsls.indexOf('done') == -1){
      console.log(num);
      $(this).addClass("done");
      bgm.pause();
      bgm.src = bgmls[num];
      bgm.load();
      bgm.play();
      bgm.addEventListener("ended",function(){
        bgm.src = bgmls[wbgm];
        bgm.load();
        bgm.play();
      });
    }
  });
}
