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

function buildImgArray(folder, fileName, n, x) {
    x=x||1;
    Number.prototype.pad = function (size) {//pad preceeding zero's to the numbers
        var sign = Math.sign(this) === -1 ? '-' : '';
        return sign + new Array(size).concat([Math.abs(this)]).join('0').slice(-size);
    }
    var arr=[];
    for(i=0;i<n;i++){
        if(i%x<0.5){//using this to lessen the picture count if needed.
        arr.push('./img/sequences/' + folder + '/' + fileName+ i.pad(2) +'.png');
        }
    }
    return arr;
}

////FORT ANIMATION
var images = buildImgArray('fort-small', 'FortClinch00', 50, 2);
console.log(images);
var obj = { curImg: 0 };
var tween = TweenMax.to(obj, 0.75, {
    curImg: images.length - 1, // animate propery curImg to number of images
    roundProps: "curImg", // only integers so it can be used as an array index
    repeat: 0, // repeat 3 times
    immediateRender: true, // load first image automatically
    ease: Linear.easeNone, // show every image the same ammount of time
    onUpdate: function () {
        $("#ameliaFort").attr("src", images[obj.curImg]); // set the image source
    }
});

// init controller
var controller = new ScrollMagic.Controller();
// build scene
var scene = new ScrollMagic.Scene({
    triggerElement: ".fort-sequence .guide",
    duration: '85%',
    triggerHook: .85
})
    .setTween(tween)
    // .addIndicators("FORT trigger") // add indicators (requires plugin)
    .addTo(controller);


//// TURTLE ANIMATION
var turtle_images = buildImgArray('turtle', 'Turtle00', 16);
// console.log(images,gull_images,turtle_images);
var turtle_obj = { curImg: 0 };
//// GULL ANIMATION
var gull_images = buildImgArray('gulls', 'Gulls00', 50,2);
// console.log(images,gull_images,gull_images);
var gull_obj = { curImg: 0 };
var hero_tween = new TimelineMax();
hero_tween
  .to(
    turtle_obj,
    2.5,
    {
      curImg: turtle_images.length - 1, // animate propery curImg to number of images
      roundProps: "curImg", // only integers so it can be used as an array index
      repeat: -1, // repeat
      immediateRender: true, // load first image automatically
      ease: Linear.easeNone, // show every image the same ammount of time
      onUpdate: function() {
        $("#ameliaTurtle").attr("src", turtle_images[turtle_obj.curImg]); // set the image source
      }
    },
    0
  )
  .to(
    gull_obj,
    1.5,
    {
      curImg: gull_images.length - 1, // animate propery curImg to number of images
      roundProps: "curImg", // only integers so it can be used as an array index
      repeat: -1, // repeat
      immediateRender: true, // load first image automatically
      ease: Linear.easeNone, // show every image the same ammount of time
      onUpdate: function() {
        $("#ameliaGull").attr("src", gull_images[gull_obj.curImg]); // set the image source
      }
    },
    0
  );

// init controller
var hero_controller = new ScrollMagic.Controller();
// build scene
var hero_scene = new ScrollMagic.Scene({
    triggerElement: ".hero",
    duration: 0,
})
    .setTween(hero_tween)
    // .addIndicators("hero_trigger") // add indicators (requires plugin)
    .addTo(hero_controller);



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
/////fix MAILCHIMP FORM////////
(function ($) {
    var $submit = $('input[type="submit"]');
    $('.horizontal-group').each(function (i) {
        var checkboxDiv = $(this).find('.checkbox').length > 0;
        $(this).find('.field').each(function () {
            if ($(this).find('input,select,textarea').length == 0) {
                $(this).remove();
            }
        });
        if (i == 0) { $(this).children('.field').addClass('guide-cbox').children('p').remove();}
        if (i == 0 || !checkboxDiv) {
            $(this).children('.field').unwrap();
        }
    });
    var $lastField = $('.field:last');
    var instructions = $lastField.text();
    $lastField.html($submit).addClass('submit-wrapper');
    $('<span class="error-wrapper"><div class="form-error" style="display: none;"></div></span>').appendTo($('.form-grid .form'))
    $('<p class="instructions center-text color gray">' + instructions + '</p>').appendTo($('.form-grid'));
})(jQuery);
