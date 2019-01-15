require('./style.scss');
const $ = require('jquery');
let bgm = $('#c-bgm')[0];
$('.c-bgm-ctr').on('click', function() {

    if (!bgm.paused) {
        bgm.pause();
        $(this).removeClass('c-bgm-playing');
    } else {
        bgm.play();
        $(this).addClass('c-bgm-playing');
    }

});
document.addEventListener('DOMContentLoaded', function() {
    function audioAutoPlay() {
        bgm.play();
        document.addEventListener("WeixinJSBridgeReady", function() {
            bgm.play();
        }, false);
    }
    audioAutoPlay();
});