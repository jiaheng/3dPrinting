var test = require('unit.js');
var should = require('should');
var SpecificationTest = require('./SpecificationTest.js');	
var BaseFactory = require('../../src/component/BaseFactory.js').BaseFactory;
var BaseSpecification = require('../../src/interface/BaseSpecification.js').BaseSpecification;
var Base = require('../../src/component/Base.js').Base;
var Spring = require('../../src/component/Spring.js').Spring;

describe('Base Specification Test', function() {
	
	var baseSpec, base;
	var thickness = 2; // base thickness
	
	beforeEach(function() {
		var baseFactory = new BaseFactory();
		var spring = new Spring();
		var components = [];
		baseFactory.setThickness(thickness);
		components.push(spring);
		base = baseFactory.makeBase(components);
		baseSpec = base.toSpecification();
	})
	
	it('should behave like a Specification', function() {
		SpecificationTest.shouldBehaveLikeSpecification(baseSpec);
	})
	
	it('get thickness of the base', function() {
		baseSpec.thickness.should.equal(base.getHeight());
		baseSpec.thickness.should.equal(thickness);
	})
	
	it('should contain parts', function() {
		var parts = base.getParts();
		for (var i = 0; i < parts.length; i++) {
			baseSpec.parts.should.containEql(parts[i].toSpecification());
		}
	})
})