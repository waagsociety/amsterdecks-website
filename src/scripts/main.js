var mainMenu = document.getElementById('mainMenu'),
    subMenu = document.getElementById('subMenu');
    mainMenuHeight = mainMenu.offsetHeight;

subMenu.style.top = mainMenuHeight + "px";

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

var activeMotionDisplayName;

function loadMotionDisplay(name, elem){
  if(activeMotionDisplayName === name) return; //because this function gets triggered a lot :(
  activeMotionDisplayName = name;
  loadField(name, elem);
}

function removeMotionDisplay(){
  activeMotionDisplayName = null;
}

$('#home').viewportChecker({repeat: true, callbackFunction: function(elem, action){
  if(action === 'add'){
    loadMotionDisplay('centercenter', elem[0]);
  } else {
    removeMotionDisplay();
  }
}})
$('#waterkwaliteit').viewportChecker({repeat: true, callbackFunction: function(elem, action){ console.log('waterkwaliteit: ' + action); }})