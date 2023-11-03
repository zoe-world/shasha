// JavaScript Document
/*
if (window.navigator.userAgent.match(/MSIE|Internet Explorer|Trident/i)) {
    // IE!!
    window.location = "microsoft-edge:" + window.location.href;
}
*/

//setting - global
var setting = {
  win : window,
  doc : document,
  body : document.getElementsByTagName('body'),
  html : document.getElementsByTagName('html'),
  ieV : document.documentMode,
  cssTransition : (function(style){
      var prefixes = ['t','WebkitT','MozT','MsT'];
      for(var i=0, l=prefixes.length; i < l; i++ ) {
          if( typeof style[prefixes[i] + 'ransition'] !== 'undefined')
              return true;
      }
      return false;
  })(document.createElement('div').style),
  mobile : (/Mobile|iPhone|iPod|Android/i).test(navigator.userAgent) // mobile check true, false
};

// 단말기 체킹
/*function*/
if(setting.mobile){
$(setting.html).removeClass('web').addClass('mobile');
          function getViewportWidth() {
              if (window.innerWidth) {
                  return window.innerWidth;
              }
              else if (document.body && document.body.offsetWidth) {
                  return document.body.offsetWidth;
              }
              else {
                  return $(window).width();
              }
          }
          var viewportWidth = $(window).width();
          if((/fireFox/i).test(navigator.userAgent)){
              viewportWidth = getViewportWidth();
          }
/*pad check*/
      try{
if(viewportWidth > 767 && viewportWidth != 0) {
  $(setting.html).removeClass('mobile').addClass('pad web');

  var padViewPort = $('meta[name=viewport').attr('content','width=1024px, user-scalable=yes, initial-scale=1.0, maximum-scale=3.0');

                  var viewPortTag=document.createElement('meta');
                  viewPortTag.id="viewportMobile";
                  viewPortTag.name = "viewport";
                  viewPortTag.content = "width=1024px; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;";
                  document.getElementsByTagName('head')[0].appendChild(viewPortTag);

  var ww = Math.min(viewportWidth,window.screen.width); //get proper width
  var ratio =  ww / 768; //calculate ratio ( 768 is min width of site)
  if( ratio < 1 ) { //smaller than minimum size
    $(viewPortTag).attr('content', 'initial-scale=' + ratio + ', maximum-scale=' + ratio + ', minimum-scale=' + ratio + ', user-scalable=yes, width=' + ww);
  } else { //regular size
    $(viewPortTag).attr('content', 'initial-scale=' + ww/1024+ ', maximum-scale=1, minimum-scale=0.5, user-scalable=yes, width=' + ww);
  }
    setting.mobile = false;
    setting.pad = true;
}
      }
      catch(e){
          //alert(e)
      }
};
/**********************************************/
// Common
/**********************************************/
var agt = navigator.userAgent,
    isMobile = (/(Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|windows phone)/.test(agt)),
    win_w = mediaWidth();

// media width
function mediaWidth() {
  var e = window,
    a = 'inner';
  if (!('innerWidth' in window)) {
    a = 'client';
    e = document.documentElement || document.body;
  }
  return e[a + 'Width'];
}

$(function () {
  //스킵 네비
  $("#skip_nav > a:last-child").on("keydown", function (key) {
    setTimeout(function () {
      if (key.keyCode == 13) {
        $("#gnb a").focus();
      }
    }, 10);
  });

  //header 
  $("#header .gnb_list > li").on("focusin", function () {
    $(".menu-link").removeClass("show");
    $(".depth").removeClass("show");
    $(this).find(".menu-link").addClass("show");
    $(this).find(".depth").addClass("show");
    $("#header").addClass("show hover");
  });
  $("#header .gnb_list > li li:last-child a:last-child").on("focusout", function () {
    $(this).find(".menu-link").removeClass("show");
    $(this).find(".depth").removeClass("show");
    $("#header").removeClass("show hover");
  });

  (win_w <= 1299) ? $("body").addClass("mobile-wrap"): $("body").removeClass("mobile-wrap");
  $(window).resize(function () {
    win_w = mediaWidth();
    (win_w <= 1299) ? $("body").addClass("mobile-wrap"): $("body").removeClass("mobile-wrap"), $("#header").removeClass("show hover");
  });

  //gnb 
  $("#header").hover(function () {
      $("#header").addClass("hover");
    }, function () {
      $("#header").removeClass("hover");
    }),
    $(".gnb_list").hover(function () {
      $("#header").addClass("show");
    }, function () {
      $("#header").removeClass("show");
    }),
    $("#header .gnb_list > li").hover(function () {
      $(this).find(".menu-link").addClass("show");
      $(this).find(".depth").addClass("show");
    }, function () {
      $(".depth").removeClass("show");
      $(".menu-link").removeClass("show");
    })



  //gnb 모바일
  $('#btn-bar').bind('click', function () {

    if ($('.gnb_mobile').hasClass('active') == false) {
      $('.gnb_mobile').addClass('active');
      $('.overlay').addClass('active');
      $('body').addClass('active');
      $('#header').addClass('show')
    } else {
      $('.gnb_mobile').removeClass('active');
      $('.overlay').removeClass('active');
      $('body').removeClass('active');
      $('#header').removeClass('show');
    }
  });
  $('.all-menu-close').bind('click', function () {
    $('.gnb_mobile').removeClass('active');
    $('.overlay').removeClass('active');
    $('body').removeClass('active');
    $('#header').removeClass('show');
  });

  $("body").on("click", ".overlay,#all-menu-close", function () {
    $('.gnb_mobile').removeClass('active');
    $('.overlay').removeClass('active');
    $('body').removeClass('active');
    $('#header').removeClass('show');
  });

  $('.depth2_ul > li:not(:has(.depth3_ul))').addClass('no_depth');
  $('.depth1_ul > li:not(:has(.depth2_ul))').addClass('no_depth');
  $('.depth1_ul > li.active').children('.depth2_ul').stop().slideDown(200);
  $('.depth2_ul > li.active').children('.depth3_ul').stop().slideDown(200);

  $('.depth1_ul > li > a').bind('click', function () {

    if ($(this).parent('li').hasClass('no_depth') == false) {
      if ($(this).parent().hasClass('active') == false) {
        $('.depth2_ul').stop().slideUp(200);
        $(this).next('.depth2_ul').stop().slideDown(200);

        $('.depth1_ul > li.active').removeClass('active');
        $(this).parent().addClass('active');
      } else {
        $('.depth2_ul').stop().slideUp(200);
        $('.depth1_ul > li.active').removeClass('active');
      }

    } else {
      window.location = $(this).attr('href');
    }

  });

  $('.link_ul > li > a').bind('click', function () {

    if ($(this).parent('li').hasClass('no_depth') == false) {
      if ($(this).parent().hasClass('active') == false) {
        $('.depth2_ul').stop().slideUp(200);
        $(this).next('.depth2_ul').stop().slideDown(200);

        $('.link_ul > li.active').removeClass('active');
        $(this).parent().addClass('active');
      } else {
        $('.depth2_ul').stop().slideUp(200);
        $('.link_ul > li.active').removeClass('active');
      }

    } else {
      window.location = $(this).attr('href');
    }

  });

  $('.depth2_ul > li > a').bind('click', function () {

    if ($(this).parent().hasClass('active') == false) {
      $('.depth3_ul').stop().slideUp(200);
      $(this).next('.depth3_ul').stop().slideDown(200);

      $('.depth2_ul > li.active').removeClass('active');
      $(this).parent().addClass('active');
    } else {
      $('.depth3_ul').stop().slideUp(200);
      $('.depth2_ul > li.active').removeClass('active');
    }

  });

  $(window).resize(function () {
    $('.gnb_mobile').removeClass('active');
    $('.overlay').removeClass('active');
    $('body').removeClass('active');
  })

})

//lnb 메뉴 열기 
function lnb(){
  /* lnb */
$('.lnb_01 li:not(:has(.lnb_02))').addClass('no_depth');
$('.lnb_01 li.active:not(:has(.lnb_02)').addClass('current');

$('.lnb_01 li a').bind('click',function(_e){

if($(this).parent('li').hasClass('no_depth') == false){
  if($(this).parent().hasClass('current') == false){
    
    $('.lnb_02').stop().slideUp(200);
    $(this).next('.lnb_02').stop().slideDown(200);

    $('.lnb_01 li.current').removeClass('current');
    $(this).parent().addClass('current');
    
    }else{
    $('.lnb_02').stop().slideUp(200);
    $('.lnb_01 li.current').removeClass('current');
    
    }
    
} else {
  var url=$(this).attr('href')

  if($(this).is('[target]') == false){
  window.location=url;
  }else{
  window.open(url, '_blank');
  }
}
_e.stopPropagation();	 
});

$('html').click(function(e) { 
if($(e.target).parents('.lnb_01').length < 1){
  $('li:not(:has(.active)) .lnb_02').parent().removeClass("current");
  $('li:not(:has(.active)) .lnb_02').stop().slideUp();
} 
});	

}

//breadcrumb
var breadcrumb = {
breadEvent: function(){
 pc=0, mo=0;
 var num = $(".location-list .subdepth ul li").length;
 if(num <=1) {
  $(".location-list .subdepth ul li.curr").addClass('no');
}
  function breadcrumb(){	      
    if(mo==1) return false;
      var $subdepth =$(".location-list .subdepth ul");	
      var count = $subdepth.find("li").length;     
        $subdepth.removeClass("open");
          $(".location-list .subdepth a").on("click", function(e){			
            if($(this).parent("li").hasClass("curr")){
              e.preventDefault();
              if(count>=2){
                $subdepth.toggleClass("open");
              }
            }else{
              if( $subdepth.hasClass("open")){
                $subdepth.removeClass("open");
              }
            }	
          });

        $('html').click(function(e) { 
          if($(e.target).parents('.subdepth').length < 1){
            $subdepth.removeClass("open");
          } 
        });	
        mo++, pc=0;
  }
  function pcbreadcrumb(){	
    var $subdepth =$(".location-list .subdepth ul.open");	
    $subdepth.removeClass("open");
    $(".location-list .subdepth a").on("click", function(e){
      document.querySelector(".location-list .subdepth a").removeAttribute('href');
    });
    if(pc==1) return false;      
      pc++, mo=0;
  }
    // default
  if($(window).width() > 767 ) pcbreadcrumb();
  else breadcrumb();

  // resize
  $(window).on('resize', function(){
    var timer = null;
    clearTimeout(timer);
    timer = setTimeout(function(){
      if($(window).width() > 767) pcbreadcrumb();
      else breadcrumb();
    }, 500);
  });
}
}
$(function(){
breadcrumb.breadEvent();
})
// tab

function tabComponent() {    
  //탭이 없을 떄
  if ($('.tab-category [role=tablist]').length < 1) {
      return;
  }
  
  $('.tab-category [role=tablist]').each(function () {
      var defaultTabPanel = "#" + $(this).find('*[aria-selected=true]').attr('aria-controls');
      var defaultTabBox = $(this).find('*[aria-selected=true]').closest('li');
      $(defaultTabPanel).show();
      $(defaultTabBox).addClass('active');
  })
  
  //click code
  $('.tab-category [role=tab]').on('click', function () {
      var tabListElement = $(this).closest('ul[role=tablist]');
      var tabPanelElement = '#' + $(this).attr('aria-controls');
      
      //탭이 링크이동일 경우
      if (tabListElement.attr('data-js') == 'false') {
          return;
      }
      
      var thisElement = $(this).closest('li');
      
      $(this).attr('aria-selected', true);
      thisElement.siblings('li').find('*[role=tab]').removeAttr('aria-selected');
      thisElement.siblings('li').removeClass('active');
      thisElement.addClass('active');
      
      $(tabPanelElement).show();
      thisElement.siblings('li').find('*[role=tabpanel]').hide();
      return false;
      
  });
}

if (!Element.prototype.closest) {
Element.prototype.closest = function(s) {
  var el = this;

  do {
    if (Element.prototype.matches.call(el, s)) return el;
    el = el.parentElement || el.parentNode;
  } while (el !== null && el.nodeType === 1);
  return null;
};
}
if (! Object.getOwnPropertyDescriptor(NodeList.prototype, 'forEach')) {
  Object.defineProperty(NodeList.prototype, 'forEach', Object.getOwnPropertyDescriptor(Array.prototype, 'forEach'));
}


function tabComponent2() {
var tabGroups = document.querySelectorAll('[data-role="tab"]');    
var agent = navigator.userAgent.toLowerCase(); 
  if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) || (agent.indexOf("firefox") != -1) ) {
  //click code
  $('[data-role="tab"] [role=tab]').on('click', function (e) {
      var tabListElement = $(this).closest('ul[role=tablist]');
      var tabPanel = tabListElement.closest('[data-role="tab"]').find('[role="tabpanel"]');
      var tabPanelElement = '#' + $(this).attr('aria-controls');  
      var thisElement = $(this).closest('li');        
      $(this).attr('aria-selected', true);
      thisElement.siblings('li').find('*[role=tab]').removeAttr('aria-selected');
      thisElement.siblings('li').removeClass('active');
      thisElement.addClass('active');
      e.preventDefault();
      tabPanel.hide();
      $(tabPanelElement).show();
     // thisElement.siblings('li').find('*[role=tabpanel]').hide();
      return false;
      
  });
      
      
      
      
  }
  else{   
  
if (tabGroups) {
  var currentTarget, targetTabWrap, targetTabListWrap, targetPanelWrap;
  var init = function init(e) {
    currentTarget = e.target.tagName;
    currentTarget === 'BUTTON' || 'A' ? currentTarget = e.target : currentTarget = e.target.closest('button') || e.target.closest('a');
    targetTabWrap = currentTarget.closest('[data-role="tab"]');
    targetTabListWrap = targetTabWrap.querySelector('[role="tablist"]');
    targetPanelWrap = targetTabWrap.querySelector('.tab_contents_w');
  };
  var tabClickEvt = function tabClickEvt(e) {
    init(e);
    if (currentTarget.ariaSelected === 'false') {
      tabRemoveEvt(targetTabListWrap, targetPanelWrap);
      tabAddEvt(currentTarget, targetTabWrap);
    };
  };
  var tabKeyUpEvt = function tabKeyUpEvt(e) {
    init(e);
    var targetBtnWrap = currentTarget.parentElement;

    if (e.key == 'ArrowRight') {
      if (targetBtnWrap.nextElementSibling) {
        targetBtnWrap.nextElementSibling.children[0].focus();
        tabRemoveEvt(targetTabListWrap, targetPanelWrap);
        tabAddEvt(targetBtnWrap.nextElementSibling.children[0], targetTabWrap);
      } else homeKeyEvt(targetTabListWrap, targetTabWrap, targetPanelWrap);
    } else if (e.key == 'ArrowLeft') {
      if (targetBtnWrap.previousElementSibling) {
        targetBtnWrap.previousElementSibling.children[0].focus();
        tabRemoveEvt(targetTabListWrap, targetPanelWrap);
        tabAddEvt(targetBtnWrap.previousElementSibling.children[0], targetTabWrap);
      } else endKeyEvt(targetTabListWrap, targetTabWrap, targetPanelWrap);
    } else if (e.key == 'End') endKeyEvt(targetTabListWrap, targetTabWrap, targetPanelWrap);else if (e.key == 'Home') homeKeyEvt(targetTabListWrap, targetTabWrap, targetPanelWrap);
  };
  var tabAddEvt = function tabAddEvt(currentTarget, targetPanelWrap) {
    currentTarget.setAttribute('aria-selected', 'true');
    currentTarget.removeAttribute('tabindex');
    currentTarget.parentElement.classList.add('active');
    targetPanelWrap.querySelector("[aria-labelledby=\"".concat(currentTarget.id, "\"]")).removeAttribute('hidden');
    targetPanelWrap.querySelector("[aria-labelledby=\"".concat(currentTarget.id, "\"]")).setAttribute('tabindex', '0');
  };

  var tabRemoveEvt = function tabRemoveEvt(tabListWrap, tabPanelWrap) {
    targetTabListWrap.querySelectorAll('li').forEach(function (tabBtnWrap) {
      if (tabBtnWrap.classList.contains('active')) {
        tabBtnWrap.classList.remove('active');
        tabBtnWrap.querySelector('[role="tab"]').setAttribute('aria-selected', 'false');
        tabBtnWrap.querySelector('[role="tab"]').setAttribute('tabindex', '-1');
      };
    });

    for (var _i2 = 0, _targetPanelWrap$chil2 = targetPanelWrap.children; _i2 < _targetPanelWrap$chil2.length; _i2++) {
      var tabPanel = _targetPanelWrap$chil2[_i2];
      tabPanel.setAttribute('hidden', '');
      tabPanel.setAttribute('tabindex', '-1');
    };
  };

  var homeKeyEvt = function homeKeyEvt(targetTabListWrap, targetTabWrap, targetPanelWrap) {
    targetTabListWrap.children[0].children[0].focus();
    tabRemoveEvt(targetTabListWrap, targetPanelWrap);
    tabAddEvt(targetTabListWrap.children[0].children[0], targetTabWrap);
  };

  var endKeyEvt = function endKeyEvt(targetTabListWrap, targetTabWrap, targetPanelWrap) {
    var targetTabLists = targetTabListWrap.querySelectorAll('li');
    targetTabLists[targetTabLists.length - 1].children[0].focus();
    tabRemoveEvt(targetTabListWrap, targetPanelWrap);
    tabAddEvt(targetTabLists[targetTabLists.length - 1].children[0], targetTabWrap);
  };

  tabGroups.forEach(function (tabWrapper) {
    var tabBtns = tabWrapper.querySelectorAll('[role="tab"]');
    tabBtns.forEach(function (tabBtn) {
      tabBtn.removeEventListener('click', tabClickEvt);
      tabBtn.addEventListener('click', tabClickEvt);
      tabBtn.removeEventListener('keyup', tabKeyUpEvt);
      tabBtn.addEventListener('keyup', tabKeyUpEvt);
    });
  });
};
}       
};

//컨텐트 셋팅
function contentSet(){	
var dep1Class = $('.gnb_list > li >a.show').parent().attr('class');
  $('.content_body').addClass(dep1Class + '_wrap');	
}

$(function () {
lnb();    
tabComponent();
tabComponent2();
contentSet();
});

// 팝업
$(function () {
function compLayer() {

    if ($('*[role=dialog]').length < 1) {
        return;
    }

    $(document).on('click', '[aria-haspopup=true]', function () {

        var popup = '#' + $(this).attr('aria-controls');
        var thisBtn = $(this);
        var dimHtml = '<span class="dim"></span>';
        var popupLayer = $(this).closest('[role=dialog]');
        var popupId = popupLayer.attr('id');

        if ($(popup).hasClass('dimlayer') && $('body').length < 1) {
            $('body').prepend(dimHtml);
            $('body').css('overflow-y', 'hidden');
        }

        if ($('[role=dialog]').length > 1) {
            $(popup).siblings('[role=dialog]').hide(0, function () {
                popupLayer.attr('aria-hidden', true);
                $('[aria-controls=' + popupId + ']').attr('aria-expanded', false);
            });
        }

        $(popup).show(0, function () {
            thisBtn.attr({
                'aria-expanded': true
            });
            $(this).css('display','flex')
            $(this).attr('aria-hidden', false);
            $('.close').focus();
            $('body').css('overflow-y', 'hidden');
        });

    });

    $(document).on('click', '.close', function () {
        var popupLayer = $(this).closest('[role=dialog]');
        var popupId = popupLayer.attr('id');

        if (popupLayer.hasClass('dimlayer')) {
            $('body > .dim').remove();
            $('body').css('overflow-y', 'auto');
        }

        $(popupLayer).hide(0, function () {
            popupLayer.attr('aria-hidden', true);
            $('[aria-controls=' + popupId + ']').attr('aria-expanded', false).focus();
        });
    })

}
compLayer();
});


//파일명 가져오기
$(document).on('change', '.att_bx .file_hidden', function() {
if (window.FileReader) {
    var filename = $(this)[0].files[0].name;
} else {
    var filename = $(this).val().split('/').pop().split('\\').pop();
};

$(this).siblings('.upload_name').val(filename);
});


// 체크박스 체크하기
$(function() {
$(".check_all").click(function() {
    if ($(".check_all").prop("checked")) {
        $("input[name=check]").prop("checked", true);
    } else {
        $("input[name=check]").prop("checked", false);
    }
});
});

// 아코디언
$(function () {
$(".faq-title").off('click');
$(".faq-title").on("click", function (e) {
    var title = $(this).closest('.faq-list');

    e.preventDefault();
    if ($(title).hasClass('active')) {
        $(title).find('.faq-content').attr('aria-hidden', 'true').stop().slideUp(300),
            $(this).attr('aria-expanded', 'false'),
            $(title).removeClass('active')

    } else {
        $('.faq-list').not(title).removeClass('active');
        $('.faq-content').stop().slideUp(300);
        $(title).find('.faq-content').attr('aria-hidden', 'false').stop().slideDown(300),
            $(this).attr('aria-expanded', 'true'),
            $(title).addClass('active')
    }
});



// 스크롤 헤더
$(window).scroll(function(){
  var t = $(this).scrollTop();
  floating(t); // 플로팅 기능
});
$(window).on('load', function(){
  //var is_home = ($('body').hasClass('home')) ? true : false;
  var t = $(this).scrollTop();
  floating(t);
  setTimeout(function(){
  //	start_animate();a
  }, 130);
});

function floating(t){
  (t > 30) ? $("#header").addClass("floating") : $("#header").removeClass("floating");
  return;
}

})
$(function(){

$(function(){
  $('.ly_view').css('opacity', '1');
  $('.img-plus').on('click', function(){
      let targetViewer = $(this).attr('href');
      $(targetViewer).addClass('active');
      $('.ly_view').css('opacity', '1');
      $('body, html').css('overflow-y','hidden');

          setTimeout(function() {
          $('.ly_view').animate({
              opacity:0
          },500)
          return false;
          }, 3000);

      return false;

  });

  $('.viewer-close').on('click', function(){
      $(this).closest('.viewer').removeClass('active');
      $('.ly_view').css('opacity', '1');
      $('body, html').css('overflow-y','auto');

      return false;
  })
  $('.ly_cls').on('click', function(){
      $('.ly_view').animate({
              opacity:0
          },500)
  })
  
})

})

// popup open
function popOpen(id){
var $this = $("#" + id);
$this.fadeIn(200, function(){
  $this.css({
    'display':'flex',
    'opacity':'1'
  })
});
$.lockBody();
};

// popup close
function popClose(obj){
// var $this = $("#" + id);
$(obj).parents(".modal-layer").fadeOut(200, function(){
  $(obj).css({
    'display':'',
    'opacity':''
  });
});
$.unlockBody();
}

// prevent body scroll
var $docEl = $('html, body'),
$wrap = $('#wrap'),
$scrollTop;

$.lockBody = function() {
if(window.pageYOffset) {
  $scrollTop = window.pageYOffset;
  $wrap.css({
    top: - ($scrollTop)
  });
}
$docEl.css({
  height: "100%",
  overflow: "hidden"
});
}

$.unlockBody = function() {
$docEl.css({
  height: "",
  overflow: ""
});
$wrap.css({
  top: ''
});
window.scrollTo(0, $scrollTop);
window.setTimeout(function () {
  $scrollTop = null;
}, 0);
}
