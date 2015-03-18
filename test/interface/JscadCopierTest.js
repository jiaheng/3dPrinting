var test = require('unit.js');
var should = test.should;
var fs = require('fs');
var JscadCopier = require('../../src/interface/JscadCopier.js').JscadCopier;
var Config = require('../Config.js');

describe('JscadCopier', function() {
	var copier, targetPath

	beforeEach(function() {
		copier = new JscadCopier(Config.targetDirectory,
			                                 Config.sourceDirectories) 
		targetPath = Config.targetDirectory
	})

	describe('#copyJscadToTargetDirectory', function() {
		var sourceDirectories, sourceFiles

		beforeEach(function() {
			sourceDirectories = Config.sourceDirectories; 
			sourceFiles = findAllJscadFilesIn(sourceDirectories);
			copier.copyToTargetDir();
		})

		function findAllJscadFilesIn(directories) {
			var sourceFiles = []
			directories.forEach(function(directory) {
				fs.readdirSync(directory).forEach(function(file) {
					if (file.match(/\.jscad$/))
						sourceFiles.push(file)
				})
			})
			return sourceFiles
		}

		it('should copy all the files in the source directories into the target '
			 + 'directory', function() {
			sourceFiles.forEach(function(file) {
				fs.existsSync(targetPath + '/' + file).should.be.true;
			})
		})	

		describe('when the target directory doesn\'t exist', function() {
			beforeEach(function() {
				if (fs.existsSync(targetPath))
					removeDirectoryAndContents(targetPath)
				copier.copyToTargetDir()
			})

			function removeDirectoryAndContents(directory) {
				fs.readdirSync(directory).forEach(function(file) {
					fs.unlinkSync(directory + '/' + file)
				})
			}

			it('should ensure the target directory exists', function() {
				fs.existsSync(targetPath).should.be.true
			})		
		})
	})
})