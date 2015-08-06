var subMenuHeight = document.getElementById('subMenu').offsetHeight;
var subMenu = document.getElementById('subMenu');
var mainMenuHeight = document.getElementById('mainMenu').offsetHeight;

subMenu.style.top = mainMenuHeight;





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