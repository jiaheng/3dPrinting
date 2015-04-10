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
	var filename = Config.specFileTarget;
	var fileContent;
	
	function removeDirContents(directory) {
		var contents = fs.readdirSync(directory)
		contents.forEach(function(file) {
			fs.unlinkSync(directory + '/' + file)
		})
	}
	
	beforeEach(function() {
		specWriter = new SpecificationWriter(filename);
		spring = new Spring();
		anchor = new Anchor();
		components = [];
		components.push(spring);
		components.push(anchor);
	})
	
	afterEach(function() {
		removeDirContents(Config.targetDir); // remove content test output folder
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
		fs.exists(filename, function(exists) {
			test.bool(exists).isTrue();
		});
	})
	
	it('contains specification of both components in correct format', function() {
		var compSpec = [];
		compSpec.push(spring.toSpecification());
		compSpec.push(anchor.toSpecification());
		var expected = JSON.stringify(compSpec, null, 2);
		
		specWriter.addAllComponents(components);
		specWriter.writeSpecificationToFile();
		fs.readFile(filename, 'utf8', function (err, data) {
			  if (err) throw err;
			  data.should.containEql(expected);
		});
	})
})
