/**
 * 游戏开始
 * @return {[type]} [description]
 */
function slotGames() {

    var $hmoepage         = $(".slot-homepage");
    var $helpContent      = $(".help-content");
    var $introduceContent = $(".introduce-content");
    var $music            = $(".slot-music");
    var $enter            = $hmoepage.find(".enter");
    var $help             = $hmoepage.find(".help");
    var $introduce        = $hmoepage.find(".introduce");
    var $introduceBack    = $hmoepage.find(".introduce-back");
    var $helpBack         = $hmoepage.find(".help-back");

    /**
     * 背景音乐
     * @param {[type]} url  [description]
     * @param {[type]} loop [description]
     */
    function Hmlt5Audio(url,loop) {
        var audio = new Audio(url);
        audio.autoplay = true;
        audio.loop = loop|| false; //是否循环
        audio.play();
        return {
            end: function(callback) {
                audio.addEventListener('ended', function() {
                    callback()
                }, false);
            },
            pause:function(){
               audio && audio.pause();
            },
            play:function(){
                audio && audio.play();
            }
        }
    }


    /**
     * 全局音乐
     * @type {Boolean}
     */
    var state;
    var audio = null;
    $music.on(utils.END_EV, function() {
        if (state === "play") {
            $music.addClass("pauseWalk");
            audio && audio.pause();
            state = "pause";
        } else {
            $music.removeClass("pauseWalk");
            audio && audio.play();
            state = "play";
        }
        if (!audio) {
            $music.addClass("slot-music-rotate");
            audio = Hmlt5Audio('music/scene.mp3');
            state = "play";
        }
    });
    $music.trigger(utils.END_EV)

    /**
     * 商家介绍
     * @return {[type]}   [description]
     */
    $introduce.on(utils.END_EV, function() {
        $introduceContent.show();
    });
    $introduceBack.on(utils.END_EV, function() {
        $introduceContent.hide();
    });


    /**
     * 活动介绍
     * @return {[type]}   [description]
     */
    $help.on(utils.END_EV, function() {
        $helpContent.show();
    });
    $helpBack.on(utils.END_EV, function() {
        $helpContent.hide();
    });


    /**
     * 进入游戏                         
     * @return {[type]}   [description]
     */
    $enter.on(utils.END_EV, function(e) {
        //隐藏主页
        $hmoepage.hide();
        //游戏页面
        var gameObj = new GamePage(".slot-gamepage");
        //退出游戏
        gameObj.watch("exit", function() {
            $hmoepage.show();
            gameObj.destroy();
        })
        return false;
    });


    // $enter.trigger(utils.END_EV)

}



/**
 * 老虎机主题
 * @return {[type]}   [description]
 */
$(function() {
    slotGames();
})
