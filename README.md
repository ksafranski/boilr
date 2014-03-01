# boilr

This is an alpha project, not intended for any kind of serious use. Yet.

The basic idea is that project "profiles" are defined according to a predefined JSON schema. A boilerplate project may then be created by specifying a project profile and a target directory. For example, you might have a project profile for a node.js web server, and another for front-end HTML only.

To see a profile example, look at `boilr/profiles/default/profile.json`.

## Usage

1. Clone boilr.

```
$ cd /projects
$ git clone git@github.com:nicholascloud/boilr.git
```

2. Install as a global npm module (not available in the registry yet).

```
$ cd /projects
$ npm install -g ./boilr
```

3. Generate a project by using the default profile.

```
$ cd /projects
$ boilr ./boilr/profiles/default ./test-project
```