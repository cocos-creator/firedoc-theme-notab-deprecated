$(document).ready(function () {

  'use strict';

  var itemsCont = $('#api-items');
  var itemsList = $('#api-items>li>.api-list-item-clickable');
  itemsList.on(
    'click',
    function onclick () {
      $(this).parent().find('.members-list').toggleClass('hidden');
    }
  );

  var searchBox = $('#api-tabview-filter>input[type=search]');
  searchBox.on(
    'keyup',
    function (e) {
      var keyword = $(this).val();
      filter(keyword);
    }
  );

  $(document).on('keyup', function (e) {
    // shortcut 's' -> search
    if (e.keyCode === 83) {
      searchBox.focus();
    }
  });

  var records = [];
  itemsCont.find('.module').each(
    getAppendor('module')
  );
  itemsCont.find('.class').each(
    getAppendor('class')
  );
  itemsCont.find('.enum').each(
    getAppendor('enum')
  );

  function getAppendor (type) {
    return function () {
      var $this = $(this);
      var name = $this.text().trim().replace(/\n\r/, '');
      records.push(
        appendMmebers({
          'this': $this.parent().parent(),
          'ns': name.toLowerCase(),
          'name': name,
          'type': type
        })
      );
    };
  }

  function appendMmebers (parent) {
    // console.log($(parent.this).find('.members'));
    $(parent.this).find('.members>li').each(function () {
      var $this = $(this);
      var name = $this.find('.name').text().trim().replace(/\n\r/, '');
      var namespace = [parent.name, name].join('.').toLowerCase();
      records.push({
        'parent': parent,
        'ns': namespace,
        'name': name,
        'type': 'member',
        'this': $this
      });
    });
    return parent;
  }

  function filter (keyword) {
    records.filter(function (r) {
      r.this.show();
      if (r.ns.search(keyword.toLowerCase()) === -1) {
        r.this.hide();
      } else {
        if (keyword) {
          (r.type === 'member' ? r.parent : r)
            .this.find('.members-list').removeClass('hidden');
        } else {
          r.this.find('.members-list').addClass('hidden');
        }
        return true;
      }
    }).map(function (r) {
      if (r.parent) {
        r.parent.this.show();
      }
    });
  }

});