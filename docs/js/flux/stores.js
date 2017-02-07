// Flux Architecture, -Store- Script.
var riot = require('riot'),
    TodoStore;

TodoStore = function () {
    riot.observable(this);

    var self = this;

    self.lists = [{
        img: "images/outer.svg",
        name: "My Outer",
        price: 15000,
        stock: 16,
        id: 1
    },
    {
        img: "images/tshirts.svg",
        name: "My T-Shirts",
        price: 6000,
        stock: 10,
        id: 2
    },
    {
        img: "images/sneaker.svg",
        name: "My Sneaker",
        price: 5000,
        stock: 18,
        id: 3
    }];

    self.list = [{
        img: "images/empty.svg",
        name: "Empty Cart",
        price: 0,
        total: 0
    }];

    self.on('init_cart', function () {
        self.trigger('changes_product', self.lists);
        self.trigger('changes_cart', self.list);
    });

    self.on('reset_cart', function () {
        self.trigger('changes_product', self.lists);
        self.trigger('changes_cart', self.list);
    });

    self.on('add_cart', function (task) {
        self.lists.some(function (reference) {
            if(reference.id === task.id) {
                reference.stock = reference.stock > 0 ? reference.stock - 1 : 0;
                var list = self.list[0];
                list.img = reference.img;
                list.name = reference.name;
                list.price += reference.price;
                list.total += 1;
                return true;
            }
        });
        self.trigger('changes_product', self.lists);
        self.trigger('changes_cart', self.list);
    });

};

module.exports = TodoStore; // Require This Flie. Using Node.js, module.exports.
