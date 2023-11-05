 //서브 스크롤 반응
 function mt_scroll(){
  $(window).on('scroll',function(){
    var t_height = $(this).height();
    var sc_top = $(this).scrollTop();
      $('.sc_motion').each(function(){
          var mt_top = $(this).offset().top;
          if(sc_top > mt_top-t_height/1.2){
              $(this).addClass('on');
          }
      });
  }).scroll();
}
mt_scroll();