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

	this.addAllComponents = function(componentArray) {
		for (var i = 0; i < componentArray.length; i++) {
			this.addComponent(componentArray[i]);
		}
	}
	
	this.getComponents = function()	 {
		return components;
	}
	
	var checkCollision = function() {
		for (var i = 0; i < components.length - 1; i++) {
			for (var j = i + 1; j < components.length; j++) {
				if (components[i].isCollideWith(components[j]))
					// TODO: error need check
					throw new Error('Component are colliding');
			}
		}
	}
	
	this.generateJscad = function() {
		//TODO: need to fix checkCollision method
		//checkCollision();
		jscadCopier.copyToTargetDir();
		specWriter.generateSpec(components);
		mainWriter.generateFile(components);
	}
	
	/**
	 * for gear frameworks
	 * @param group
	 */
	this.addComponentGroup = function(group) {
		group.checkCanBeDrawn();
		this.addAllComponents(group.getComponents());
		this.addAllComponents(group.getAuxillaryComponents());
	}
}
