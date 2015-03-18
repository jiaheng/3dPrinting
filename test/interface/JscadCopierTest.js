var test = require('unit.js')
var fs = require('fs')
var JscadCopier = require('../../src/interface/JscadCopier.js').JscadCopier
var Config = require('../Config.js')

describe('JscadCopier', function() {
	var copier, targetPath

	beforeEach(function() {
		copier = new JscadCopier(Config.targetDirectory,
			                                 Config.sourceDirectories) 
		targetPath = Config.targetDirectory
	})
	
	describe('#createTargetDirectory', function() {
		describe('the target directory', function() {			

			beforeEach(function() {
				copier.createDir()
			})
			
			it('should exist', function() {
				fs.existsSync(targetPath).test.should.be.true;
			})

			describe('if the target directory was not empty', function() {
				beforeEach(function() {
					fs.writeFileSync(targetPath + '/test.txt', 'this should be deleted') 
					copier.createTargetDirectory()
				})
				
				it('should empty the target directory', function() {
					fs.readdirSync(targetPath).length.test.should.equal(0)
				})
			})
		})
	})

	describe('#copyComponentsToTargetDirectory', function() {
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
				fs.existsSync(targetPath + '/' + file).test.should.be.true;
			})
		})	

		describe('the copied files', function() {
			var copiedFiles

			beforeEach(function() {
				copiedFiles = findAllJscadFilesIn([targetPath]) 
			})

			it('should have a header explaining that the files are copied',
			   function() {
			  var header = "[COPIED VERSION OF FILE]"
				copiedFiles.forEach(function(file) {
					var contents = fs.readFileSync(targetPath + '/' + file)
					contents = "" + contents // force cast to string
					contents.test.should.contain(header)
				})
			})

			it('should state the file\'s original location', function() {
				copiedFiles.forEach(function(copied) {
					sourceDirectories.forEach(function(sourceDirectory) {
						var files = findAllJscadFilesIn([sourceDirectory])
						files.forEach(function(source) {
							if (source == copied) {
								var contents = fs.readFileSync(targetPath + '/' + copied)
								contents = "" + contents // force cast to string
								contents.test.should.containEql("Source: " + sourceDirectory + source)
							}
						})
					})					
				})
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
				fs.existsSync(targetPath).test.should.be.true
			})		
		})
	})
})