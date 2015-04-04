var Drawer = require(__dirname + '/../src/interface/Drawer.js').Drawer;
var Spring = require(__dirname + '/../src/component/Spring.js').Spring;
var Anchor = require(__dirname + '/../src/component/Anchor.js').Anchor;
var BaseFactory = require(__dirname + '/../src/component/BaseFactory.js').BaseFactory;

var allComponents = [];
var drawer = new Drawer();
var spring = new Spring();
var anchor = new Anchor();
var baseFactory = new BaseFactory();

anchor.setConnectLength(6);
anchor.setConnectWidth(3);
spring.setRoundedCubeWidth(3);
spring.setRoundedCubeLength(4);
anchor.setCentre(0,0,0);
spring.placeWith(anchor);

allComponents.push(spring);
allComponents.push(anchor);
var base = baseFactory.makeBase(allComponents);
allComponents.push(base);

drawer.addAllComponents(allComponents);
drawer.generateJscad();
