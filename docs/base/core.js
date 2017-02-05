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

    //eventToggleSyntax
    (function ($) {
        $.fn.eventToggle = function (fn) {
            var args = arguments,
                guid = fn.guid || jQuery.guid++,
                i = 0,
                toggler = function (event) {
                    var lastToggle = (jQuery._data(this, 'lastToggle' + fn.guid) || 0) % i;
                    jQuery._data(this, 'lastToggle' + fn.guid, lastToggle + 1);
                    event.preventDefault();
                    return args[lastToggle].apply(this, arguments) || false;
                };
            toggler.guid = guid;
            while(i < args.length) {
                args[i++].guid = guid;
            }
            return this.click(toggler);
        };
    })(jQuery);

    //menuToggle
    $('.btnMenu').eventToggle(function () {
        $('nav.usersNavi').slideDown(500, 'swing');
    }, function () {
        $('nav.usersNavi').slideUp(500, 'swing');
    });

    //getCurrent
    $('nav.usersNavi ul li a').each(function () {
        var $href = $(this).attr('href');
        if(location.href.match($href)) {
            $(this).addClass('usersNaviCurrent');
        } else {
            $(this).removeClass('usersNaviCurrent');
        }
    });

    $('.displayed').addClass('on');

});
