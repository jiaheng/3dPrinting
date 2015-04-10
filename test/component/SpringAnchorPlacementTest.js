var test = require('unit.js');
var should = require('should');
var Spring = require(__dirname + '/../../src/component/Spring.js').Spring;
var Anchor = require(__dirname + '/../../src/component/Anchor.js').Anchor;

describe('Spring/Anchor Placement', function() {
	var anchor;
	var spring;
	
	beforeEach(function() {
		anchor = new Anchor();
		spring = new Spring();
	})
	
	it('spring should be able to place with anchor', function(){
		var springInnerCylinderHeight = 10;
		var springInnerCylinderRadius = 4;
		var springRoundedCubeLength = 10;
		var springThickness = 5;
		spring.setInnerCylinderHeight(springInnerCylinderHeight);
		spring.setInnerCylinderRadius(springInnerCylinderRadius);
		spring.setRoundedCubeLength(springRoundedCubeLength);
		spring.setSpringThickness(springThickness);
		
		var anchorForkLength = 50;
		var anchorConnectorLength = 5;
		var anchorThickness = 10;
		anchor.setForkLength(anchorForkLength);
		anchor.setConnectorLength(anchorConnectorLength);
		anchor.setThickness(anchorThickness);
		
		anchor.setCentre(10, 20 ,30);
		spring.setCentre(50, 40, 30);
		spring.placeWith(anchor);
		
		var point = anchor.getCentre();
		should(point.getX().getValue()).be.equal(10);
		should(point.getY().getValue()).be.equal(20);
		should(point.getZ().getValue()).be.equal(30);
		
		var x = 10;
		var y = 20 + anchorForkLength + anchorConnectorLength + springInnerCylinderRadius + springRoundedCubeLength - 1;
		var z = 30 + anchorThickness/2 - springInnerCylinderHeight + springThickness/2;
		point = spring.getCentre();
		should(point.getX().getValue()).be.equal(x);
		should(point.getY().getValue()).be.equal(y);
		should(point.getZ().getValue()).be.equal(z);
	})
	
	it('anchor should be able to place with spring', function(){
		var springInnerCylinderHeight = 10;
		var springInnerCylinderRadius = 4;
		var springRoundedCubeLength = 10;
		var springThickness = 5;
		spring.setInnerCylinderHeight(springInnerCylinderHeight);
		spring.setInnerCylinderRadius(springInnerCylinderRadius);
		spring.setRoundedCubeLength(springRoundedCubeLength);
		spring.setSpringThickness(springThickness);
		
		var anchorForkLength = 50;
		var anchorConnectorLength = 5;
		var anchorThickness = 10;
		anchor.setForkLength(anchorForkLength);
		anchor.setConnectorLength(anchorConnectorLength);
		anchor.setThickness(anchorThickness);
		
		anchor.setCentre(10, 20, 30);
		spring.setCentre(40, 50, 60);
		anchor.placeWith(spring);
		
		var point = spring.getCentre();
		should(point.getX().getValue()).be.equal(40);
		should(point.getY().getValue()).be.equal(50);
		should(point.getZ().getValue()).be.equal(60);
		
		var x = 40;
		var y = 50 - springInnerCylinderRadius - springRoundedCubeLength + 1 - anchorForkLength - anchorConnectorLength;
		var z = 60 + springInnerCylinderHeight - springThickness/2 - anchorThickness/2;
		point = anchor.getCentre();
		should(point.getX().getValue()).be.equal(x);
		should(point.getY().getValue()).be.equal(y);
		should(point.getZ().getValue()).be.equal(z);
	})
	
	it('spring can only place with an anchor with correct size', function() {
		var roundedCubeLength = 5;
		var roundedCubeWidth = 4;
		var roundedCubeHeight = 20;
		
		var anchorThickness = 10;
		var connectWidth = 4;
		var connectLength = 3;
		
		spring.setRoundedCubeLength(roundedCubeLength);
		spring.setRoundedCubeWidth(roundedCubeWidth);
		spring.setRoundedCubeHeight(roundedCubeHeight);
		
		anchor.setThickness(anchorThickness);
		anchor.setConnectWidth(connectWidth);
		anchor.setConnectLength(connectLength);
		
		spring.placeWith(anchor);
	})
	
	it('anchor can only place with a spring with correct size', function() {
		var roundedCubeLength = 5;
		var roundedCubeWidth = 4;
		var roundedCubeHeight = 20;
		
		var anchorThickness = 10;
		var connectWidth = 4;
		var connectLength = 3;
		
		spring.setRoundedCubeLength(roundedCubeLength);
		spring.setRoundedCubeWidth(roundedCubeWidth);
		spring.setRoundedCubeHeight(roundedCubeHeight);
		
		anchor.setThickness(anchorThickness);
		anchor.setConnectWidth(connectWidth);
		anchor.setConnectLength(connectLength);
		
		anchor.placeWith(spring);
	})
	
	it('spring place with anchor with invalid rounded cube width', function() {
		var roundedCubeLength = 5;
		var roundedCubeWidth = 3; // NOT the same as connect Width
		var roundedCubeHeight = 20;
		
		var anchorThickness = 10;
		var connectWidth = 4;
		var connectLength = 3;
		
		var err_msg = 'Unable to place spring with the anchor: the rounded cube width is not the same as connect width';
		
		spring.setRoundedCubeLength(roundedCubeLength);
		spring.setRoundedCubeWidth(roundedCubeWidth);
		spring.setRoundedCubeHeight(roundedCubeHeight);
		
		anchor.setThickness(anchorThickness);
		anchor.setConnectWidth(connectWidth);
		anchor.setConnectLength(connectLength);
		
		(function() {
			spring.placeWith(anchor);
		}).should.throw(err_msg);
	})
	
	it('anchor place with anchor with invalid rounded cube width', function() {
		var roundedCubeLength = 5;
		var roundedCubeWidth = 3; // NOT the same as connect Width
		var roundedCubeHeight = 20;
		
		var anchorThickness = 10;
		var connectWidth = 4;
		var connectLength = 3;
		
		var err_msg = 'Unable to place anchor with the spring: the rounded cube width is not the same as connect width';
		
		spring.setRoundedCubeLength(roundedCubeLength);
		spring.setRoundedCubeWidth(roundedCubeWidth);
		spring.setRoundedCubeHeight(roundedCubeHeight);
		
		anchor.setThickness(anchorThickness);
		anchor.setConnectWidth(connectWidth);
		anchor.setConnectLength(connectLength);
		
		(function() {
			anchor.placeWith(spring);
		}).should.throw(err_msg);
	})
	
	it('spring place with anchor with invalid rounded cube height', function() {
		var roundedCubeLength = 5;
		var roundedCubeWidth = 4; 
		var roundedCubeHeight = 9; // less than anchor thickness
		
		var anchorThickness = 10;
		var connectWidth = 4;
		var connectLength = 3;
		
		var err_msg = 'Unable to place spring with the anchor: the rounded cube height less than anchor thickness';
		
		spring.setRoundedCubeLength(roundedCubeLength);
		spring.setRoundedCubeWidth(roundedCubeWidth);
		spring.setRoundedCubeHeight(roundedCubeHeight);
		
		anchor.setThickness(anchorThickness);
		anchor.setConnectWidth(connectWidth);
		anchor.setConnectLength(connectLength);
		
		(function() {
			spring.placeWith(anchor);
		}).should.throw(err_msg);
	})
	
	it('spring place with anchor with invalid rounded cube height', function() {
		var roundedCubeLength = 5;
		var roundedCubeWidth = 4; 
		var roundedCubeHeight = 9; // less than anchor thickness
		
		var anchorThickness = 10;
		var connectWidth = 4;
		var connectLength = 3;
		
		var err_msg = 'Unable to place anchor with the spring: the rounded cube height less than anchor thickness';
		
		spring.setRoundedCubeLength(roundedCubeLength);
		spring.setRoundedCubeWidth(roundedCubeWidth);
		spring.setRoundedCubeHeight(roundedCubeHeight);
		
		anchor.setThickness(anchorThickness);
		anchor.setConnectWidth(connectWidth);
		anchor.setConnectLength(connectLength);
		
		(function() {
			anchor.placeWith(spring);
		}).should.throw(err_msg);
	})
	
	it('spring cannot place with a spring', function() {
		var spring2 = new Spring();
		var err_msg = 'Spring can only place with an anchor';
		(function() {
			spring.placeWith(spring2);
		}).should.throw(err_msg);
	})
	
	it('anchor cannot place with a anchor', function() {
		var anchor2 = new Anchor();
		var err_msg = 'Anchor can only place with a spring';
		(function() {
			anchor.placeWith(anchor2);
		}).should.throw(err_msg);
	})
	
	it('spring can only place with ONLY one anchor', function() {
		test.bool(spring.isPlaceWithAnchor()).isFalse();
		
		var anchor2 = new Anchor();
		var err_msg = 'Spring already connected with another anchor';
		spring.placeWith(anchor);
		
		test.bool(spring.isPlaceWithAnchor()).isTrue();
		
		(function() {
			spring.placeWith(anchor2);
		}).should.throw(err_msg);
	})
	
	it('spring can connect to another anchor after unlink with previous anchor', function() {
		var anchor2 = new Anchor();
		spring.placeWith(anchor);
		spring.unlink();
		
		test.bool(spring.isPlaceWithAnchor()).isFalse();
		
		spring.placeWith(anchor2);
		
		test.bool(spring.isPlaceWithAnchor()).isTrue();
	})
	
	it('moving spring also moving its connected anchor', function() {
		var springInnerCylinderHeight = 10;
		var springInnerCylinderRadius = 4;
		var springRoundedCubeLength = 10;
		var springThickness = 5;
		spring.setInnerCylinderHeight(springInnerCylinderHeight);
		spring.setInnerCylinderRadius(springInnerCylinderRadius);
		spring.setRoundedCubeLength(springRoundedCubeLength);
		spring.setSpringThickness(springThickness);
		
		var anchorForkLength = 50;
		var anchorConnectorLength = 5;
		var anchorThickness = 10;
		anchor.setForkLength(anchorForkLength);
		anchor.setConnectorLength(anchorConnectorLength);
		anchor.setThickness(anchorThickness);
		
		spring.setCentre(0, 0 ,0);
		anchor.placeWith(spring);
		
		spring.setCentre(10, 20, 30);
		
		var point = spring.getCentre();
		should(point.getX().getValue()).be.equal(10);
		should(point.getY().getValue()).be.equal(20);
		should(point.getZ().getValue()).be.equal(30);
		
		var x = 10;
		var y = 20 - springInnerCylinderRadius - springRoundedCubeLength + 1 - anchorForkLength - anchorConnectorLength;
		var z = 30 + springInnerCylinderHeight - springThickness/2 - anchorThickness/2;
		point = anchor.getCentre();
		should(point.getX().getValue()).be.equal(x);
		should(point.getY().getValue()).be.equal(y);
		should(point.getZ().getValue()).be.equal(z);
	})
	
	it('anchor can only place with ONLY one spring', function() {
		test.bool(anchor.isPlaceWithSpring()).isFalse();
		
		var spring2 = new Spring();
		var err_msg = 'Anchor already connected with another spring';
		anchor.placeWith(spring);
		
		test.bool(anchor.isPlaceWithSpring()).isTrue();
		
		(function() {
			anchor.placeWith(spring2);
		}).should.throw(err_msg);
	})
	
	it('anchor can only place with ONLY one spring2', function() {
		test.bool(anchor.isPlaceWithSpring()).isFalse();
		test.bool(spring.isPlaceWithAnchor()).isFalse();
		
		var spring2 = new Spring();
		var err_msg = 'Anchor already connected with another spring';
		anchor.placeWith(spring);
		
		test.bool(anchor.isPlaceWithSpring()).isTrue();
		test.bool(spring.isPlaceWithAnchor()).isTrue();
		
		(function() {
			anchor.placeWith(spring2);
		}).should.throw(err_msg);
	})
	
	it('anchor can connect to another spring after unlink with previous spring', function() {
		var spring2 = new Spring();
		anchor.placeWith(spring);
		anchor.unlink();
		
		test.bool(anchor.isPlaceWithSpring()).isFalse();
		
		anchor.placeWith(spring2);
		
		test.bool(anchor.isPlaceWithSpring()).isTrue();
	})
	
	it('anchor can connect to another spring after unlink with previous spring', function() {
		var spring2 = new Spring();
		anchor.placeWith(spring);
		anchor.unlink();
		
		test.bool(anchor.isPlaceWithSpring()).isFalse();
		test.bool(spring.isPlaceWithAnchor()).isFalse();
		
		anchor.placeWith(spring2);
		
		test.bool(anchor.isPlaceWithSpring()).isTrue();
		test.bool(spring2.isPlaceWithAnchor()).isTrue();
		test.bool(spring.isPlaceWithAnchor()).isFalse();
	})
	
	it('moving anchor also moving its connected spring', function() {
		var springInnerCylinderHeight = 10;
		var springInnerCylinderRadius = 4;
		var springRoundedCubeLength = 10;
		var springThickness = 5;
		spring.setInnerCylinderHeight(springInnerCylinderHeight);
		spring.setInnerCylinderRadius(springInnerCylinderRadius);
		spring.setRoundedCubeLength(springRoundedCubeLength);
		spring.setSpringThickness(springThickness);
		
		var anchorForkLength = 50;
		var anchorConnectorLength = 5;
		var anchorThickness = 10;
		anchor.setForkLength(anchorForkLength);
		anchor.setConnectorLength(anchorConnectorLength);
		anchor.setThickness(anchorThickness);
		
		anchor.setCentre(0, 0 ,0);
		spring.placeWith(anchor);

		anchor.setCentre(10, 20, 30);
		
		var point = anchor.getCentre();
		should(point.getX().getValue()).be.equal(10);
		should(point.getY().getValue()).be.equal(20);
		should(point.getZ().getValue()).be.equal(30);
		
		var x = 10;
		var y = 20 + anchorForkLength + anchorConnectorLength + springInnerCylinderRadius + springRoundedCubeLength - 1;
		var z = 30 + anchorThickness/2 - springInnerCylinderHeight + springThickness/2;
		point = spring.getCentre();
		should(point.getX().getValue()).be.equal(x);
		should(point.getY().getValue()).be.equal(y);
		should(point.getZ().getValue()).be.equal(z);
	})
	
	it('moving spring also moving its connected anchor 2', function() {
		var springInnerCylinderHeight = 10;
		var springInnerCylinderRadius = 4;
		var springRoundedCubeLength = 10;
		var springThickness = 5;
		spring.setInnerCylinderHeight(springInnerCylinderHeight);
		spring.setInnerCylinderRadius(springInnerCylinderRadius);
		spring.setRoundedCubeLength(springRoundedCubeLength);
		spring.setSpringThickness(springThickness);
		
		var anchorForkLength = 50;
		var anchorConnectorLength = 5;
		var anchorThickness = 10;
		anchor.setForkLength(anchorForkLength);
		anchor.setConnectorLength(anchorConnectorLength);
		anchor.setThickness(anchorThickness);
		
		anchor.setCentre(0, 0 ,0);
		spring.placeWith(anchor);

		test.bool(anchor.isPlaceWithSpring()).isTrue();
		test.bool(spring.isPlaceWithAnchor()).isTrue();
		
		anchor.setCentre(10, 20, 30);
		
		test.bool(anchor.isPlaceWithSpring()).isTrue();
		test.bool(spring.isPlaceWithAnchor()).isTrue();
		
		spring.setCentre(10, 20, 30);
		test.bool(anchor.isPlaceWithSpring()).isTrue();
		test.bool(spring.isPlaceWithAnchor()).isTrue();
		
		var point = spring.getCentre();
		should(point.getX().getValue()).be.equal(10);
		should(point.getY().getValue()).be.equal(20);
		should(point.getZ().getValue()).be.equal(30);
		
		var x = 10;
		var y = 20 - springInnerCylinderRadius - springRoundedCubeLength + 1 - anchorForkLength - anchorConnectorLength;
		var z = 30 + springInnerCylinderHeight - springThickness/2 - anchorThickness/2;
		point = anchor.getCentre();
		should(point.getX().getValue()).be.equal(x);
		should(point.getY().getValue()).be.equal(y);
		should(point.getZ().getValue()).be.equal(z);
	})
	
	it('moving anchor also moving its connected spring 2', function() {
		var springInnerCylinderHeight = 10;
		var springInnerCylinderRadius = 4;
		var springRoundedCubeLength = 10;
		var springThickness = 5;
		spring.setInnerCylinderHeight(springInnerCylinderHeight);
		spring.setInnerCylinderRadius(springInnerCylinderRadius);
		spring.setRoundedCubeLength(springRoundedCubeLength);
		spring.setSpringThickness(springThickness);
		
		var anchorForkLength = 50;
		var anchorConnectorLength = 5;
		var anchorThickness = 10;
		anchor.setForkLength(anchorForkLength);
		anchor.setConnectorLength(anchorConnectorLength);
		anchor.setThickness(anchorThickness);
		
		spring.setCentre(0, 0 ,0);
		anchor.placeWith(spring);

		test.bool(anchor.isPlaceWithSpring()).isTrue();
		test.bool(spring.isPlaceWithAnchor()).isTrue();
		
		spring.setCentre(10, 20, 30);
		
		test.bool(anchor.isPlaceWithSpring()).isTrue();
		test.bool(spring.isPlaceWithAnchor()).isTrue();
		
		anchor.setCentre(10, 20, 30);
		
		test.bool(anchor.isPlaceWithSpring()).isTrue();
		test.bool(spring.isPlaceWithAnchor()).isTrue();
		
		var point = anchor.getCentre();
		should(point.getX().getValue()).be.equal(10);
		should(point.getY().getValue()).be.equal(20);
		should(point.getZ().getValue()).be.equal(30);
		
		var x = 10;
		var y = 20 + anchorForkLength + anchorConnectorLength + springInnerCylinderRadius + springRoundedCubeLength - 1;
		var z = 30 + anchorThickness/2 - springInnerCylinderHeight + springThickness/2;
		point = spring.getCentre();
		should(point.getX().getValue()).be.equal(x);
		should(point.getY().getValue()).be.equal(y);
		should(point.getZ().getValue()).be.equal(z);
	})
})