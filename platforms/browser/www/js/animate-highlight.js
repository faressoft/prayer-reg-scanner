$.fn.animateHighlight = function (highlightColor, duration) {
  var highlightBg = highlightColor || '#FFFF9C';
  var animateMs = duration || 'fast';
  var originalBg = this.css('background-color');

  if (!originalBg || originalBg == highlightBg) originalBg = '#FFFFFF';

  jQuery(this)
    .css('backgroundColor', highlightBg)
    .animate({ backgroundColor: originalBg }, animateMs, null, function () {
      jQuery(this).css('backgroundColor', originalBg);
    });
};
