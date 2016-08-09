# dynamicdate

Plugin for tinymce wysiwyg HTML editor that allow to insert a dynamic date

## Development

### Setting up the development environement

### Global dependencies

1. node version >= `v0.12.7` + `npm`
1. bower
1. grunt-cli

### Local dependencies

```
export NODE_ENV=development
npm install
```

### Working on sources

> the source code is located in `src/` folder

### Build the plugin

```
grunt
```

or

```
grunt build
```

### Build the jsdoc API documentation

```
grunt jsdoc
```

### Serve the API documentation

After built the documentation, juste serve it with any staic files server.

You can use my handy automated static server :

- npm card: https://www.npmjs.com/package/autostatic-server
- github repo: https://github.com/rbecheras/node-autostatic-server

Installation:

```
$ [sudo] npm i -g autostatic-server
```

Usage (serving the documentation, your default browser will auto-start)

```
<tinymce-plugin-dynamicdate_project-path>$ autostatic --dir jsdoc/
```
