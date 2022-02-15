$(function () {
    load_effect();
    $(window).scroll(function () {
        scroll_effect();
    });

    $('.contents').each(function (i, elem) {
        let contentsPOS = $(elem).offset().top;
        $(window).on('load scroll resize', function () {
            let winHeight = $(window).height();
            let scrollTop = $(window).scrollTop();
            let showClass = 'show';
            let timing = 100; // 100pxコンテンツが見えたら次のif文がtrue
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
    $('.load-up').each(function () {
        let yy = $(this).offset().top;
        if (tt > yy - hh) {
            $(this).addClass('done');
        }
    });
}

//ふわっとスクロール
function scroll_effect() {
    let tt = $(window).scrollTop();
    let hh = $(window).height();
    $('.scroll-up').each(function () {
        let yy = $(this).offset().top;//効果発生開始タイミングを操作したい場合は数値を変更する
        if (tt > yy - hh) {
            $(this).addClass('done');
        }
    });
    //突然現れて操作不能にする
    $('.scroll-appear').each(function () {
        let yy = $(this).offset().top + $(this).height() / 3;//効果発生開始タイミングを操作したい場合は数値を変更する
        if (tt > yy - hh / 2) {
            $('html *').css('overflow', 'hidden');
            $(window).on('touchmove.noScroll', function (e) {
                e.preventDefault();
            });
            setTimeout(function () {
                $('html *').css('overflow', 'visible');
                $(window).off('.noScroll');
            }, 2000);
            $(this).removeClass('scroll-appear');
        }
    });
}

const buttomPoint = document.body.clientHeight - window.innerHeight;
window.addEventListener('scroll', () => {
    const currentPos = window.scrollY;
    if (buttomPoint <= currentPos) {
        let invisibles = document.getElementsByClassName("invisible");
        for (let i = 0; i < invisibles.length; i++) {
            invisibles[i].classList.remove("invisible");
        }
        document.title = "The Chocolate Code";
        
    }
})