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

document.body.addEventListener('loadedMotionDisplay:gr-amsterdam', removeLoader);

//setTimeout(removeLoader, 5000);
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
  var activeMotionDisplayNames = [],
      activeMotionDisplays = [],
      preloadedPngs = false;

  document.body.addEventListener('loadedMotionDisplay:gr-amsterdam', preloadPngs);

  function preloadPngs(e){
    if(preloadedPngs) return;

    preloadedPngs = true;
    var loadedName = e.type.split(':')[1],
        allFields = Object.keys(fieldInfos);

    allFields.splice(allFields.indexOf(loadedName), 1);

    allFields.forEach(preloadField);

    function preloadField(name){
      var fieldInfo = fieldInfos[name],
          pngPreloadWrapper = document.createElement('div'),
          pathPrefix = 'public/fields/' + fieldInfo.diskName + '/',
          metaKeys = Object.keys(fieldInfo.meta),
          loadedPngs = 0,
          total = metaKeys.length;

      pngPreloadWrapper.style.display = 'none';
      pngPreloadWrapper.id = 'preload-' + name;

      metaKeys.forEach(addPng);

      document.body.appendChild(pngPreloadWrapper);

      function addPng(key){
        var png = new Image();

        png.src = pathPrefix + key + '.png';
        png.onload = loadedPng;

        pngPreloadWrapper.appendChild(png);
      }

      function loadedPng(){
        loadedPngs++;
        if(loadedPngs === total){
          console.log(name + ' preloaded!');
          pngPreloadWrapper.remove();
        }
      }
    }
  }

  function loadMotionDisplay(field){
    var name = field.name;

    if(activeMotionDisplayNames.indexOf(name) > -1) return; //because this function gets triggered a lot :(
    activeMotionDisplayNames.push(name);
    loadField(name, document.querySelector(field.parent), function(motionDisplay){
      activeMotionDisplays[name] = motionDisplay;
      document.body.dispatchEvent(new Event('loadedMotionDisplay:' + name));
    });
  }

  function removeMotionDisplay(field){
    activeMotionDisplayNames.splice(activeMotionDisplays.indexOf(field.name));
    if(activeMotionDisplays[field.name]){
      activeMotionDisplays[field.name].destroy();
      delete activeMotionDisplays[field.name];
    }
    document.querySelector(field.parent).innerHTML = '';
  }

  function assignFieldTrigger(selectorVisibility, fields){
    $(selectorVisibility).viewportChecker({repeat: true, callbackFunction: function($elem, action){
      fields.forEach(action === 'add' ? loadMotionDisplay : removeMotionDisplay);
    }});
  }

  assignFieldTrigger('#splashflow', [{ name: 'gr-amsterdam', parent: '#splashflow' }]);
  assignFieldTrigger('#stromingCenter', [{ name: 'centercenter', parent: '#stromingCenter' }]);
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
      mainContainer = document.getElementById("systeem"),
      view = document.createElement("div");
  
  viewContainer.innerHTML = "";
  mainContainer.className = "page page-3 left big-padding " + name;
  view.className = "view " + name;
  viewContainer.appendChild(view);    
}

$(document).ready(initMotionDisplays);

$('.liquidCommons a').click(function() {
  $('.liqSub').toggleClass('active');
});

$('.home a, .projects a').click(function() {
  $('.liqSub').removeClass('active');
});

