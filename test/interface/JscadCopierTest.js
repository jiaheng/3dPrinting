var test = require('unit.js');
var should = test.should;
var fs = require('fs');
var JscadCopier = require('../../src/interface/JscadCopier.js').JscadCopier;
var Config = require('../Config.js');

describe('JscadCopier', function() {
	var copier, targetPath

	beforeEach(function() {
		copier = new JscadCopier(Config.targetDir, Config.sourceDir)
		targetPath = Config.targetDir
	})

	describe('#copyJscadToTargetDirectory', function() {
		var sourceDir, sourceFiles

		beforeEach(function() {
			sourceDir = Config.sourceDir;
			sourceFiles = findAllJscadFilesIn(sourceDir);
			copier.copyToTargetDir();
		})

		function removeDirContents(directory) {
			var contents = fs.readdirSync(directory)
			contents.forEach(function(file) {
				fs.unlinkSync(directory + '/' + file)
			})
		}
		
		afterEach(function() {
			removeDirContents(Config.targetDir); // remove content test output folder
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

		it('copy jscad files from source dir into the target dir', function() {
			sourceFiles.forEach(function(file) {
				var exists = fs.existsSync(targetPath + '/' + file);
				test.bool(exists).isTrue();
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
				var exists = fs.existsSync(targetPath);
				test.bool(exists).isTrue();
			})
		})
	})
})