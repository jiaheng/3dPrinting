var Drawer = require('../src/interface/Drawer.js').Drawer;
var Spring = require('../src/component/Spring.js').Spring;
var Anchor = require('../src/component/Anchor.js').Anchor;
var Spindle = require('../src/component/Spindle.js').Spindle;

var drawer = new Drawer();
var spring = new Spring();
var anchor = new Anchor();
var spindle1, spindle2;

spring.setCentre(50,50,0);
anchor.placeWith(spring);
spindle1 = spring.getSpindle();
spindle2 = anchor.getSpindle();

drawer.addComponent(spindle1);
drawer.addComponent(spindle2);
drawer.addComponent(spring);
drawer.addComponent(anchor);
drawer.generateJscad();
