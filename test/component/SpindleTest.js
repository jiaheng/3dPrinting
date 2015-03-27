var test = require('unit.js');
var should = require('should');
var Spindle = require(__dirname + '/../../src/component/Spindle.js').Spindle;
var Anchor = require(__dirname + '/../../src/component/Anchor.js').Anchor;
var SpindleSpecification = require(__dirname + '/../../src/interface/SpindleSpecification.js').SpindleSpecification;

describe('Spindle', function () {
	var spindle;
	const TEST_HEIGHT = 10;
	const TEST_RADIUS = 4;
	
	beforeEach(function() {
		spindle = new Spindle(15, 5);
	})
	
	describe('Testing getter/setter', function() {
		it('get type name', function() {
			var typeName = 'Spindle';
			should(spindle.getTypeName()).be.equal(typeName);
		})
		
		it('set height', function() {
			spindle.setHeight(TEST_HEIGHT);
			should(spindle.getHeight()).be.equal(TEST_HEIGHT);
		})
		
		it('set radius', function() {
			spindle.setRadius(TEST_RADIUS);
			should(spindle.getRadius()).be.equal(TEST_RADIUS);
		})
	})
	
	describe('Test constraints', function() {
		beforeEach(function() {
			spindle = new Spindle(15, 5);
		})
		
		it('height should be more than zero', function() {
			var err_msg = 'Height must be more than zero';
			spindle.setHeight(-1);
			(function() {
				spindle.toSpecification();
			}).should.throw(err_msg);
		})
		
		it('radius should be more than zero', function() {
			var err_msg = 'Radius must be more than zero';
			spindle.setRadius(-1);
			(function() {
				spindle.toSpecification();
			}).should.throw(err_msg);
		})
	})
})