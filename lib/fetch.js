var git = require('gift');
var fse = require('fs-extra');
var tmp = '../.boilr';

var fetch = {

	type: function (profile) {
		var gitRegEx = /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

		// Check git
		if (gitRegEx.test(profile)) {
			return 'git';
		}

		// Check path
		if (profile.indexOf('/') >= 0) {
			return 'path';
		}

		// No match, check registry
		return 'reg';
	},

	clone: function (repo, cb) {
		git.clone(repo, tmp, function (err, repo) {
			if (err) {
				cb(err);
			} else {
				cb();
			}
		});
	},

	setup: function (profile) {
		var type = this.type(profile);

		if (type === 'reg') {
			// Get git-url from registry
		}



	},

	teardown: function () {
		fse.remove(tmp);
	}

};

module.exports = fetch;