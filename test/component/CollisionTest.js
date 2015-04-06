var test = require('unit.js');
var should = require('should');
var Spring = require(__dirname + '/../../src/component/Spring.js').Spring;
var Anchor = require(__dirname + '/../../src/component/Anchor.js').Anchor;
var BaseFactory = require(__dirname + '/../../src/component/BaseFactory.js').BaseFactory;
var Base = require(__dirname + '/../../src/component/Base.js').Base;

describe('Spring/Anchor Placement', function() {
	var anchor;
	var spring;
	
	beforeEach(function() {
		anchor = new Anchor();
		spring = new Spring();
	})
	
	it('spring and anchor are far appart', function() {
		anchor.setCentre(100, 100, 100);
		spring.setCentre(-100, -100, -100);
		anchor.checkCollideWith(spring);
		spring.checkCollideWith(anchor);
	})
	
	it('anchor and spring at centre should collide', function() {
		anchor.setCentre(0, 0, 0);
		spring.setCentre(0, 0, 0);
		(function() {
			anchor.checkCollideWith(spring);
		}).should.throw(/ is collide with /);
	})
	
	it('anchor and spring at centre should collide 2', function() {
		anchor.setCentre(0, 0, 0);
		spring.setCentre(0, 0, 0);
		(function() {
			spring.checkCollideWith(anchor);
		}).should.throw(/ is collide with /);
	})
	
	it('connected anchor and spring should not collide', function() {
		anchor.placeWith(spring);
		spring.checkCollideWith(anchor);
		anchor.checkCollideWith(spring);
	})
	
	it('anchor should collide if spring is close but not linked', function() {
		spring.setCentre(10, 10, 10);
		anchor.placeWith(spring);
		anchor.unlink();
		(function() {
			anchor.checkCollideWith(spring);
		}).should.throw(/ is collide with /);
	})
	
	it('spring should collide if anchor is close but not linked', function() {
		anchor.setCentre(10, 10, 10);
		spring.placeWith(anchor);
		spring.unlink();
		(function() {
			spring.checkCollideWith(anchor);
		}).should.throw(/ is collide with /);
	})
	
	it('spring on top of another spring with small gap should not collide', function() {
		var spring2 = new Spring();
		spring.setCentre(0, 0, 0);
		spring2.setCentre(0, 0, spring.getHeight() + 10);
		spring.checkCollideWith(spring2);
	})
	
	it('spring right on top of another spring should collide', function() {
		var spring2 = new Spring();
		spring.setCentre(0, 0, 0);
		spring2.setCentre(0, 0, spring.getHeight());
		(function() {
			spring.checkCollideWith(spring2);
		}).should.throw(/ is collide with /);
	})
	
	it('spring on top of another anchor with small gap should not collide', function() {
		spring.setCentre(0, 0, 0);
		anchor.setCentre(0, 0, spring.getHeight() + spring.getSpringThickness() + 1);
		spring.checkCollideWith(anchor);
	})
	
	it('spring right on top of another anchor should collide', function() {
		spring.setCentre(0, 0, 0);
		anchor.setCentre(0, 0, spring.getHeight() + spring.getSpringThickness());
		(function() {
			spring.checkCollideWith(anchor);
		}).should.throw(/ is collide with /);
	})
	
	it('base factory should pass collision check when generate base for components', function() {
		var baseFactory = new BaseFactory();
		var components = [];
		spring.placeWith(anchor);
		components.push(spring);
		components.push(anchor);
		baseFactory.makeBase(components);
	})
	
	it('base generated will collide with some components', function() {
		var baseFactory = new BaseFactory();
		var components = [];
		var spring2 = new Spring();
		var anchor2 = new Anchor();
		
		// all components are not collide with each other
		spring.placeWith(anchor);
		spring2.placeWith(anchor2);
		anchor.setCentre(0, 0, 0);
		anchor2.setCentre(0, 0, 50);
		
		components.push(spring);
		components.push(anchor);
		components.push(spring2);
		components.push(anchor2);
		
		(function() {
			baseFactory.makeBase(components);
		}).should.throw(/base generated is collide with some components/i);
	})
	
	it('base generated will collide with some components 2', function() {
		var baseFactory = new BaseFactory();
		var components = [];
		
		// all components are not collide with each other
		var maxRadius = spring.getMaxRadius();
		anchor.setCentre(maxRadius, maxRadius, 50);
		spring.setCentre(0, 0, 0);
		
		components.push(spring);
		components.push(anchor);
		
		(function() {
			baseFactory.makeBase(components);
		}).should.throw(/base generated is collide with some components/i);
	})
})