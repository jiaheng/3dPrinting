var test = require('unit.js');
var should = require('should');
var Config = require('../Config.js');
var SpecificationWriter = require(__dirname + '/../../src/interface/SpecificationWriter.js').SpecificationWriter;

describe('SpecificationWriter', function() {
	var specWriter;
	
	beforeEach(function() {
		specWriter = new SpecficaationWriter(Config.specFileTarger);
	})
	
	
})
