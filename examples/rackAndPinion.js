/*
 * A sample application that creates a rack and pinion
 */
var GearTrain = require(__dirname + '/../src/gearFramework/components/GearTrain.js').GearTrain
var Rack = require(__dirname + '/../src/gearFramework/components/Rack.js').Rack
var Gear = require(__dirname + '/../src/gearFramework/components/Gear.js').Gear
var Drawer = require(__dirname + '/../src/interface/Drawer.js').Drawer

var gearTrain = new GearTrain(10)
var firstRack = gearTrain.createRack(5)
var secondRack = gearTrain.createRack(15)
var firstPinion = gearTrain.createGear(20)
var secondPinion = gearTrain.createGear(15)
var firstGear = gearTrain.createGear(10)
var secondGear = gearTrain.createGear(15)

firstRack.placeAtBackOf(firstGear)
secondPinion.placeAtBackOf(secondRack)
firstGear.placeAtBackOf(secondGear)
secondGear.placeOnLeftOf(firstPinion)
firstPinion.placeAtBackOf(secondPinion)

firstGear.getCentre().setAt(0, 0, 4)
var controller = new Drawer()
controller.addComponentGroup(gearTrain)
controller.generateJscad()