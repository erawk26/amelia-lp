if ($(".video video").length > 0) {
  var playPromise = $("video")[0].play();
  // In browsers that don’t yet support this functionality,
  // playPromise won’t be defined.
  if (playPromise !== undefined) {
    playPromise
      .then(function(res) {
        playVids(true);
      })
      .catch(function(error) {
        playVids(false);
      });
  }
}
function playVids(x) {
  $(".video video").each(function() {
    if (x) {
      $(this).attr("playsinline", "true");
      $(this).attr("muted", "true");
    } else {
      var $videoPoster = $(this).attr("poster"),
        $videoImg = $("<img />", {
          class: ".background-video",
          src: $videoPoster
        });
      $(this).remove(); //.replaceWith($videoImg);
    }
  });
}
// Contact form label slide
$("input,select,textarea")
  .focus(function() {
    var ele = $(this)
      .closest(".field")
      .children("label");
    // console.log("exit", ele);
    ele.addClass("slide-up");
  })
  .blur(function() {
    var ele = $(this)
      .closest(".field")
      .children("label");
    // console.log("exit", ele);
    if ($(this).val() === "") {
      ele.removeClass("slide-up");
    }
  });
$("select").each(function() {
  $(this)
    .closest(".field")
    .children("label")
    .hide();
});

// define images
function preloadImage(url) {
  var img = new Image();
  img.src = url;
}
function buildImgArray() {
  var imgArr = []; //sequenceImages.split(";");

  for (var i = 0; i < imgArr.length; i++) {
    preloadImage(imgArr[i]);
  }

  return imgArr;
}

////FORT ANIMATION
var images = buildImgArray();

// console.log(images);
var obj = { curImg: 0 };
var tween = TweenMax.to(obj, 3, {
  curImg: images.length - 1, // animate propery curImg to number of images
  roundProps: "curImg", // only integers so it can be used as an array index
  repeat: 0, // repeat 3 times
  immediateRender: true, // load first image automatically
  ease: Linear.easeNone, // show every image the same ammount of time
  onUpdate: function() {
    $("#ameliaFort").attr("src", images[obj.curImg]); // set the image source
  }
});

// init controller
var controller = new ScrollMagic.Controller();
// build scene
var scene = new ScrollMagic.Scene({
  triggerElement: ".fort-sequence .guide",
  duration: "85%",
  triggerHook: 0.85
})
  .setTween(tween)
  .addTo(controller);

///// smooth scroll /////
$('a[href*="#"]:not([href="#"])').click(function() {
  if (
    location.pathname.replace(/^\//, "") === this.pathname.replace(/^\//, "") &&
    location.hostname === this.hostname
  ) {
    var target = $(this.hash);
    target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
    if (target.length) {
      $("html, body").animate(
        {
          scrollTop: target.offset().top
        },
        1000
      );
      return false;
    }
  }
});
/////fix MAILCHIMP FORM////////
(function($) {
  var $submit = $('input[type="submit"]');
  var parentDiv = "#mmg-amelia-app-lp";

  $(".horizontal-group").each(function(i) {
    var isCheckbox = $(this).find(".checkbox").length > 0;
    var $field = $(this).children(".field");
    $(this)
      .find(".field")
      .each(function() {
        if ($(this).find("input,select,textarea").length === 0) {
          $(this).remove();
        }
      });
    if (i === 0) {
      $field
        .addClass("guide-cbox")
        .children("p")
        .remove();
      $field.find('input[type="checkbox"]').attr("checked", true);
    }
    if (i !== 0 && isCheckbox) {
      $(this)
        .find(".checkbox")
        .unwrap();
      $(this)
        .prev("h2")
        .prependTo($field);
      $field.addClass("list-cbox");
    }
    $(this)
      .children(".field")
      .unwrap();
  });
  var $lastField = $(".field:last");
  var instructions = $lastField.text();
  $lastField.html($submit).addClass("submit-wrapper");
  $(
    '<span class="error-wrapper"><div class="form-error" style="display: none;"></div></span>'
  ).appendTo($(".form-grid .form"));
  $(
    '<p class="instructions center-text color gray">' + instructions + "</p>"
  ).appendTo($(".form-grid"));

  var noIE = navigator.userAgent.indexOf("Trident") === -1;
  if (!noIE) {
    $(parentDiv).addClass("grid-disabled");
  }
})(jQuery);
