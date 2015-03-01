var Component = require('./Component.js').Component
var AnchorSpecification = require('../interface/AnchorSpecification.js').AnchorSpecification
var Point = require('../geometry/Point.js').Point

module.exports.Anchor = Anchor

function Anchor() {
  var anchor = new Component();
  
  const DEFAULT_THICKNESS = 6;
  const DEFAULT_MAX_RADIUS = 25;
  const DEFAULT_CONNECT_SIZE = 2;
  const DEFAULT_CENTRE_HOLE_RADIUS = 1;
  const DEFAULT_CENTRE_RING_RADIUS = 4;
  const DEFAULT_HEIGHT = 6;
  const DEFAULT_HAND_WIDTH = 2; //CHANGE THE NAME
  const DEFAULT_CONNECTOR_LENGTH = 5
  
  var thickness = DEFAULT_THICKNESS;
  var maxRadius = DEFAULT_MAX_RADIUS;
  var connectSize = DEFAULT_CONNECT_SIZE;
  var centreHoleRadius = DEFAULT_CENTRE_HOLE_RADIUS;
  var centreRingRadius = DEFAULT_CENTRE_RING_RADIUS;
  var height = DEFAULT_HEIGHT;
  var handWidth = DEFAULT_HAND_WIDTH; //CHANGE THE NAME
  var connectorLength = DEFAULT_CONNECTOR_LENGTH;
  
  anchor.setCentre(0, 0, 0);
  
  anchor.toSpecification = function() {
    return new AnchorSpecification(anchor);
  }
  
  anchor.getTypeName = function() {
    return "Anchor";
  }
  
  anchor.getThickness = function() {
    return thickness;
  }
  
  anchor.getMaxRadius = function() {
    return maxRadius;
  }
  
  anchor.getConnectSize = function() {
    return connectSize;
  }
  
  anchor.getCentreHoleRadius = function() {
    return centreHoleRadius;
  }
  
  anchor.getCentreRingRadius = function() {
    return centreRingRadius;
  }
  
  anchor.getHeight = function() {
    return height;
  }
  
  anchor.getHandWidth = function() {
    return handWidth;
  }
  
  anchor.setThickness = function(newThickness) {
    thickness = newThickness;
  }
  
  anchor.setMaxRadius = function(newMaxRadius) {
    maxRadius = newMaxRadius;
  }
  
  anchor.setConnectSize = function(newConnectSize) {
    connectSize = newConnectSize;
  }
  
  anchor.setCentreHoleRadius = function(newCentreHoleRadius) {
    centreHoleRadius = newCentreHoleRadius;
  }
  
  anchor.setCentreRingRadius = function(newCentreRingRadius) {
    centreRingRadius = newCentreRingRadius;
  }
  
  anchor.setHeight = function(newHeight) {
    height = newHeight;
  }
  
  anchor.setHandWidth = function(newHandWidth) {
    handWidth = newHandWidth;
  }
  
  anchor.getConnectPoint = function() {
	var point = new Point();
	var centre = anchor.getCentre();
	var x = centre.getX().getValue();
	var y = centre.getY().getValue() + maxRadius + connectorLength;
	var z = centre.getZ().getValue();
	point.setAt(x, y, z);
	return point;
  }
  
  return anchor;
}
