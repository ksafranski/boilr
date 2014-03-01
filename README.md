# boilr

This is an alpha project, not intended for any kind of serious use. Yet.

The basic idea is that project "profiles" are defined according to a predefined JSON schema. A boilerplate project may then be created by specifying a project profile and a target directory. For example, you might have a project profile for a node.js web server, and another for front-end HTML only.

To see a profile example, look at `profiles/default/profile.json`.

## Usage

a) Clone boilr.

```
$ cd /projects
$ git clone git@github.com:nicholascloud/boilr.git
```

b) Install as a global npm module (not available in the registry yet).

```
$ cd /projects
$ npm install -g ./boilr
```

c) Generate a project by using the default profile.

```
$ cd /projects
$ boilr ./boilr/profiles/default ./test-project
```

## The profile.json file

A project profile is just a JSON file with a few properties.

`paths : Array<String>`

This is an array of paths that will be created in your project. Note that paths are created with the `-p` flag, so intermediate directories are created as required.

`files: Object<String, String>`

The files hash is a set of key/value pairs, where the key represents the source path of a file _relative to the location of profile.json_ and the value represents the destination path where the file will be copied _relative to the project output directory_.

`scripts : Array<String>`

The scripts property is a simple array of (terminal) commands that will be executed in the project directory after the directories are created and the files have been copied.

`links : Object<String, String>`

__NOT CURRENTLY USED__