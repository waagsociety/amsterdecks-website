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

// var s = skrollr.init({forceHeight: false});


function hideNavigation(){
  document.getElementById('menuContainer').style.transform = "translateY(-100%)"; 
}

function showNavigation(){
  document.getElementById('menuContainer').style.transform = "translateY(0%)";
}

function navigation(){
  var mainMenu = document.getElementById('mainMenu'),
      subMenu = document.getElementById('subMenu'),
      subMenuHeight = 0,
//      subMenuHeight = subMenu.offsetHeight,
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
        hideNavigation();
     }else {
        showNavigation();
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
    loadField(name, elem, function(motionDisplay){
      activeMotionDisplay = motionDisplay;
    });
  }

  function removeMotionDisplay($elem){
    activeMotionDisplayName = null;
    if(activeMotionDisplay){
      activeMotionDisplay.destroy();
    }
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
//  assignFieldTrigger('#stromingRijn', 'watermartin');
//  assignFieldTrigger('#stromingCenter', 'gr-amsterdam');
  
}


jQuery(document).ready(function() {
    jQuery('.systeemNav').addClass("hidden").viewportChecker({
        classToAdd: 'visible animated fadeInUp',
        offset: -50,
        repeat: true
       });
});

function systemView(name){
  var viewContainer = document.getElementById("aerialViewContainer"),
      view = document.createElement("div");
  
  viewContainer.innerHTML = "";
  view.className = "view " + name;
  viewContainer.appendChild(view);  
}

//var viewNav = document.getElementById('arialNav'),
//    children = viewNav.childNodes;
//
//for (var i=0; i < children.length; i++) {
//    children[i].getAttribute('id');
//    console.log(children[i]);
//}

$(document).ready(initMotionDisplays);
