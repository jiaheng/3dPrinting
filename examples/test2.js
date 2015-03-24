var Drawer = require(__dirname + '/../src/interface/Drawer.js').Drawer;
var Spring = require(__dirname + '/../src/component/Spring.js').Spring;
var Anchor = require(__dirname + '/../src/component/Anchor.js').Anchor;

var drawer = new Drawer();
var spring = new Spring();
var anchor = new Anchor();

spring.placeWith(anchor);

drawer.addComponent(spring);
drawer.addComponent(anchor);
drawer.generateJscad();
