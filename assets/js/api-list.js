$(document).ready(function () {

  'use strict';

  var itemsList = $('#api-items>li>.api-item-clickable');
  itemsList.on(
    'click',
    function onclick () {
      $(this).parent().find('.members-list').toggleClass('hidden');
    }
  );

});