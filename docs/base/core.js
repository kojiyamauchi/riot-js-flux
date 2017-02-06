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

    $('.displayed').addClass('on');

});
