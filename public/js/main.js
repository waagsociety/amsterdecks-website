$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});

function removeLoader(){
  $('body').removeClass('loading');
  $('.loader').remove();
};

setTimeout(removeLoader, 5000);

var s = skrollr.init({forceHeight: false});

function navigation(){
  var mainMenu = document.getElementById('mainMenu'),
      subMenu = document.getElementById('subMenu'),
      subMenuHeight = subMenu.offsetHeight,
      mainMenuHeight = mainMenu.offsetHeight;
  
  $('body').bind('DOMMouseScroll', function(e){
     if(e.originalEvent.detail > 0) {
         //scroll down
         console.log('Down');
     }else {
         //scroll up
         console.log('Up');
     }
  });

  //IE, Opera, Safari
  $('body').bind('mousewheel', function(e){
     if(e.originalEvent.wheelDelta < 0) {
        document.getElementById('menuContainer').style.transform = "translateY(-100%)"; 
     }else {
        document.getElementById('menuContainer').style.transform = "translateY(0%)";
     }
  });
}

navigation();

function initMotionDisplays(){
  var activeMotionDisplayName,
      activeMotionDisplay;

  function loadMotionDisplay(name, elem){
    if(activeMotionDisplayName === name) return; //because this function gets triggered a lot :(
    activeMotionDisplayName = name;
    loadField(name, elem);
  }

  function removeMotionDisplay($elem){
    activeMotionDisplayName = null;
    window.activeMotionDisplay && window.activeMotionDisplay.stop();
    $elem.empty();
  }

  function assignFieldTrigger(selector, fieldName){
    $(selector).viewportChecker({repeat: true, callbackFunction: function($elem, action){
      if(action === 'add'){
        loadMotionDisplay(fieldName, $elem[0]);
      } else {
        removeMotionDisplay($elem);
      }
    }})
  }

  assignFieldTrigger('#splashflow', 'gr-amsterdam');
  
}

$(document).ready(initMotionDisplays);
