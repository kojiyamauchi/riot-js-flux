// Riot JS Script. /////////////////////////////////////////////////////////////
var riot = require('riot'),
  RiotControl = require('riotcontrol'),
  TodoStore = require('../js/flux/stores');

require('../tags/heading.tag');
require('../tags/subtitle.tag');
require('../tags/app.tag');
require('../tags/products.tag');
require('../tags/cart.tag');
require('../tags/back-github.tag');
require('../tags/foot.tag');
//require('../tags/default.tag');

RiotControl.addStore(new TodoStore);
riot.mount('*');


// jQuery Script. //////////////////////////////////////////////////////////////
'use strict';

var jQuery = require('jQuery');

jQuery(function ($) {

  function addedClass() {
    // Intro Animations.
    $('.displayed').addClass('on');
  }
  addedClass();

  function addedComma() {
    // Price Add Comma.
    // Products.tag
    $('price .checkPrice').each(function () {
      var getDOM = $(this),
        addComma = getDOM.text().toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
      getDOM.prev('.addComma').text(addComma);
    });
    // Cart.tag
    $('totalprice .checkPrice').on('DOMSubtreeModified propertychange', function () {
      var getDOM = $(this),
        addComma = getDOM.text().toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
      getDOM.prev('.addComma').text(addComma);
    });
  }
  addedComma();

  function soldOut() {
    // If status sold out, img scale animation.
    $('stock .stockNumber').each(function () {
      var _this = $(this);
      _this.on('DOMSubtreeModified propertychange', function () {
        var number = _this.text();
        if(number === '0') {
          _this.parents('detail').find('img').addClass('sold');
        }
      });
    });
  }
  soldOut();

  function addedBackButton() {
    // For GitHub Back Button.
    setTimeout(function () {
      $('back-github').addClass('alpha').removeClass('on');
    }, 1300);
  }
  addedBackButton();

});
