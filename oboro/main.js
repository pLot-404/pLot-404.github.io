let bgmls = {
  "music1":"bgm/first.mp3",
  "music2":"bgm/second.mp3",
  "music3":"bgm/third.mp3",
  "music4":"bgm/forth.mp3",
  "music5":"bgm/fifth.mp3"
};

//表示イベント
$(function(){
    load_effect();
    $(window).scroll(function(){
        scroll_effect();
        //play_music();
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


let bgm = [];
let nowbgm;

function play_music(){ //musicクラスのIDに合わせた音楽を流す
  let tt = $(window).scrollTop();
  $('.music').each(function(){
    let yy = $(this).offset().top;
    let end = Math.floor($(this).offset().top + $(this).height());
    let number = this.id;
    let bgma = new Audio(bgmls[number]);
    bgma.volume = 0.1;
    let clsls = $(this).attr('class').split(" ");
    if(tt + 100 > yy && clsls.indexOf('done') == -1 && tt <= end){
      $(this).addClass("done");
      bgma.play();
      bgm.push(bgma);
    }else if(tt > end){
      console.log("end");
      bgm[bgm.length-1].pause();
    }
  });
}
