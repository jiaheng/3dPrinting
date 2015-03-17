var fs = require('fs');

module.exports.SpecificationWriter = SpecificationWriter

// A header to allow OpenJSCAD to use the generated file as a library
const LIBRARY_HEADER = 'Specification = function() {};\n\n';

// A prefix to allow OpenJSCAD access to the GearSpecifications
const COMPONENT_PREFIX = 'Specification.components = ';

// A suffix to make sure that the GearSpecification array is well-formed 
//OpenJSCAD
const COMPONENT_SUFFIX = ';';

function SpecificationWriter(specFilePath) {
	var specifications = [];
 
	this.getSpecifications = function() {
		return specifications;
	}

	var addAllComponents = function(componentArray) {
		for (var i = 0; i < componentArray.length; i++) {
			specifications.push(componentArray[i].toSpecification());
		}
	}

	var writeSpecificationToFile = function() {	
		var string = LIBRARY_HEADER + COMPONENT_PREFIX;
		string += JSON.stringify(specifications, null, 2);
		string += COMPONENT_SUFFIX;
		fs.writeFileSync(specFilePath, string);
	}
  
  this.generateSpec = function(componentArray) {
    addAllComponents(componentArray);
    writeSpecificationToFile();
  }
}
