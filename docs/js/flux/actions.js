// Flux Architecture, -Action- Script.
import RiotControl from 'riotcontrol'
let TodoAction

TodoAction = {
  initCart: () => {
    RiotControl.trigger('init_cart')
  },
  addCart: _target => {
    RiotControl.trigger('add_cart', _target)
  },
  resetCart: () => {
    RiotControl.trigger('reset_cart')
  }
}

module.exports = TodoAction // Require This Flie. Using Node.js, module.exports.
