$(document).ready(function() {
  $('.new-tweet textarea').keyup(function() {
    let value = $(this).val().length;
    let charLimit = 140 - value;
    let charCounter = $(this).closest('form').children(".counter");
    console.log(charCounter);
    charCounter.html(charLimit);
    if (charLimit < 0) {
      charCounter.css({
        'font-style': 'oblique',
        'color': 'red'
      });
    } else {
      charCounter.css({
        'font-style': 'normal',
        'color': 'black'
      });
    }
  });
});
