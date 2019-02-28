// Contact form label slide
$("input,select,textarea")
    .focus(function () {
        var ele = $(this)
            .closest(".field")
            .children("label");
        // console.log("exit", ele);
        ele.addClass("slide-up");
    })
    .blur(function () {
        var ele = $(this)
            .closest(".field")
            .children("label");
        // console.log("exit", ele);
        if ($(this).val() == "") {
            ele.removeClass("slide-up");
        }
    });
$("select").each(function () {
    $(this)
        .closest(".field")
        .children("label")
        .hide();
});

// define images
var images = [
    '../img/sequences/fort/FortClinch0001.png',
    '../img/sequences/fort/FortClinch0002.png',
    '../img/sequences/fort/FortClinch0003.png',
    '../img/sequences/fort/FortClinch0004.png',
    '../img/sequences/fort/FortClinch0005.png',
    '../img/sequences/fort/FortClinch0006.png',
    '../img/sequences/fort/FortClinch0007.png',
    '../img/sequences/fort/FortClinch0008.png',
    '../img/sequences/fort/FortClinch0009.png',
    '../img/sequences/fort/FortClinch0010.png',
    '../img/sequences/fort/FortClinch0011.png',
    '../img/sequences/fort/FortClinch0012.png',
    '../img/sequences/fort/FortClinch0013.png',
    '../img/sequences/fort/FortClinch0014.png',
    '../img/sequences/fort/FortClinch0015.png'
];

// TweenMax can tween any property of any object. We use this object to cycle through the array
var obj = { curImg: 0 };
var tween = TweenMax.to(obj, 0.5, {
    curImg: images.length - 1, // animate propery curImg to number of images
    roundProps: "curImg", // only integers so it can be used as an array index
    repeat: 0, // repeat 3 times
    immediateRender: true, // load first image automatically
    ease: Linear.easeNone, // show every image the same ammount of time
    onUpdate: function () {
        $("#myimg").attr("src", images[obj.curImg]); // set the image source
    }
});

// init controller
var controller = new ScrollMagic.Controller();

// build scene
var scene = new ScrollMagic.Scene({
    triggerElement: "#trigger",
    duration: 600,
    offset: -300
})
    .setTween(tween)
    .addIndicators("trigger") // add indicators (requires plugin)
    .addTo(controller);



    ///// smooth scroll /////
    $('a[href*="#"]:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });

    //fix MAILCHIMP FORM
    (function ($) {
    var $submit = $('input[type="submit"]');
    $('.horizontal-group').each(function (i) {
        var checkboxDiv = $(this).find('.checkbox').length > 0;
        console.log(checkboxDiv);
        if (i != 0 && !checkboxDiv) {
            $(this).children('.field').unwrap();
        }
    });
    var $lastField = $('.field:last');
    var instructions = $lastField.text();
    $lastField.html($submit).addClass('submit-wrapper');
    $('<p class="instructions center-text color gray">' + instructions + '</p>').appendTo($('.form-grid'));
    })(jQuery);
