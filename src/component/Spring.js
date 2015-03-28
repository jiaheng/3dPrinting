var Component = require('./Component.js').Component;
var SpringSpecification = require('../interface/SpringSpecification.js').SpringSpecification;
var Point = require('../geometry/Point.js').Point;
var Spindle = require('./Spindle.js').Spindle;
var ConstrainableValue = require('../constraint/ConstrainableValue.js').ConstrainableValue;

module.exports.Spring = Spring

function Spring() {
	var spring = new Component();

	const DEFAULT_SPRING_THICKNESS = 5;
	const DEFAULT_SPRING_WIDTH = 1.5;
	const DEFAULT_TURN = 8;
	const DEFAULT_MAX_RADIUS = 40;
	const DEFAULT_START_RADIUS = 14;
	const DEFAULT_OUTER_CYLINDER_RADIUS = 15;
	const DEFAULT_OUTER_CYLINDER_HEIGHT = 15;
	const DEFAULT_INNER_CYLINDER_RADIUS = 10;
	const DEFAULT_INNER_CYLINDER_HEIGHT = 30;
	const DEFAULT_CENTRE_HOLE_RADIUS = 4;
	const DEFAULT_ROUNDED_CUBE_HEIGHT = 20;
	const DEFAULT_ROUNDED_CUBE_LENGTH = 5;
	const DEFAULT_ROUNDED_CUBE_WIDTH = 4;
	//const DEFAULT_HEIGHT = 30;

	var springThickness = DEFAULT_SPRING_THICKNESS;
	var springWidth = DEFAULT_SPRING_WIDTH;
	var turn = DEFAULT_TURN;
	var maxRadius = DEFAULT_MAX_RADIUS;
	var startRadius = DEFAULT_START_RADIUS;
	var outerCylinderRadius = DEFAULT_OUTER_CYLINDER_RADIUS;
	var outerCylinderHeight = DEFAULT_OUTER_CYLINDER_HEIGHT;
	var innerCylinderRadius = DEFAULT_INNER_CYLINDER_RADIUS;
	//var innerCylinderHeight = DEFAULT_INNER_CYLINDER_HEIGHT; // change to contrainable value
	var centreHoleRadius = DEFAULT_CENTRE_HOLE_RADIUS;
	var roundedCubeHeight = DEFAULT_ROUNDED_CUBE_HEIGHT;
	var roundedCubeLength = DEFAULT_ROUNDED_CUBE_LENGTH;
	var roundedCubeWidth = DEFAULT_ROUNDED_CUBE_WIDTH;
	//var height = DEFAULT_HEIGHT; // change to contrainable value
	var connectedAnchor = null;
	
	var innerCylinderHeight = new ConstrainableValue();
	var height = new ConstrainableValue();
	height.sameAs(innerCylinderHeight);
	innerCylinderHeight.setValue(DEFAULT_INNER_CYLINDER_HEIGHT);
	
	spring.setCentre(0, 0, 0);

	spring.getTypeName = function() {
		return "Spring";
	}

	spring.getSpringThickness = function() {
		return springThickness;
	}

	spring.getSpringWidth = function() {
		return springWidth;
	}
	
	spring.getTurn = function() {
		return turn;
	}

	spring.getMaxRadius = function() {
		return maxRadius;
	}

	spring.getStartRadius = function() {
		return startRadius;
	}

	spring.getOuterCylinderRadius = function() {
		return outerCylinderRadius;
	}

	spring.getOuterCylinderHeight = function() {
		return outerCylinderHeight;
	}

	spring.getInnerCylinderRadius = function() {
		return innerCylinderRadius;
	}

	spring.getInnerCylinderHeight = function() {
		return innerCylinderHeight.getValue();
	}

	spring.getCentreHoleRadius = function() {
		return centreHoleRadius;
	}

	spring.getRoundedCubeHeight = function() {
		return roundedCubeHeight;
	}

	spring.getRoundedCubeLength = function() {
		return roundedCubeLength;
	}

	spring.getRoundedCubeWidth = function() {
		return roundedCubeWidth;
	}

	spring.getHeight = function() {
		return height.getValue();
	}

	spring.getBaseCoor = function() {
		var centre = spring.getCentre();
		var point = new Point();
		var thickness = spring.getSpringThickness();
		var x = centre.getX().getValue();
		var y = centre.getY().getValue();
		var z = centre.getZ().getValue() - thickness / 2;
		point.setAt(x, y, z);
		return point;
	}

	spring.getWidth = function() {
		return maxRadius * 2;
	}

	spring.getLength = function() {
		return maxRadius * 2;
	}

	spring.setSpringThickness = function(newThickness) {
		springThickness = newThickness;
	}

	spring.setSpringWidth = function(newWidth) {
		springWidth = newWidth;
	}
	
	spring.setTurn = function(newTurn) {
		turn = newTurn;
	}

	spring.setMaxRadius = function(newMaxRadius) {
		maxRadius = newMaxRadius;
	}

	spring.setStartRadius = function(newStartRadius) {
		startRadius = newStartRadius;
	}

	spring.setOuterCylinderRadius = function(newOuterCylinderRadius) {
		outerCylinderRadius = newOuterCylinderRadius;
	}

	spring.setOuterCylinderHeight = function(newOuterCylinderHeight) {
		outerCylinderHeight = newOuterCylinderHeight;
	}

	spring.setInnerCylinderRadius = function(newInnerCylinderRadius) {
		innerCylinderRadius = newInnerCylinderRadius;
	}

	spring.setInnerCylinderHeight = function(newInnerCylinderHeight) {
		innerCylinderHeight.setValue(newInnerCylinderHeight);
	}

	spring.setCentreHoleRadius = function(newCentreHoleRadius) {
		centreHoleRadius = newCentreHoleRadius;
	}

	spring.setRoundedCubeHeight = function(newRoundedCubeHeight) {
		roundedCubeHeight = newRoundedCubeHeight;
	}

	spring.setRoundedCubeLength = function(newRoundedCubeLength) {
		roundedCubeLength = newRoundedCubeLength;
	}

	spring.setRoundedCubeWidth = function(newRoundedCubeWidth) {
		roundedCubeWidth = newRoundedCubeWidth;
	}
	
	/**
	 * cannot set height
	spring.setHeight = function(newHeight) {
		height = newHeight;
	}
	*/
	
	spring.placeWith = function(otherComponent) {
		if (spring.isPlaceWithAnchor())
			throw new Error('Spring already connected with another anchor');
		if (otherComponent.getTypeName() != 'Anchor')
			throw new Error("Spring can only place with an anchor");
		/*
		var connectP = spring.getConnectPoint();
		var otherConnectP = otherComponent.getConnectPoint();
		var newX = otherConnectP.getX().getValue() - connectP.getX().getValue();
		var newY = otherConnectP.getY().getValue() - connectP.getY().getValue();
		var newZ = otherConnectP.getZ().getValue() - connectP.getZ().getValue();
		*/
		/*
		 * console.log(otherConnectP.getX().getValue());
		 * console.log(otherConnectP.getY().getValue());
		 * console.log(otherConnectP.getZ().getValue()); console.log('new x: ' +
		 * newX + '\tnew y: ' + newY + '\tnew z: ' + newZ);
		 */
		//spring.setCentre(newX, newY, newZ);

		spring.connectedAnchor = otherComponent;
		spring.relocate();
		otherComponent.link(spring);
	}

	spring.link = function(otherComponent) {
		if (otherComponent.getConnectedSpring() === spring)
			spring.connectedAnchor = otherComponent;
		else
			throw new Error('Component not the same');
	}
	
	spring.getConnectedAnchor = function() {
		return spring.connectedAnchor;
	}
	
	spring.getConnectPoint = function() {
		var height = this.getHeight();
		var innerCylinderRadius = this.getInnerCylinderRadius();
		var roundedCubeLength = this.getRoundedCubeLength();
		var thickness = this.getSpringThickness();
		
		var point = new Point();
		var centre = spring.getCentre();
		
		var x = centre.getX().getValue();
		var y = centre.getY().getValue() - innerCylinderRadius
				- roundedCubeLength + 1; // TODO:1 unit further?
		var z = centre.getZ().getValue() + height - (thickness) / 2;
		point.setAt(x, y, z);
		return point;
	}

	spring.getSpindle = function() {
		var height = this.getHeight();
		var thickness = this.getSpringThickness();
		var centreHoleRadius = this.getCentreHoleRadius();
		
		var spindle = new Spindle(height, centreHoleRadius);
		var centre = spring.getCentre();
		
		var x = centre.getX().getValue();
		var y = centre.getY().getValue();
		var z = centre.getZ().getValue() + (height - thickness) / 2;
		spindle.setCentre(x, y, z);
		return spindle;
	}

	spring.generateAuxillaryComponents = function() {
		return [ spring.getSpindle() ];
	}

	var checkParameter = function() {
		if (spring.getSpringThickness() <= 0)
			throw new Error('Spring thickness must be more than zero');
		if (spring.getSpringWidth() <= 0)
			throw new Error('Spring width must be more than zero');
		if (spring.getTurn() <= 0)
			throw new Error('Number of turn must be more than zero');
		if (spring.getMaxRadius() <= 0)
			throw new Error('Max radius must be more than zero');
		if (spring.getStartRadius() <= 0)
			throw new Error('Start radius must be more than zero');
		if (spring.getOuterCylinderRadius() <= 0)
			throw new Error('Outer cylinder radius must be more than zero');
		if (spring.getOuterCylinderHeight() <= 0)
			throw new Error('Outer cylinder height must be more than zero');
		if (spring.getInnerCylinderRadius() <= 0)
			throw new Error('Inner cylinder radius must be more than zero');
		if (spring.getInnerCylinderHeight() <= 0)
			throw new Error('Inner cylinder height must be more than zero');
		if (spring.getCentreHoleRadius() <=0)
			throw new Error('Centre hole radius must be more than zero');
		if (spring.getRoundedCubeHeight() <=0)
			throw new Error('Rounded cube height must be more than zero');
		if (spring.getRoundedCubeWidth() <=0)
			throw new Error('Rounded cube width must be more than zero');
		if (spring.getRoundedCubeLength() <=0)
			throw new Error('Rounded cube length must be more than zero');
		
		if (spring.getOuterCylinderRadius() <= spring.getInnerCylinderRadius())
			throw new Error('Outer cylinder radius should be more than inner cylinder radius');
		if (spring.getOuterCylinderHeight() >= spring.getInnerCylinderHeight())
			throw new Error('Outer cylinder height should be less than inner cylinder height');
		if (spring.getCentreHoleRadius() >= spring.getInnerCylinderRadius())
			throw new Error('Centre hole should be smaller than inner cylinder radius');
		if (spring.getMaxRadius() <= spring.getStartRadius())
			throw new Error('Max radius should larger than start radius');
	}
	
	spring.toSpecification = function() {
		checkParameter();
		return new SpringSpecification(spring);
	}
	
	spring.addSupport = function(floorZ) {
		//TODO:
		return spring.getSpindle();
	}
	
	spring.isPlaceWithAnchor = function() {
		return (spring.connectedAnchor != null);
	}
	
	spring.unlink = function() {
		var anchor = spring.connectedAnchor;
		spring.connectedAnchor = null;
		if (anchor.isPlaceWithSpring())
			anchor.unlink();
	}
	
	spring._setCentre = spring.setCentre;
	
	spring.setCentre = function(arg1, arg2, arg3) {
		spring._setCentre(arg1, arg2, arg3);
		if (spring.isPlaceWithAnchor())
			spring.connectedAnchor.relocate();
	}
	
	spring.relocate = function() {
		var connectP = spring.getConnectPoint();
		var anchorConnectP = spring.connectedAnchor.getConnectPoint();
		var centre = spring.getCentre();
		var newX = centre.getX().getValue() + anchorConnectP.getX().getValue() - connectP.getX().getValue();
		var newY = centre.getY().getValue() + anchorConnectP.getY().getValue() - connectP.getY().getValue();
		var newZ = centre.getZ().getValue() + anchorConnectP.getZ().getValue() - connectP.getZ().getValue();
		spring._setCentre(newX, newY, newZ); // call super method setCentre only
	}
	
	return spring;
}
