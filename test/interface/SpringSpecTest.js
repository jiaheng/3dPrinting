var test = require('unit.js');
var should = require('should');
var SpringSpecification = require('../../src/interface/SpringSpecification.js').SpringSpecification;
var Spring = require('../../src/component/Spring.js').Spring;
var SpecificationTest = require('./SpecificationTest.js');	

describe('Spring Specification Test', function() {
	
	var springSpec, spring;
	
	beforeEach(function() {
		spring = new Spring();
		springSpec = spring.toSpecification();
	})
	
	it('should behave like a Specification', function() {
		SpecificationTest.shouldBehaveLikeSpecification(springSpec);
	})
	
	it('get spring thickness', function() {
		springSpec.springThickness.should.equal(spring.getSpringThickness());
	})
	
	it('get spring width', function() {
		springSpec.springWidth.should.equal(spring.getSpringWidth());
	})
	
	it('get turn', function() {
		springSpec.turn.should.equal(spring.getTurn());
	})
	
	it('get max radius', function() {
		springSpec.maxRadius.should.equal(spring.getMaxRadius());
	})
	
	it('get start radius', function() {
		springSpec.startRadius.should.equal(spring.getStartRadius());
	})
	
	it('get outer cylinder radius', function() {
		springSpec.outerCylinderRadius.should.equal(spring.getOuterCylinderRadius());
	})
	
	it('get outer cylinder height', function() {
		springSpec.outerCylinderHeight.should.equal(spring.getOuterCylinderHeight());
	})
	
	it('get inner cylinder radius', function() {
		springSpec.innerCylinderRadius.should.equal(spring.getInnerCylinderRadius());
	})
	
	it('get inner cylinder height', function() {
		springSpec.innerCylinderHeight.should.equal(spring.getInnerCylinderHeight());
	})
	
	it('get centre hole radius', function() {
		springSpec.centreHoleRadius.should.equal(spring.getCentreHoleRadius());
	})
	
	it('get rounded cube height', function() {
		springSpec.roundedCubeHeight.should.equal(spring.getRoundedCubeHeight());
	})
	
	it('get rounded cube length', function() {
		springSpec.roundedCubeLength.should.equal(spring.getRoundedCubeLength());
	})
	
	it('get rounded cube width', function() {
		springSpec.roundedCubeWidth.should.equal(spring.getRoundedCubeWidth());
	})
	
	it('get height', function() {
		springSpec.height.should.equal(spring.getHeight());
	})
})