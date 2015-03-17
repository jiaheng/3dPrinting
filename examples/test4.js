var Drawer = require('../interface/Drawer.js').Drawer;
var Spring = require('../src/component/Spring.js').Spring;
var Anchor = require('../src/component/Anchor.js').Anchor;
var BaseFactory = require('../src/component/BaseFactory.js').BaseFactory;

var allComponents = [];
var drawer = new Drawer();
var spring = new Spring();
var anchor = new Anchor();
var baseFactory = new BaseFactory();

spring.setCentre(0,0,0);
anchor.placeWith(spring);

allComponents.push(spring);
allComponents.push(anchor);
var base = baseFactory.makeBase(allComponents);
allComponents.push(base);

drawer.addComponent(spring);
drawer.addComponent(anchor);
drawer.addComponent(base);
drawer.generateJscad();
