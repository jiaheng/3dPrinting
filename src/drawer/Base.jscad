/**
 * Daniel's code 
 * edited by Jia Heng Eik
 * modify makeParts method to allow making base for Spring/anchor
 */
Base = function() {
};

Base.colour = [ 0.4, 0.4, 0.4 ]

Base.make = function(specification, params) {
	var parts = makeParts(specification, params)
	var base = union(parts)
	return base;
};

function makeParts(specification, params) {
	var parts = []
	var partSpecs = specification.parts
	for (var i = partSpecs.length - 1; i >= 0; i--) {
		if (partSpecs[i].height == undefined) {
			if (specification.height != undefined)
				partSpecs[i].height = specification.height;
			else
				partSpecs[i].height = specification.thickness;
		}
		parts.push(makePart(partSpecs[i], params))
	}
	;

	return parts
}

function makePart(specification, params) {
	specification.id = undefined // suppress IDs of non top-level components
	return ComponentFactory.makeComponent(specification, params)
}