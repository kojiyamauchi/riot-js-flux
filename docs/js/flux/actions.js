// Flux Architecture, -Action- Script.
var RiotControl = require('riotcontrol'),
    TodoAction;

TodoAction = {
    initCart: function () {
        RiotControl.trigger('init_cart');
    },
    addCart: function (_target) {
        RiotControl.trigger('add_cart', _target);
    },
    resetCart: function () {
        RiotControl.trigger('reset_cart');
    }
};

module.exports = TodoAction; // Require This Flie. Using Node.js, module.exports.
