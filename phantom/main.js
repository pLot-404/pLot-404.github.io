let bgmls = {
  music2: "bgm/second.mp3",
  music4: "bgm/forth.mp3",
  music5: "bgm/fifth.mp3",
  music6: "bgm/sixth.mp3",
  music7: "bgm/second.mp3",
  music8: "bgm/7buuu.wav",
  se1: "bgm/close.mp3",
  se7: "bgm/ガラスにひびが入る.mp3",
  se8: "bgm/ガラスが割れる1.mp3",
  se9: "bgm/himei_kyaa_reverb.wav",
  se10: "bgm/moshi1.wav",
  se11: "bgm/nigasanai.wav",
  se12: "bgm/yurusanai.wav",
  se13: "bgm/phone.wav"
};

let bgm = new Audio();
let wbgm;

//表示イベント
$(function () {
  load_effect();
  $(window).scroll(function () {
    scroll_effect();
    play_music();
  });

  $(".load-up").on("click", ".box", function () {
    bgm.src = bgmls["music6"];
    bgm.load();
    bgm.play();

    $("#fiction").text("フィクションだと誰が言った？");
    $("#fiction").attr(
      "style",
      "color: red; font-family: 'Klee One',cursive; font-weight: 900;"
    );
    setTimeout(() => {
      $("#load-up-header").remove();
      $("#ploth3").remove();
    }, 300);
  });

  $(".contents").each(function (i, elem) {
    let contentsPOS = $(elem).offset().top;
    let contentHeight = $(elem).height();
    $(window).on("load scroll resize", function () {
      let winHeight = $(window).height();
      let scrollTop = $(window).scrollTop();
      let showClass = "show";
      let timing = contentHeight * 0; // 100pxコンテンツが見えたら次のif文がtrue
      if (scrollTop >= contentsPOS - winHeight + timing) {
        $(elem).addClass(showClass);
      } else {
        $(elem).removeClass(showClass);
      }
    });
  });
});

//ふわっとロード
function load_effect() {
  let tt = $(window).scrollTop();
  let hh = $(window).height();
  $(".load-up").each(function () {
    let yy = $(this).offset().top;
    if (tt > yy - hh) {
      $(this).addClass("done");
    }
  });
}

//ふわっとスクロール
function scroll_effect() {
  let tt = $(window).scrollTop();
  let hh = $(window).height();
  $(".scroll-up").each(function () {
    let yy = $(this).offset().top; //効果発生開始タイミングを操作したい場合は数値を変更する
    if (tt > yy - hh) {
      $(this).addClass("done");
    }
  });
  //突然現れて操作不能にする
  $(".scroll-appear").each(function () {
    let yy = $(this).offset().top + $(this).height() / 3; //効果発生開始タイミングを操作したい場合は数値を変更する

    let clsls = $(this).attr("class").split(" ");

    if (tt > yy - hh / 2) {
      $("html *").css("overflow", "hidden");
      $(window).on("touchmove.noScroll", function (e) {
        e.preventDefault();
      });
      setTimeout(function () {
        $("html *").css("overflow", "visible");
        $(window).off(".noScroll");
      }, 2000);
      $(this).removeClass("scroll-appear");
      $(this).addClass("scroll-done");

      if (clsls.indexOf("mute") != -1) {
        bgm.pause();
      }
    }
  });

  $(".chakusin").each(function () {
    let yy = $(this).offset().top; //効果発生開始タイミングを操作したい場合は数値を変更する
    if (tt > yy - hh/2) {
      $("html *").css("overflow", "hidden");
      $(window).on("touchmove.noScroll", function (e) {
        e.preventDefault();
      });
      $("#chakusin").css("display", "block");
      setTimeout(function () {
        $("#chakusin").css("display", "none");
        $("html *").css("overflow", "visible");
        $(window).off(".noScroll");
      }, 3000);
      $(this).removeClass("chakusin");
      bgm.pause();
      bgm.src = bgmls["se13"];
      bgm.load();
      bgm.play();
      bgm.addEventListener("ended", function () {
        bgm.src = bgmls[wbgm];
        bgm.load();
        bgm.play();
      });
      window.navigator.vibrate([900, 100, 900, 100, 900, 100]);
    }
  });

  $(".break").each(function () {
    let yy = $(this).offset().top; //効果発生開始タイミングを操作したい場合は数値を変更する
    if (tt > yy - hh/2) {
      $("#break").css("display", "block");
      bgm.pause();
      bgm.src = bgmls["se7"];
      bgm.load();
      bgm.play();
      bgm.addEventListener("ended", function () {
        bgm.src = bgmls[wbgm];
        bgm.load();
        bgm.play();
      });
      $(this).removeClass("break")
    }
  });

  $(".broken").each(function () {
    let yy = $(this).offset().top; //効果発生開始タイミングを操作したい場合は数値を変更する
    if (tt > yy - hh/2) {
      $("#break").css("display", "none");
      bgm.pause();
      bgm.src = bgmls["se8"];
      bgm.load();
      bgm.play();
      bgm.addEventListener("ended", function () {
        bgm.src = bgmls[wbgm];
        bgm.load();
        bgm.play();
      });
      $(this).removeClass("broken")
    }
  });

  $(".reload").each(function () {
    let yy = $(this).offset().top; //効果発生開始タイミングを操作したい場合は数値を変更する
    if (tt > yy - hh/2) {
      setTimeout(function(){
        window.location.href = '/'
      },5000)
    }
  });
}

function play_music() {
  let tt = $(window).scrollTop();
  $(".music").each(function () {
    let yy = $(this).offset().top;
    let num = this.id;
    let end = $(this).offset().top + $(this).height();
    let clsls = $(this).attr("class").split(" ");
    if (tt > yy && clsls.indexOf("done") == -1 && tt <= end && num != wbgm) {
      $(this).addClass("done");
      bgm.pause();
      bgm.src = bgmls[num];
      wbgm = num;
      bgm.load();
      bgm.play();
    }
  });

  $(".se").each(function () {
    let yy = $(this).offset().top;
    let num = this.id;
    let clsls = $(this).attr("class").split(" ");
    if (tt > yy - 100 && clsls.indexOf("done") == -1) {
      $(this).addClass("done");
      bgm.pause();
      bgm.src = bgmls[num];
      bgm.load();
      bgm.play();
      bgm.addEventListener("ended", function () {
        bgm.src = bgmls[wbgm];
        bgm.load();
        bgm.play();
      });
    }
  });
}
