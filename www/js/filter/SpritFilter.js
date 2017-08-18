'use strict';
app.filter('SpritFilter',function () {
  return function (text) {
    if(text.indexOf('/') > 0){
      text = text.replace(/\//g, ".");
    }
    return text;
  };
})
