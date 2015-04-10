var fs = require('fs');

module.exports.MainWriter = MainWriter

const MAIN_METHOD = 'function main(params) {\n' +
					'\treturn Drawer.drawComponents(params)' + 
					'\n}';

const PARAMS_METHOD_START = '\nfunction getParameterDefinitions() {\n\treturn [';
const PARAMS_METHOD_END = '];\n}\n\n';
const STATIC_PARAMETER_PATH = __dirname + '/parameterDefinitions';

function MainWriter(mainPath, jscadDirectories) {

	this.generateFile = function(components) {
		var content = createContent(components);
		fs.writeFileSync(mainPath, content);
	}

	var createContent = function(components) {
		var content = generateIncludesFromJscadDirectories();
		content += createParamsMethod(components);
		content += MAIN_METHOD;
		return content;
	}

	var createParamsMethod = function(components) {
		var methodString = '';
		methodString += PARAMS_METHOD_START;
		methodString += fs.readFileSync(STATIC_PARAMETER_PATH, 'utf8');
		methodString += generateComponentSelectionParameter(components);
		methodString += PARAMS_METHOD_END;
		return methodString;
	}

	var generateComponentSelectionParameter = function(components) {
		var values = getComponentSelectionValues(components);
		var captions = getComponentSelectionCaptions(components);
		var parameter = '\t,\n' + '\t{\n' + '\t\tname: "show",\n'
				+ '\t\ttype: "choice",\n' + '\t\tvalues: [' + values + '],\n'
				+ '\t\tcaptions: [' + captions + '],\n'
				+ '\t\tcaption: "Show: ",\n' + '\t\tinitial: "All"\n' + '\t}\n';
		return parameter;
	}

	var getComponentSelectionValues = function(components) {
		var values = [ '"All"' ]; // default value
		for (var i = components.length - 1; i >= 0; i--) {
			values.push(components[i].getID());
		}
		return values;
	}

	var getComponentSelectionCaptions = function(components) {
		var captions = [ '"All"' ]; // default value
		for (var i = components.length - 1; i >= 0; i--) {
			captions.push('"Just Component ID #' + components[i].getID() + '"');
		}
		return captions;
	}

	/*
	 * Get from Daniel's code ** Dynamically includes components specified in
	 * the Configuration file into the main file.
	 */
	var generateIncludesFromJscadDirectories = function() {
		var includeString = ""
		jscadDirectories.forEach(function(directory) {
			includeString += generateIncludesFromJscadDirectory(directory)
		});
		return includeString;
	}

	var generateIncludesFromJscadDirectory = function(directory) {
		var includeString = ""
		fs.readdirSync(directory).forEach(function(file) {
			if (file.match(/\.jscad$/))
				includeString += 'include("' + file + '")\n'
		})
		return includeString;
	}
}
