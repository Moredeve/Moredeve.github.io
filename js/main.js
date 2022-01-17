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

function calc(){
  var salario_junior = $("#salario_junior").val();
  console.log(salario_junior)
  var qnt_dev_sr = $("#qnt_dev_sr").val();
  console.log(qnt_dev_sr)
  var qnt_dev_jr = $("#qnt_dev_jr").val();
  console.log(qnt_dev_jr)
  var carga_senior = $("#carga_senior").val();
  console.log(carga_senior)
  var salario_senior = $("#salario_senior").val();
  console.log(salario_senior)
  var carga_senior_total = $("#carga_senior_total").val();
  console.log(carga_senior_total)
 
    var senior_time_split = carga_senior.split(':');
    carga_senior_total = carga_senior_total.split(':');

    console.log("1: " + parseInt(senior_time_split[1]))
    console.log("2: " + parseInt(carga_senior_total[1]))

    if(! ((parseInt(senior_time_split[1]) >= 60)|| (parseInt(carga_senior_total[1])>= 60))){

      var min_onboarding = ((Number(senior_time_split[0]) * 60) + Number(senior_time_split[1])) / 300
      carga_senior_total = ((Number(carga_senior_total[0]) * 60) + Number(carga_senior_total[1])) / 300
  
      var custo_senior_min = (parseInt(salario_senior.split(' ')[1])) / (20 * carga_senior_total * 60)
      var custo_final_senior = 9 * 20 * (min_onboarding*60) * custo_senior_min * parseInt(qnt_dev_sr)
      var custo_final_prod = salario_junior.split(' ')[1] * 0.7 * 8 * parseInt(qnt_dev_jr);
      var custo_final_bad = (salario_junior.split(' ')[1] * 13 * 0.3) / 4
      var custo_ano = (custo_final_senior + custo_final_bad + custo_final_prod) / 4000
  
      console.log("custo total: " + custo_ano)
  
      if(min_onboarding >= carga_senior_total) {
        $('#result').remove();
        var arr = "<p id='result' style='text-size: 5 vw;'> <strong>Oops, a carga horária total do sênior não pode ser inferior ou igual ao tempo dedicado ao onboarding</strong></p>";
      }

      else if(isNaN(custo_ano)) {
        $('#result').remove();
        var arr = "<p id='result' style='text-size: 5 vw;'> <strong>Oops, tem certeza que está preenchendo certo suas informações? 😅</strong></p>";
      }
  
      else if(custo_ano >= 10000) {
        $('#result').remove();
        var arr = "<p id='result' style='text-size: 5 vw;'> <strong>Oops, tem certeza que está preenchendo certo suas informações? 😅</strong></p>";
      }
      else{
        $('#result').remove();
        var arr = "<div  id='result'><h1> <strong>" + round(custo_ano,2) + " X ao ano</strong></h1>";
        arr += "<br><p>Valores considerados para estimativa têm como base o estudo de caso <i>The True Cost of a Bad Hire</i> e consiste em três pilares:</i> </p>"
        arr += "<br><center><ul class='list-group col-md-3'><li class='list-group-item'>Custo do Processo de Onboarding Tradicional<br>R$ "
        arr +=  custo_final_senior +"</li><li class='list-group-item'>Ganho de Performance com um Processo de Onboarding bem sucedido<br>R$ "
        arr += custo_final_prod +"</li><li class='list-group-item'>Custos do Processo de uma má Contratação<br>R$ "
        arr += custo_final_bad +"</li></ul></center>"
        arr += "<br><br><h3 id='result'> <strong> Quer saber mais?<br><br></strong></h3>";
        arr += "<a class='btn btn-rounded input' style='background-color: #5533ff;' href='https://wa.me/5548984654553?text=Olá, estou muito interessado no produto da MoreDeve!'>ENTRE EM CONTATO!</a></div>"
      }
  
      $('.area').append(arr)
    }
    else{
      $('#result').remove();
      var arr = "<p id='result' style='text-size: 5 vw;'> <strong>Oops, não utrapasse de 59 min ⏱⏱⏱ <br>Padrão: Hora:Minuto</strong></p>";
      $('.area').append(arr)
    }
  

};

$(".input").on('input', function(){
  calc();
})

$( document ).ready(function(){
  calc();
})

$(".input").on('click', function(){
  calc();
})