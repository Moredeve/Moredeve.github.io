(function($) {
  
  "use strict";
  
  /* Page Loader active
  ========================================================*/
  $('#preloader').fadeOut();

  /* Testimonials Carousel 
  ========================================================*/
  var owl = $("#client-testimonial");
    owl.owlCarousel({
      navigation: true,
      pagination: false,
      slideSpeed: 1000,
      stopOnHover: true,
      autoPlay: true,
      items: 1,
      animateIn: 'fadeIn',
      animateOut: 'fadeOut',
      addClassActive: true,
      itemsDesktop : [1199,1],
      itemsDesktopSmall : [980,1],
      itemsTablet: [768,1],
      itemsTablet: [767,1],
      itemsTabletSmall: [480,1],
      itemsMobile : [479,1],
    });   
    $('#client-testimonial').find('.owl-prev').html('<i class="lni-chevron-left"></i>');
    $('#client-testimonial').find('.owl-next').html('<i class="lni-chevron-right"></i>');


    /* showcase Slider
    =============================*/
     var owl = $(".showcase-slider");
      owl.owlCarousel({
        navigation: false,
        pagination: true,
        slideSpeed: 1000,
        margin:10,
        stopOnHover: true,
        autoPlay: true,
        items: 5,
        itemsDesktopSmall: [1024, 3],
        itemsTablet: [600, 1],
        itemsMobile: [479, 1]
      });



  /* 
   Sticky Nav
   ========================================================================== */
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 100) {
            $('.header-top-area').addClass('menu-bg');
        } else {
            $('.header-top-area').removeClass('menu-bg');
        }
    });

  /* 
 VIDEO POP-UP
 ========================================================================== */
  $('.video-popup').magnificPopup({
      disableOn: 700,
      type: 'iframe',
      mainClass: 'mfp-fade',
      removalDelay: 160,
      preloader: false,
      fixedContentPos: false,
  });

  /* 
   Back Top Link
   ========================================================================== */
    var offset = 200;
    var duration = 500;
    $(window).scroll(function() {
      if ($(this).scrollTop() > offset) {
        $('.back-to-top').fadeIn(400);
      } else {
        $('.back-to-top').fadeOut(400);
      }
    });

    $('.back-to-top').on('click',function(event) {
      event.preventDefault();
      $('html, body').animate({
        scrollTop: 0
      }, 600);
      return false;
    })

  /* 
   One Page Navigation
   ========================================================================== */


    $(window).on('load', function() {
       
        $('body').scrollspy({
            target: '.navbar-collapse',
            offset: 195
        });

        $(window).on('scroll', function() {
            if ($(window).scrollTop() > 100) {
                $('.fixed-top').addClass('menu-bg');
            } else {
                $('.fixed-top').removeClass('menu-bg');
            }
        });

    });

  /* Auto Close Responsive Navbar on Click
  ========================================================*/
  function close_toggle() {
      if ($(window).width() <= 768) {
          $('.navbar-collapse a').on('click', function () {
              $('.navbar-collapse').collapse('hide');
          });
      }
      else {
          $('.navbar .navbar-inverse a').off('click');
      }
  }
  close_toggle();
  $(window).resize(close_toggle);

  /* Nivo Lightbox
  ========================================================*/   
   $('.lightbox').nivoLightbox({
    effect: 'fadeScale',
    keyboardNav: true,
  });



}(jQuery));  


const round = (num, places) => {
  return +(parseFloat(num).toFixed(places));
}

$('#button').click(function(){
  var jrs_contratatados = $("#devs_jrs_contratatados").val();
  var carga_junior = $("#carga_junior").val();
  var salario_junior = $("#salario_junior").val();
  var qnt_dev_sr = $("#qnt_dev_sr").val();
  var carga_senior = $("#carga_senior").val();
  var salario_senior = $("#salario_senior").val();
  var carga_senior_total = $("#carga_senior_total").val();
 

  console.log(carga_senior)
  var senior_time_split = carga_senior.split(':')

  var min_onboarding = ((Number(senior_time_split[0]) * 60) + Number(senior_time_split[1])) / 5
  
  console.log(min_onboarding)

  carga_senior_total = carga_senior_total.split(':')
  carga_senior_total = ((Number(carga_senior_total[0]) * 60) + Number(carga_senior_total[1])) / 5

  console.log("c. senior: " + carga_senior_total)

  var custo_senior_min = (parseInt(salario_senior.split(' ')[1]) / 20) / carga_senior_total / 60
  
  var custo_final_senior = 9 * 20 * min_onboarding * custo_senior_min * qnt_dev_sr

  var custo_final_prod = salario_junior.split(' ')[1] * 0.7 * 8

  var custo_final_bad = (salario_junior.split(' ')[1] * 13 * 0.3) / 4

  console.log("Custo bad: " + custo_final_bad )
  console.log("Custo prod: " + custo_final_prod  )
  console.log("Custo senior: " + custo_final_senior  )


  var custo_ano = (custo_final_senior + custo_final_bad + custo_final_prod) / 4000

  console.log("custo total: " + custo_ano)

  $('#result').remove();
  $('.area').append("<p id='result'>" + round(custo_ano,2) + "</p>")

  

  

});