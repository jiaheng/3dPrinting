var test = require('unit.js');
var should = require('should');
var Anchor = require(__dirname + '/../../src/component/Anchor.js').Anchor;
// var Spindle = require(__dirname + '/../../src/component/Spindle.js').Spindle;

describe('Anchor', function () {
	var anchor;
	
	const TEST_THICKNESS = 9;
	const TEST_ANCHOR_LENGTH = 46;
	const TEST_FORK_LENGTH = 52;
	const TEST_CONNECT_WIDTH = 3;
	const TEST_CONNECT_LENGTH = 4;
	const TEST_CENTRE_HOLE_RADIUS = 4;
	const TEST_CENTRE_RING_RADIUS = 13;
	const TEST_ANCHOR_WIDTH = 5; 
	const TEST_CONNECTOR_LENGTH = 10;
	const TEST_CONNECTOR_WIDTH = 9;
	
	beforeEach(function() {
		anchor = new Anchor();
	})
	
	describe('Testing getter/setter', function() {
		it('get type name', function() {
			var typeName = 'Anchor';
			should(anchor.getTypeName()).be.equal(typeName);
		})
		
		it('set anchor thickness', function() {
			anchor.setThickness(TEST_THICKNESS);
			should(anchor.getThickness()).be.equal(TEST_THICKNESS);
		})
		
		it('set anchor length', function() {
			anchor.setAnchorLength(TEST_ANCHOR_LENGTH);
			should(anchor.getAnchorLength()).be.equal(TEST_ANCHOR_LENGTH);
		})
		
		it('set fork length', function() {
			anchor.setForkLength(TEST_FORK_LENGTH);
			should(anchor.getForkLength()).be.equal(TEST_FORK_LENGTH);
		})
		
		it('set connect width', function() {
			anchor.setConnectWidth(TEST_CONNECT_WIDTH);
			should(anchor.getConnectWidth()).be.equal(TEST_CONNECT_WIDTH);
		})
		
		it('set connect length', function() {
			anchor.setConnectLength(TEST_CONNECT_LENGTH);
			should(anchor.getConnectLength()).be.equal(TEST_CONNECT_LENGTH);
		})
		
		it('set connector width', function() {
			anchor.setConnectorWidth(TEST_CONNECTOR_WIDTH);
			should(anchor.getConnectorWidth()).be.equal(TEST_CONNECTOR_WIDTH);
		})
		
		it('set connector length', function() {
			anchor.setConnectorLength(TEST_CONNECTOR_LENGTH);
			should(anchor.getConnectorLength()).be.equal(TEST_CONNECTOR_LENGTH);
		})
		
		it('set centre hole radius', function() {
			anchor.setCentreHoleRadius(TEST_CENTRE_HOLE_RADIUS);
			should(anchor.getCentreHoleRadius()).be.equal(TEST_CENTRE_HOLE_RADIUS);
		})
		
		it('set anchor width', function() {
			anchor.setAnchorWidth(TEST_ANCHOR_WIDTH);
			should(anchor.getAnchorWidth()).be.equal(TEST_ANCHOR_WIDTH);
		})
		
		it('set centre ring radius', function() {
			anchor.setCentreRingRadius(TEST_CENTRE_RING_RADIUS);
			should(anchor.getCentreRingRadius()).be.equal(TEST_CENTRE_RING_RADIUS);
		})
	})
	
	describe('Test constraints and placement method', function() {
		beforeEach(function() {
			anchor = new Anchor();
		})
		
		it('height is same as thickness', function() {
			anchor.setThickness(TEST_THICKNESS);
			should(anchor.getHeight()).be.equal(TEST_THICKNESS);
			should(anchor.getThickness()).be.equal(anchor.getHeight());
		})
		
		it('centre hole should smaller than centre ring radius', function() {
			anchor.setCentreRingRadius(TEST_CENTRE_RING_RADIUS);
			anchor.setCentreHoleRadius(TEST_CENTRE_RING_RADIUS + 1);
			var err_msg = 'Centre hole radius should be smaller than centre ring radius';
			test
				.error(anchor.toSpecification)
					.is(new Error(err_msg))
			;
		})
		
		it('connector width should be larger than connect width', function() {
			anchor.setConnectorWidth(TEST_CONNECTOR_WIDTH - 1);
			anchor.setConnectWidth(TEST_CONNECTOR_WIDTH);
			var err_msg = 'Anchor connector width should be larger than connect width';
			test
				.error(anchor.toSpecification)
					.is(new Error(err_msg))
			;
		})
		
		it('anchor thickness should be more than zero', function() {
			var err_msg = 'Thickness must be more than zero';
			anchor.setThickness(-1);
			test
				.error(anchor.toSpecification)
					.is(new Error(err_msg))
			;
		})
		
		it('anchor length should be more than zero', function() {
			var err_msg = 'Anchor length must be more than zero';
			anchor.setAnchorLength(-1);
			test
				.error(anchor.toSpecification)
					.is(new Error(err_msg))
			;
		})
		
		it('fork length should be more than zero', function() {
			var err_msg = 'Fork length must be more than zero';
			anchor.setForkLength(-1);
			test
				.error(anchor.toSpecification)
					.is(new Error(err_msg))
			;
		})
		
		it('connect width should be more than zero', function() {
			var err_msg = 'Connect width must be more than zero';
			anchor.setConnectWidth(-1);
			test
				.error(anchor.toSpecification)
					.is(new Error(err_msg))
			;
		})
		
		it('connect length should be more than zero', function() {
			var err_msg = 'Connect length must be more than zero';
			anchor.setConnectLength(-1);
			test
				.error(anchor.toSpecification)
					.is(new Error(err_msg))
			;
		})
		
		it('centre hole radius should be more than zero', function() {
			var err_msg = 'Centre hole radius must be more than zero';
			anchor.setCentreHoleRadius(-1);
			test
				.error(anchor.toSpecification)
					.is(new Error(err_msg))
			;
		})
		
		it('centre ring radius should be more than zero', function() {
			var err_msg = 'Centre ring radius must be more than zero';
			anchor.setCentreRingRadius(-1);
			test
				.error(anchor.toSpecification)
					.is(new Error(err_msg))
			;
		})
		
		it('anchor width should be more than zero', function() {
			var err_msg = 'Anchor width must be more than zero';
			anchor.setAnchorWidth(-1);
			test
				.error(anchor.toSpecification)
					.is(new Error(err_msg))
			;
		})
		
		it('connector length should be more than zero', function() {
			var err_msg = 'Connector length must be more than zero';
			anchor.setConnectorLength(-1);
			test
				.error(anchor.toSpecification)
					.is(new Error(err_msg))
			;
		})
		
		it('connector width should be more than zero', function() {
			var err_msg = 'Connector width must be more than zero';
			anchor.setConnectorWidth(-1);
			test
				.error(anchor.toSpecification)
					.is(new Error(err_msg))
			;
		})
		
		it('fork length should larger than centre ring radius', function() {
			var err_msg = 'Fork length should be larger than centre ring radius';
			anchor.setForkLength(TEST_FORK_LENGTH);
			anchor.setCentreRingRadius(TEST_FORK_LENGTH + 1);
			test
				.error(anchor.toSpecification)
					.is(new Error(err_msg))
			;
		})
		
		it('anchor length should larger than centre ring radius', function() {
			var err_msg = 'Anchor length should be larger than centre ring radius';
			anchor.setAnchorLength(TEST_ANCHOR_LENGTH);
			anchor.setCentreRingRadius(TEST_ANCHOR_LENGTH + 1);
			test
				.error(anchor.toSpecification)
					.is(new Error(err_msg))
			;
		})
		
		it('connector length should be larger than connect length', function() {
			var err_msg = 'Anchor connector length should be larger than connect length';
			anchor.setConnectLength(TEST_CONNECT_LENGTH);
			anchor.setConnectorLength(TEST_CONNECT_LENGTH - 1);
			test
				.error(anchor.toSpecification)
					.is(new Error(err_msg))
			;
		})
		
		it('test connecting point coordinate', function() {
			anchor.setForkLength(TEST_FORK_LENGTH);
			anchor.setConnectorLength(TEST_CONNECTOR_LENGTH);
			anchor.setThickness(TEST_THICKNESS);
			anchor.setCentre(0, 0, 0);
			
			var x = 0;
			var y = 0 + TEST_FORK_LENGTH + TEST_CONNECTOR_LENGTH;
			var z = 0 + TEST_THICKNESS/2;
			var point = anchor.getConnectPoint();
			should(point.getX().getValue()).be.equal(x);
			should(point.getY().getValue()).be.equal(y);
			should(point.getZ().getValue()).be.equal(z);
		})
		
		it('test base coordinate', function() {
			anchor.setThickness(TEST_THICKNESS);
			anchor.setCentre(0,0,0);
			var x = 0;
			var y = 0;
			var z = 0 - TEST_THICKNESS/2;
			var point = anchor.getBaseCoor();
			should(point.getX().getValue()).be.equal(x);
			should(point.getY().getValue()).be.equal(y);
			should(point.getZ().getValue()).be.equal(z);
		})
	})
	
	describe('Test create Spindle', function() {
		beforeEach(function() {
			anchor = new Anchor();
		})
		
		it('spindle height should be equal to anchor height', function() {
			var spindle;
			var height = 12;
			anchor.setThickness(height); // height is the same as inner cylinder height
			spindle = anchor.getSpindle();
			should(spindle.getHeight()).be.equal(height);
		})
		
		it('spindle radius should be equal to anchor centre hole radius', function() {
			var spindle;
			var radius = 5;
			anchor.setCentreHoleRadius(radius);
			spindle = anchor.getSpindle();
			should(spindle.getRadius()).be.equal(radius);
		})
	})	
})