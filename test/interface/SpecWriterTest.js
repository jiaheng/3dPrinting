var test = require('unit.js');
var should = require('should');
var fs = require('fs');
var Config = require('../Config.js');
var SpecificationWriter = require(__dirname + '/../../src/interface/SpecificationWriter.js').SpecificationWriter;
var Spring = require(__dirname + '/../../src/component/Spring.js').Spring;
var Anchor = require(__dirname + '/../../src/component/Anchor.js').Anchor;

describe('SpecificationWriter', function() {
	var specWriter;
	var spring;
	var anchor;
	var components;
	
	beforeEach(function() {
		specWriter = new SpecificationWriter(Config.specFileTarget);
		spring = new Spring();
		anchor = new Anchor();
		components = [];
		components.push(spring);
		components.push(anchor);
	})
	
	it('add component specification', function() {
		var spec;
		specWriter.addAllComponents(components);
		spec = specWriter.getSpecifications();
		spec.should.containEql(spring.toSpecification());
		spec.should.containEql(anchor.toSpecification());
	})
	
	it('write specification to target file', function()	{
		specWriter.addAllComponents(components);
		specWriter.writeSpecificationToFile();
		fs.exists(Config.specFileTarget, function(exists) {
			test.bool(exists).isTrue();
		});
	})
})
