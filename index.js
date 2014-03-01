#!/usr/bin/env node
'use strict';
require('colors');
var shell = require('shelljs'),
	path = require('path'),
	fs = require('fs'),
	fetch = require('./lib/fetch.js');

if (process.argv.length < 4) {
	console.info('usage: boilr [profile] [project-dir]');
	process.exit(0);
}

var profile = path.resolve(process.argv[2]);

// Setup the profile
var profileFile = fetch.setup(profile);

if (fs.statSync(profileFile).isDirectory()) {
	profileFile = path.join(profileFile, 'profile.json');
}

var profileDir = path.dirname(profileFile),
	projectDir = path.resolve(process.argv[3]);

console.info('★ profile file: %1'.replace('%1', profileFile).green);
console.info('★ profile dir:  %1'.replace('%1', profileDir).green);
console.info('★ project dir:  %1'.replace('%1', projectDir).green);

fs.readFile(profileFile, function (err, content) {
	if (err) {
		console.error(err.toString().red);
		return process.exit(1);
	}

	var profile;
	try {
		profile = JSON.parse(content);
	} catch (e) {
		err = e;
	}

	if (err) {
		console.error(err.toString().red);
		return process.exit(1);
	}

	shell.mkdir('-p', projectDir);

	console.info('★ creating project paths'.green);
	profile.paths.forEach(function (dirPath) {
		var realPath = path.join(projectDir, dirPath);
		shell.mkdir('-p', realPath);
	});

	console.info('★ copying project files'.green);
	Object.keys(profile.files).forEach(function (localFile) {
		var absProfileFile = path.join(profileDir, localFile);
		var absProjFile = path.join(projectDir, profile.files[localFile]);
		shell.cp(absProfileFile, absProjFile);
	});

	if (profile.scripts) {
		console.info('★ executing scripts'.green);
		profile.scripts.forEach(function (script) {
			shell.cd(projectDir);
			console.info('★ running %1'.replace('%1', script).yellow);
			var result = shell.exec(script);
			if (result.code !== 0) {
				console.error(result.output.red);
				process.exit(result.code);
			}
		});
	}

	if (profile.links) {
		console.info('★ creating links'.green);
		Object.keys(profile.links).forEach(function (source) {
			//shell.cd(projectDir);
			//var dest = path.join(projectDir, profile.links[source]);
			//console.info('★ linking %1 => %2'.replace('%1', source).replace('%2', dest).yellow);
			// bug in shelljs https://github.com/arturadib/shelljs/issues/106
			//shell.ln('-s', source, dest);
		});
	}

	console.info('★ done');
	process.exit(0);
});