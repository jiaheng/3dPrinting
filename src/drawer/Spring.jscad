include("Spiral.jscad");
include("Circle.jscad");
include("Rectangle.jscad");
include("Utils.jscad");

Spring = function() {
};

Spring.colour = [ 0.9, 0.4, 0.4 ]

Spring.make = function(specification, params) {
	var spring;
	
	// make spiral spring
	var spiralSpec = {};
	spiralSpec.thickness = specification.springThickness;
	spiralSpec.width = specification.springWidth;
	spiralSpec.turn = specification.turn;
	spiralSpec.startRadius = specification.startRadius;
	spiralSpec.maxRadius = specification.maxRadius;
	var spiral = Spiral.make(spiralSpec, params);

	var cylinderSpec = {};
	var cylinder;
	var cubeSpec = {};
	var cube;

	// make outer cylinder
	cylinderSpec.height = specification.outerCylinderHeight;
	cylinderSpec.radius = specification.outerCylinderRadius;
	cylinder = Circle.make(cylinderSpec, params);
	cylinder = cylinder.translate([ 0, 0,
			(cylinderSpec.height - specification.springThickness) / 2 ]);
	spring = spiral.union(cylinder);

	// make inner cylider
	cylinderSpec.height = specification.innerCylinderHeight;
	cylinderSpec.radius = specification.innerCylinderRadius;
	cylinder = Circle.make(cylinderSpec, params);
	cylinder = cylinder.translate([ 0, 0,
			(cylinderSpec.height - specification.springThickness) / 2 ]);
	spring = spring.union(cylinder);

	// make rounded cube for connecting anchor
	var connect;
	cubeSpec.length = specification.roundedCubeLength
			+ specification.innerCylinderRadius;
	cubeSpec.width = specification.roundedCubeWidth;
	cubeSpec.height = specification.roundedCubeHeight;
	cube = Rectangle.make(cubeSpec, params);
	// rounded cube on one side of the rectangle
	cylinderSpec.height = specification.roundedCubeHeight;
	cylinderSpec.radius = specification.roundedCubeWidth / 2;
	cylinder = Circle.make(cylinderSpec, params);
	cylinder = cylinder.translate([ cubeSpec.length / 2, 0, 0 ]);
	connect = cube.union(cylinder);
	connect = connect
			.rotateZ(-90)
			.translate(
					[
							0,
							-cubeSpec.length / 2,
							specification.height
									- (specification.roundedCubeHeight + specification.springThickness)
									/ 2 ]);
	spring = spring.union(connect);
	spring = Utils.removeCentreHole(spring, specification, params);

	return spring;
};

