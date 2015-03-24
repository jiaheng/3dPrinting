var Config = require('./Config.js');
var SpecificationWriter = require('./SpecificationWriter.js').SpecificationWriter;
var MainWriter = require('./MainWriter.js').MainWriter;
var JscadCopier = require('./JscadCopier.js').JscadCopier;

module.exports.Drawer = Drawer;

function Drawer(configuration) {
	if (configuration != undefined)
		Config = configuration;

	var components = [];
	var specWriter = new SpecificationWriter(Config.specFileTarget);
	var mainWriter = new MainWriter(Config.mainFileTarget, Config.sourceDir);
	var jscadCopier = new JscadCopier(Config.targetDir, Config.sourceDir);

	this.addComponent = function(component) {
		components.push(component);
	}

	this.generateJscad = function() {
		jscadCopier.copyToTargetDir();
		specWriter.generateSpec(components);
		mainWriter.generateFile(components);
	}
	
	this.addComponentGroup = function(group) {
		group.checkCanBeDrawn();
		this.addAllComponents(group.getComponents());
		this.addAllComponents(group.getAuxillaryComponents());
	}
	
	this.addAllComponents = function(componentArray) {
		for (var i = 0; i < componentArray.length; i++) {
			this.addComponent(componentArray[i]);
		}
	}
}
