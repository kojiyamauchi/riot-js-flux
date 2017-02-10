// Riot JS Script. /////////////////////////////////////////////////////////////
var riot = require('riot'),
    RiotControl = require('riotcontrol'),
    TodoStore = require('../js/flux/stores');

require('../tags/heading.tag');
require('../tags/subtitle.tag');
require('../tags/app.tag');
require('../tags/products.tag');
require('../tags/cart.tag');
require('../tags/foot.tag');
//require('../tags/default.tag');

RiotControl.addStore(new TodoStore);
riot.mount('*');


// jQuery Script. //////////////////////////////////////////////////////////////
'use strict';

var jQuery = require('jQuery');

jQuery(function ($) {

    // Intro Animations.
    $('.displayed').addClass('on');

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

});
