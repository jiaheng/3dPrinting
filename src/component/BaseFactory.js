var Base = require('./Base.js').Base;
var Line = require('../geometry/Line.js').Line;
var Point = require('../geometry/Point.js').Point;
var Circle = require('../geometry/Circle.js').Circle;
var Rectangle = require('../geometry/Rectangle.js').Rectangle;

module.exports.BaseFactory = BaseFactory

function BaseFactory() {
	const DEFAULT_THICKNESS = 2;

	var base, components;
	var thickness = DEFAULT_THICKNESS;
	var floorZ;

	this.makeBase = function(componentsToMakeFrom) {
		components = componentsToMakeFrom;
		createBase();
		addBaseFloor();
		addSupportForHighComponents();
		addAuxillaryComponents();
		return base;
	}

	this.getThickness = function() {
		return this.thickness;
	}
	
	this.setThickness = function(newThickness) {
		if (typeof newThickness !== 'number' || isNaN(newThickness))
			throw new Error('Thickness must be a number');
		if (newThickness <= 0) 
			throw new Error('Thickness must be more than zero');
		this.thickness = newThickness;
	}
	
	var createBase = function() {
		base = new Base();
		base.setHeight(thickness);
	}

	var addBaseFloor = function() {
		var baseMinX = null, baseMinY = null, baseMinZ = null;
		var baseMaxX = null, baseMaxY = null;
		for (var i = 0; i < components.length; i++) {
			var basePoint = components[i].getBaseCoor();
			var length = components[i].getLength();
			var width = components[i].getWidth();

			var compMinX = basePoint.getX().getValue() - length / 2;
			var compMaxX = basePoint.getX().getValue() + length / 2;
			var compMinY = basePoint.getY().getValue() - width / 2;
			var compMaxY = basePoint.getY().getValue() + width / 2;
			var compMinZ = basePoint.getZ().getValue();

			if (baseMinX == null || baseMinX > compMinX)
				baseMinX = compMinX;
			if (baseMaxX == null || baseMaxX < compMaxX)
				baseMaxX = compMaxX;
			if (baseMinY == null || baseMinY > compMinY)
				baseMinY = compMinY;
			if (baseMaxY == null || baseMaxY < compMaxY)
				baseMaxY = compMaxY;
			if (baseMinZ == null || baseMinZ > compMinZ) {
				baseMinZ = compMinZ;
				floorZ = compMinZ;
			}
		}

		var x = (baseMaxX + baseMinX) / 2;
		var y = (baseMaxY + baseMinY) / 2;
		var z = baseMinZ - thickness / 2;
		var length = (baseMaxX - baseMinX);
		var width = (baseMaxY - baseMinY);

		var rectangle = new Rectangle();
		rectangle.setLength(length);
		rectangle.setWidth(width);
		rectangle.setHeight(thickness);
		rectangle.setCentre(x, y, z);
		base.addPart(rectangle);
	}

	var addAuxillaryComponents = function() {
		for (var i = 0; i < components.length; i++) {
			components[i].generateAuxillaryComponents().forEach(
					function(component) {
						base.addPart(component);
					});
		}
	}

	var addSupportForHighComponents = function() {
		for (var i = 0; i < components.length; i++) {
			var basePoint = components[i].getBaseCoor();
			var compZ = basePoint.getZ().getValue();
			
			// if the component position is higher than the base floor
			if (compZ > floorZ) {
				var support = components[i].addSupport(floorZ);
				checkSupportCollideWithComponents(support, i);
				base.addPart(support);
			}
		}
	}
	
	var checkSupportCollideWithComponents = function(support, index) {
		for (var i = 0; i < components.length; i++) {
			if (i === index) continue;
			var shapes = components[i].getBoundaryShapes();
			for (var j = 0; j < shapes.length; j++) {
				if (support.isTouching(shapes[j])) {
					var err_msg = 'base generated is collide with some components';
					throw new Error(err_msg);
				}
			}
		}
	}
	
}