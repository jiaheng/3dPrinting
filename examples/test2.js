var Drawer = require('../interface/Drawer.js').Drawer;
var Spring = require('../components/Spring.js').Spring;
var Anchor = require('../components/Anchor.js').Anchor;

var drawer = new Drawer();
var spring = new Spring();
var anchor = new Anchor();

spring.placeWith(anchor);

drawer.addComponent(spring);
drawer.addComponent(anchor);
drawer.generateJscad();
