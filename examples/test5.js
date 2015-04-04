var Drawer = require(__dirname + '/../src/interface/Drawer.js').Drawer;
var Spring = require(__dirname + '/../src/component/Spring.js').Spring;
var Anchor = require(__dirname + '/../src/component/Anchor.js').Anchor;
var BaseFactory = require(__dirname + '/../src/component/BaseFactory.js').BaseFactory;

var allComponents = [];
var drawer = new Drawer();
var spring = new Spring();
var anchor = new Anchor();
var baseFactory = new BaseFactory();
var spring2 = new Spring();
var anchor2 = new Anchor();

spring2.placeWith(anchor2);
anchor.setCentre(0,0,0);
spring.placeWith(anchor);

spring.setCentre(-50, -50, 0);
spring.setCentre(50, 50, 50);

allComponents.push(spring);
allComponents.push(anchor);
allComponents.push(spring2);
allComponents.push(anchor2);
var base = baseFactory.makeBase(allComponents);
allComponents.push(base);

drawer.addAllComponents(allComponents);
drawer.generateJscad();
