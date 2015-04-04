var test = require('unit.js');
var should = require('should');
var Spring = require(__dirname + '/../../src/component/Spring.js').Spring;
var Anchor = require(__dirname + '/../../src/component/Anchor.js').Anchor;
// var Spindle = require(__dirname + '/../../src/component/Spindle.js').Spindle;

describe('Spring', function () {
	var spring;
	const TEST_SPRING_THICKNESS = 8;
	const TEST_SPRING_WIDTH = 2;
	const TEST_TURN = 9;
	const TEST_MAX_RADIUS = 38;
	const TEST_START_RADIUS = 12;
	const TEST_OUTER_CYLINDER_RADIUS = 17;
	const TEST_OUTER_CYLINDER_HEIGHT = 17;
	const TEST_INNER_CYLINDER_RADIUS = 12;
	const TEST_INNER_CYLINDER_HEIGHT = 32;
	const TEST_CENTRE_HOLE_RADIUS = 6;
	const TEST_ROUNDED_CUBE_HEIGHT = 22;
	const TEST_ROUNDED_CUBE_LENGTH = 6;
	const TEST_ROUNDED_CUBE_WIDTH = 5;
	
	beforeEach(function() {
		spring = new Spring();
	})
	
	describe('Testing getter/setter', function() {
		it('get type name', function() {
			var typeName = 'Spring';
			should(spring.getTypeName()).be.equal(typeName);
		})
		
		it('set spring thickness', function() {
			spring.setSpringThickness(TEST_SPRING_THICKNESS);
			should(spring.getSpringThickness()).be.equal(TEST_SPRING_THICKNESS);
		})
		
		it('set spring width', function() {
			spring.setSpringWidth(TEST_SPRING_WIDTH);
			should(spring.getSpringWidth()).be.equal(TEST_SPRING_WIDTH);
		})
		
		it('set turn', function() {
			spring.setTurn(TEST_TURN);
			should(spring.getTurn()).be.equal(TEST_TURN);
		})
		
		it('set max radius', function() {
			spring.setMaxRadius(TEST_MAX_RADIUS);
			should(spring.getMaxRadius()).be.equal(TEST_MAX_RADIUS);
		})
		
		it('set outer cylinder radius', function() {
			spring.setOuterCylinderRadius(TEST_OUTER_CYLINDER_RADIUS);
			should(spring.getOuterCylinderRadius()).be.equal(TEST_OUTER_CYLINDER_RADIUS);
		})
		
		it('set outer cylinder height', function() {
			spring.setOuterCylinderHeight(TEST_OUTER_CYLINDER_HEIGHT);
			should(spring.getOuterCylinderHeight()).be.equal(TEST_OUTER_CYLINDER_HEIGHT);
		})
		
		it('set inner cylinder radius', function() {
			spring.setInnerCylinderRadius(TEST_INNER_CYLINDER_RADIUS);
			should(spring.getInnerCylinderRadius()).be.equal(TEST_INNER_CYLINDER_RADIUS);
		})
		
		it('set inner cylinder height', function() {
			spring.setInnerCylinderHeight(TEST_INNER_CYLINDER_HEIGHT);
			should(spring.getInnerCylinderHeight()).be.equal(TEST_INNER_CYLINDER_HEIGHT);
		})
		
		it('set centre hole radius', function() {
			spring.setCentreHoleRadius(TEST_CENTRE_HOLE_RADIUS);
			should(spring.getCentreHoleRadius()).be.equal(TEST_CENTRE_HOLE_RADIUS);
		})
		
		it('set rounded cube height', function() {
			spring.setRoundedCubeHeight(TEST_ROUNDED_CUBE_HEIGHT);
			should(spring.getRoundedCubeHeight()).be.equal(TEST_ROUNDED_CUBE_HEIGHT);
		})
		
		it('set rounded cube length', function() {
			spring.setRoundedCubeLength(TEST_ROUNDED_CUBE_LENGTH);
			should(spring.getRoundedCubeLength()).be.equal(TEST_ROUNDED_CUBE_LENGTH);
		})
		
		it('set rounded cube width', function() {
			spring.setRoundedCubeWidth(TEST_ROUNDED_CUBE_WIDTH);
			should(spring.getRoundedCubeWidth()).be.equal(TEST_ROUNDED_CUBE_WIDTH);
		})
	})
	
	describe('Test constraints and placement method', function() {
		beforeEach(function() {
			spring = new Spring();
		})
		
		it('rounded cube height should be less than inner cylinder height', function() {
			var roundedCubeHeight = TEST_ROUNDED_CUBE_HEIGHT;
			var innerCylinderHeight = TEST_ROUNDED_CUBE_HEIGHT - 1;
			var err_msg = 'Rounded cube height should be less than inner cylinder height';
			spring.setRoundedCubeHeight(roundedCubeHeight);
			spring.setInnerCylinderHeight(innerCylinderHeight);
			(function() {
				spring.toSpecification();
			}).should.throw(err_msg);
		})
		
		it('outer cylinder radius should be more than inner cylinder radius', function() {
			var outer = TEST_OUTER_CYLINDER_RADIUS; 
			var inner = TEST_OUTER_CYLINDER_RADIUS + 2; // bigger value
			var err_msg = 'Outer cylinder radius should be more than inner cylinder radius';
			spring.setInnerCylinderRadius(inner);
			spring.setOuterCylinderRadius(outer);
			(function() {
				spring.toSpecification();
			}).should.throw(err_msg);
		})
		
		it('outer cylinder height should be less than inner cylinder height', function() {
			var outer = TEST_INNER_CYLINDER_HEIGHT + 3; // bigger value
			var inner = TEST_INNER_CYLINDER_HEIGHT; 
			var err_msg = 'Outer cylinder height should be less than inner cylinder height';
			spring.setInnerCylinderHeight(inner);
			spring.setOuterCylinderHeight(outer);
			(function() {
				spring.toSpecification();
			}).should.throw(err_msg);
		})
		
		it('height is same as inner cylinder height', function() {
			spring.setInnerCylinderHeight(TEST_INNER_CYLINDER_HEIGHT);
			should(spring.getHeight()).be.equal(TEST_INNER_CYLINDER_HEIGHT);
		})
		
		it('outer cylinder radius is 1 unit(mm) more than start radius', function() {
			spring.setOuterCylinderRadius(TEST_OUTER_CYLINDER_RADIUS);
			should(spring.getStartRadius()).be.equal(TEST_OUTER_CYLINDER_RADIUS - 1);
		})
		
		it('centre hole should smaller than inner cylinder radius', function() {
			spring.setInnerCylinderRadius(TEST_INNER_CYLINDER_RADIUS);
			spring.setCentreHoleRadius(TEST_INNER_CYLINDER_RADIUS+1);
			var err_msg = 'Centre hole should be smaller than inner cylinder radius';
			(function() {
				spring.toSpecification()
			}).should.throw(err_msg);
		})
		
		it('max radius should larger than outer cylinder radius', function() {
			spring.setMaxRadius(TEST_MAX_RADIUS);
			spring.setOuterCylinderRadius(TEST_MAX_RADIUS + 1);
			var err_msg = 'Max radius should larger than outer cylinder radius';
			(function() {
				spring.toSpecification();
			}).should.throw(err_msg);
		})
		
		it('spring thickness should be more than zero', function() {
			var err_msg = 'Spring thickness must be more than zero';
			spring.setSpringThickness(-1);
			(function() {
				spring.toSpecification();
			}).should.throw(err_msg);
		})
		
		it('spring width should be more than zero', function() {
			var err_msg = 'Spring width must be more than zero';
			spring.setSpringWidth(-1);
			(function() {
				spring.toSpecification();
			}).should.throw(err_msg);
		})
		
		it('turn should be more than zero', function() {
			var err_msg = 'Number of turn must be more than zero';
			spring.setTurn(-1);
			(function() {
				spring.toSpecification();
			}).should.throw(err_msg);
		})
		
		it('max radius should be more than zero', function() {
			var err_msg = 'Max radius must be more than zero';
			spring.setMaxRadius(-1);
			(function() {
				spring.toSpecification();
			}).should.throw(err_msg);
		})
		
		it('outer cylinder radius should be more than zero', function() {
			var err_msg = 'Outer cylinder radius must be more than zero';
			spring.setOuterCylinderRadius(-1);
			(function() {
				spring.toSpecification();
			}).should.throw(err_msg);
		})
		
		it('outer cylinder height should be more than zero', function() {
			var err_msg = 'Outer cylinder height must be more than zero';
			spring.setOuterCylinderHeight(-1);
			(function() {
				spring.toSpecification();
			}).should.throw(err_msg);
		})
		
		it('inner cylinder radius should be more than zero', function() {
			var err_msg = 'Inner cylinder radius must be more than zero';
			spring.setInnerCylinderRadius(-1);
			(function() {
				spring.toSpecification();
			}).should.throw(err_msg);
		})
		
		it('inner cylinder height should be more than zero', function() {
			var err_msg = 'Inner cylinder height must be more than zero';
			spring.setInnerCylinderHeight(-1);
			(function() {
				spring.toSpecification();
			}).should.throw(err_msg);
		})
		
		it('centre hole radius should be more than zero', function() {
			var err_msg = 'Centre hole radius must be more than zero';
			spring.setCentreHoleRadius(-1);
			(function() {
				spring.toSpecification();
			}).should.throw(err_msg);
		})
		
		it('rounded cube height should be more than zero', function() {
			var err_msg = 'Rounded cube height must be more than zero';
			spring.setRoundedCubeHeight(-1);
			(function() {
				spring.toSpecification();
			}).should.throw(err_msg);
		})
		
		it('rounded cube length should be more than zero', function() {
			var err_msg = 'Rounded cube length must be more than zero';
			spring.setRoundedCubeLength(-1);
			(function() {
				spring.toSpecification();
			}).should.throw(err_msg);
		})
		
		it('rounded cube width should be more than zero', function() {
			var err_msg = 'Rounded cube width must be more than zero';
			spring.setRoundedCubeWidth(-1);
			(function() {
				spring.toSpecification();
			}).should.throw(err_msg);
		})
		
		it('test connecting point coordinate', function() {
			var height = TEST_INNER_CYLINDER_HEIGHT;
			spring.setInnerCylinderHeight(TEST_INNER_CYLINDER_HEIGHT);
			spring.setRoundedCubeLength(TEST_ROUNDED_CUBE_LENGTH);
			spring.setSpringThickness(TEST_SPRING_THICKNESS);
			spring.setInnerCylinderRadius(TEST_INNER_CYLINDER_RADIUS);
			spring.setCentre(0, 0, 0);
			
			var x = 0;
			var y = 0 - TEST_INNER_CYLINDER_RADIUS - TEST_ROUNDED_CUBE_LENGTH + 1;
			var z = 0 + height - TEST_SPRING_THICKNESS/2;
			var point = spring.getConnectPoint();
			should(point.getX().getValue()).be.equal(x);
			should(point.getY().getValue()).be.equal(y);
			should(point.getZ().getValue()).be.equal(z);
		})
		
		it('test base coordinate', function() {
			spring.setSpringThickness(TEST_SPRING_THICKNESS);
			spring.setCentre(0,0,0);
			var x = 0;
			var y = 0;
			var z = 0 - TEST_SPRING_THICKNESS/2;
			var point = spring.getBaseCoor();
			should(point.getX().getValue()).be.equal(x);
			should(point.getY().getValue()).be.equal(y);
			should(point.getZ().getValue()).be.equal(z);
		})
	})
	
	describe('Test create Spindle', function() {
		beforeEach(function() {
			spring = new Spring();
		})
		
		it('spindle height should be equal to spring height', function() {
			var spindle;
			var height = 30;
			spring.setInnerCylinderHeight(height); // height is the same as inner cylinder height
			spindle = spring.getSpindle();
			should(spindle.getHeight()).be.equal(height);
		})
		
		it('spindle radius should be equal to spring centre hole radius', function() {
			var spindle;
			var radius = 5;
			spring.setCentreHoleRadius(radius);
			spindle = spring.getSpindle();
			should(spindle.getRadius()).be.equal(radius);
		})
	})
	
	
})