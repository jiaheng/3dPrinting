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

anchor.setConnectLength(6);
anchor.setConnectWidth(4);
spring.setRoundedCubeWidth(4);
spring.setRoundedCubeLength(4);

spring.placeWith(anchor);
spring.setCentre(100,100,0);
spring2.setCentre(0,0,0);

allComponents.push(spring);
allComponents.push(anchor);
allComponents.push(spring2);
var base = baseFactory.makeBase(allComponents);
allComponents.push(base);

drawer.addAllComponents(allComponents);
drawer.checkCollision();
drawer.generateJscad();
