var test = require('unit.js');
var should = require('should');
var AnchorSpecification = require('../../src/interface/AnchorSpecification.js').AnchorSpecification;
var Anchor = require('../../src/component/Anchor.js').Anchor;
var SpecificationTest = require('./SpecificationTest.js');	

describe('Anchor Specification Test', function() {
	
	var anchorSpec, anchor;
	
	beforeEach(function() {
		anchor = new Anchor();
		anchorSpec = anchor.toSpecification();
	})
	
	it('should behave like a Specification', function() {
		SpecificationTest.shouldBehaveLikeSpecification(anchorSpec)
	})
	
	it('get thickness', function() {
		anchorSpec.thickness.should.equal(anchor.getThickness());
	})
	
	it('get fork length', function() {
		anchorSpec.forkLength.should.equal(anchor.getForkLength());
	})
	
	it('get fork width', function() {
		anchorSpec.forkWidth.should.equal(anchor.getForkWidth());
	})
	
	it('get anchor length', function() {
		anchorSpec.anchorLength.should.equal(anchor.getAnchorLength());
	})
	
	it('get fork width', function() {
		anchorSpec.anchorWidth.should.equal(anchor.getAnchorWidth());
	})
	
	it('get connect length', function() {
		anchorSpec.connectLength.should.equal(anchor.getConnectLength());
	})
	
	it('get connect width', function() {
		anchorSpec.connectWidth.should.equal(anchor.getConnectWidth());
	})
	
	it('get connector length', function() {
		anchorSpec.connectorLength.should.equal(anchor.getConnectorLength());
	})
	
	it('get connector width', function() {
		anchorSpec.connectorWidth.should.equal(anchor.getConnectorWidth());
	})
	
	it('get centre hole radius', function() {
		anchorSpec.centreHoleRadius.should.equal(anchor.getCentreHoleRadius());
	})
	
	it('get centre ring radius', function() {
		anchorSpec.centreRingRadius.should.equal(anchor.getCentreRingRadius());
	})
	
	it('get height', function() {
		anchorSpec.height.should.equal(anchor.getHeight());
	})
})