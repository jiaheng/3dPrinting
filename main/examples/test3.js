var Drawer = require('../interface/Drawer.js').Drawer;
var Spring = require('../components/Spring.js').Spring;
var Anchor = require('../components/Anchor.js').Anchor;
var Spindle = require('../components/Spindle.js').Spindle;

var drawer = new Drawer();
var spring = new Spring();
var anchor = new Anchor();
var spindle = new Spindle(5,5);

spring.setCentre(50,50,0);
anchor.placeWith(spring);

drawer.addComponent(spindle);
drawer.addComponent(spring);
drawer.addComponent(anchor);
drawer.generateJscad();
