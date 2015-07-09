var searchStringInArray = function(str, strArray) {
  'use strict';
  for (var j = 0; j < strArray.length; j++) {
    if (strArray[j].match(str)) {
      return j;
    }
  }
  return -1;
};
