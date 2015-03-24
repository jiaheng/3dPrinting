var Drawer = require(__dirname + '/../src/interface/Drawer.js').Drawer;
var Spring = require(__dirname + '/../src/component/Spring.js').Spring;
var Anchor = require(__dirname + '/../src/component/Anchor.js').Anchor;

var drawer = new Drawer();
var spring = new Spring();
var anchor = new Anchor();

anchor.setCentre(50,50,0);

drawer.addComponent(spring);
drawer.addComponent(anchor);
drawer.generateJscad();