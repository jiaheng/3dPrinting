include("Spiral.jscad");
include("Circle.jscad");
include("Rectangle.jscad");
include("Utils.jscad");

Spring = function() {
};

Spring.make = function(specification, params) {
	var spring;
	var spiral = Spiral.make(specification, params);

	var cylinderSpec = {};
	var cylinder;
	var cubeSpec = {};
	var cube;

	// make outer cylinder
	cylinderSpec.height = specification.outerCylinderHeight;
	cylinderSpec.radius = specification.outerCylinderRadius;
	cylinder = Circle.make(cylinderSpec, params);
	cylinder = cylinder.translate([ 0, 0,
			(cylinderSpec.height - specification.thickness) / 2 ]);
	spring = spiral.union(cylinder);

	// make inner cylider
	cylinderSpec.height = specification.innerCylinderHeight;
	cylinderSpec.radius = specification.innerCylinderRadius;
	cylinder = Circle.make(cylinderSpec, params);
	cylinder = cylinder.translate([ 0, 0,
			(cylinderSpec.height - specification.thickness) / 2 ]);
	spring = spring.union(cylinder);

	// make rounded cube for connecting anchor
	var connect;
	cubeSpec.length = specification.roundedCubeLength + specification.innerCylinderRadius;
	cubeSpec.width = specification.roundedCubeWidth;
	cubeSpec.height = specification.roundedCubeHeight;
	cube = Rectangle.make(cubeSpec, params);
	// rounded cube on one side of the rectangle
	cylinderSpec.height = specification.roundedCubeHeight;
	cylinderSpec.radius = specification.roundedCubeWidth / 2;
	cylinder = Circle.make(cylinderSpec, params);
	cylinder = cylinder
			.translate([ cubeSpec.length / 2, 0, 0 ]);
	connect = cube.union(cylinder);
	connect = connect
			.rotateZ(-90)
			.translate([0,
						-cubeSpec.length/2,
						specification.height - (specification.roundedCubeHeight + specification.thickness)/ 2 ]);
	spring = spring.union(connect);
	/*
	 * No longer needed cubeSpec.length = specification.roundedCubeLength;
	 * cubeSpec.width = specification.roundedCubeWidth; cubeSpec.height =
	 * specification.roundedCubeHeight; cube = Rectangle.make(cubeSpec, params);
	 * cube = cube.rotateZ(90); cube = cube.translate([0,
	 * -specification.roundedCubeLength/2, specification.height -
	 * (specification.roundedCubeHeight+specification.thickness)/2]);
	 * 
	 * spring = spring.union(cube); // rounded cube on one side of the rectangle
	 * cylinder = CSG.cylinder({ start: [0, -specification.roundedCubeLength,
	 * specification.innerCylinderHeight - specification.thickness/2], end: [0,
	 * -specification.roundedCubeLength, specification.innerCylinderHeight -
	 * specification.thickness/2 - specification.roundedCubeHeight], radius:
	 * specification.roundedCubeWidth/2, resolution: params.circleRes }); spring =
	 * spring.union(cylinder);
	 */
	spring = Utils.removeCentreHole(spring, specification, params);

	return spring;
};

/*
 * No longer needed function removeCentreHole(spring, specification, params) {
 * if(specification.centreHoleRadius > 0) { var spec = {}; spec.radius =
 * specification.centreHoleRadius; spec.height = specification.height*2; var
 * centerHole = Circle.make(spec, params); spring = spring.subtract(centerHole); }
 * return spring; };
 */

