// RealGhost v0.1 by Simkin Andrew - http://RealAdmin.ru

(function ($) {
    $.fn.RealGhost = function (options) {

        var settings = $.extend({
            id: 'ghost',
            speed: 2000,
            sound: {}, // enabled: true, path: 'audio/ghost.mp3', speed: 1.5, volume: 0.4
            imageSrc: '../images/ghost.png',
            route: 'bottom-top',
            bouncing: false,
        }, options);

        // default sound settings
        if (settings.sound.path === undefined) settings.sound.path = '../audio/ghost.mp3';
        if (settings.sound.speed === undefined) settings.sound.speed = 1.5;
        if (settings.sound.volume === undefined) settings.sound.volume = 0.4;

        // create element before close body tag
        var gostID = settings.id;

        // if object playing then exit
        if ($('#' + gostID).length > 0) return;

        // create object with background and effect
        $('<div>', { id: gostID, class: 'RealGhost' }).appendTo('body');
        $('#' + gostID).css('background', 'url(' + settings.imageSrc + ') no-repeat');
        if (settings.bouncing) $('#' + gostID).css('animation', 'bouncing 0.1s cubic-bezier(0.1,0.25,0.1,1) 0s infinite alternate both');


        // if random route
        if (settings.route == 'random') {
            var route = ['top-bottom', 'left-right', 'right-left', 'left-top', 'top-left', 'bottom-top'];
            var rand = Math.floor(Math.random() * route.length);
            settings.route = route[rand];
        }

        // select route
        switch (settings.route) {
            case 'top-bottom':
                $('#' + gostID).css('transform', 'rotate(180deg)');
                $('#' + gostID).css({ 'left': '40%', 'top': '-400px' });
                settings.endAnimatePos = { top: "100%" };
                break;

            case 'left-right':
                $('#' + gostID).css('transform', 'rotate(90deg)');
                $('#' + gostID).css({ 'left': '-400px', 'top': '40%' });
                settings.endAnimatePos = { left: "100%" };
                break;

            case 'right-left':
                $('#' + gostID).css('transform', 'rotate(-90deg)');
                $('#' + gostID).css({ 'left': '100%', 'top': '40%' });
                settings.endAnimatePos = { left: "-400px" };
                break;

            case 'left-top':
                $('#' + gostID).css('transform', 'rotate(45deg)');
                $('#' + gostID).css({ 'left': '10%', 'top': '100%' });
                settings.endAnimatePos = { top: "-400px", left: "90%" };
                break;

            case 'top-left':
                $('#' + gostID).css('transform', 'rotate(225deg)');
                $('#' + gostID).css({ 'left': '90%', 'top': '-400px' });
                settings.endAnimatePos = { top: "100%", left: "10%" };
                break;

            default: /* bottom-top */
                $('#' + gostID).css({ 'left': '40%', 'top': '100%' });
                settings.endAnimatePos = { top: "-400px" };
                break;
        }

        // if settings sound not null
        if (settings.sound !== {} && window.HTMLAudioElement) {
            var audio = new Audio();
            audio.src = settings.sound.path;
            audio.autoplay = false;
            audio.volume = settings.sound.volume;
            audio.playbackRate = settings.sound.speed;
            audio.play();
        }

        $('.cbm_wrap').addClass('quaking');

        //start animation
        $('#' + gostID).animate(settings.endAnimatePos, settings.speed, 'swing', function () { //linear

            //remove object after animation
            $('#' + gostID).remove();

            $('.cbm_wrap').removeClass('quaking');
            //audio.pause();
            ym(23228761, 'reachGoal', 'ghost');
        });

        return this;
    };
})(jQuery);