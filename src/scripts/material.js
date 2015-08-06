$(document).ready(function() {
   $(".paper").mousedown(function(e) {
      var ripple = $(this).find(".ripple");
      ripple.removeClass("animate");
      var x = parseInt(e.pageX - $(this).offset().left) - (ripple.width() / 2);
      var y = parseInt(e.pageY - $(this).offset().top) - (ripple.height() / 2);
      ripple.css({
         top: y,
         left: x
      }).addClass("animate");
   });
});

$(window, document, undefined).ready(function() {

  $('input').blur(function() {
    var $this = $(this);
    if ($this.val())
      $this.addClass('used');
    else
      $this.removeClass('used');
  });

  var $ripples = $('.ripples');

  $ripples.on('click.Ripples', function(e) {

    var $this = $(this);
    var $offset = $this.parent().offset();
    var $circle = $this.find('.ripplesCircle');

    var x = e.pageX - $offset.left;
    var y = e.pageY - $offset.top;

    $circle.css({
      top: y + 'px',
      left: x + 'px'
    });

    $this.addClass('is-active');

  });

  $ripples.on('animationend webkitAnimationEnd mozAnimationEnd oanimationend MSAnimationEnd', function(e) {
  	$(this).removeClass('is-active');
  });

});