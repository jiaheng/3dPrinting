/*
 * A sample application that creates a simple GearTrain
 */
var GearTrain = require(__dirname + '/../src/gearFramework/components/GearTrain.js').GearTrain
var Gear = require(__dirname + '/../src/gearFramework/components/Gear.js').Gear
var Drawer = require(__dirname + '/../src/interface/Drawer.js').Drawer

var gearTrain = new GearTrain(10)
var firstGear = gearTrain.createGear(10)
var secondGear = gearTrain.createGear(20)
var thirdGear = gearTrain.createGear(25)
var fourthGear = gearTrain.createGear(15)
var fifthGear = gearTrain.createGear(8)
var controller = new Drawer()

firstGear.placeOnLeftOf(secondGear)
secondGear.placeOnLeftOf(thirdGear)
thirdGear.placeAtFrontOf(fourthGear)
fifthGear.placeOnRightOf(fourthGear)

thirdGear.getCentre().setAt(0, 0, 0)
controller.addComponentGroup(gearTrain)
controller.generateJscad()
