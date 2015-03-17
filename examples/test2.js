var Drawer = require('../src/interface/Drawer.js').Drawer;
var Spring = require('../src/component/Spring.js').Spring;
var Anchor = require('../src/component/Anchor.js').Anchor;

var drawer = new Drawer();
var spring = new Spring();
var anchor = new Anchor();

spring.placeWith(anchor);

drawer.addComponent(spring);
drawer.addComponent(anchor);
drawer.generateJscad();
