var fs = require('fs');

module.exports.JscadCopier = JscadCopier

function JscadCopier(targetDir, sourceDir) {

	if (targetDir == undefined)
		throw new Error("targetDir is undefined");
	if (sourceDir == undefined)
		throw new Error('sourceDir is undefined');

	var copyToTargetDir = function() {
		createDir();
		sourceDir.forEach(function(directory) {
			copyJscadFrom(directory);
		});
	}

	var createDir = function() {
		if (fs.existsSync(targetDir))
			removeDirContents(targetDir)
		else
			fs.mkdirSync(targetDir);
	}

	var removeDirContents = function(directory) {
		var contents = fs.readdirSync(directory)
		contents.forEach(function(file) {
			fs.unlinkSync(directory + '/' + file)
		})
	}

	var copyJscadFrom = function(sourceDir) {
		fs.readdirSync(sourceDir).forEach(function(file) {
			if (file.match(/\.jscad$/))
				copyFile(sourceDir, file);
		});
	}

	var copyFile = function(sourceDir, file) {
		var contents = fs.readFileSync(sourceDir + '/' + file);
		// contents = (sourceDir + file + '\n').concat(contents)
		// contents = SOURCE_LABEL.concat(contents)
		// contents = HEADER_COMMENT.concat(contents)
		fs.writeFileSync(targetDir + '/' + file, contents);
	}
}
