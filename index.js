const _ = require('underscore')
const argv = require('yargs').argv
const FileSystem = require('./utilities/FileSystem')
const StringUtils = require('./utilities/StringUtils')

// Generators
const FactoryGenerator = require('./generators/factory')
const ServiceGenerator = require('./generators/service')
const ListHtmlGenerator = require('./generators/list.html')
const NewHtmlGenerator = require('./generators/new.html')
const ViewHtmlGenerator = require('./generators/view.html')
const ListComponentGenerator = require('./generators/list.component')
const NewComponentGenerator = require('./generators/new.component')
const ViewComponentGenerator = require('./generators/view.component')

const outputFolder = 'output/';

if (argv.params) {
  console.log(`List of parameters:
- entity : The entity name. Should be in Capitalized cammel case
- fields : List of fields comma separated
            (default: [])
- permission : The permission entity
            (default: cammelCase(entity))
- color : The color for tabs
            (default: color-1)
- endpoint : REST API service endpoint
            (default: cammelCase(entity))`)
  return;
}

if (_.isUndefined(argv.entity)) {
  console.error('You must specify the entity name.')
  return;
}

const entity = StringUtils.cammelCase(argv.entity);
const fields = argv.fields ? argv.fields.split(',') : [];
const permission = argv.permission || entity;
const color = argv.color;
const endpoint = argv.endpoint || StringUtils.dasherize(entity) + 's';

const fileNames = {
  factory: `${entity}.factory.js`,
  service: `${entity}.service.js`,
  list: {
    html: `${entity}.list.html`,
    component: `${entity}.list.component.js`,
  },
  new: {
    html: `${entity}.new.html`,
    component: `${entity}.new.component.js`,
  },
  view: {
    html: `${entity}.view.html`,
    component: `${entity}.view.component.js`,
  },
}

// Javascript files
FileSystem.saveToFile(FactoryGenerator(entity, { fields }), `${outputFolder}${fileNames.factory}`);
FileSystem.saveToFile(ServiceGenerator(entity, { endpoint }), `${outputFolder}${fileNames.service}`);
FileSystem.saveToFile(ListComponentGenerator(entity, {}), `${outputFolder}${fileNames.list.component}`)
FileSystem.saveToFile(NewComponentGenerator(entity, {}), `${outputFolder}${fileNames.new.component}`)
FileSystem.saveToFile(ViewComponentGenerator(entity, {}), `${outputFolder}${fileNames.view.component}`)

// Html Files
FileSystem.saveToFile(ListHtmlGenerator(entity, { permission, color }), `${outputFolder}${fileNames.list.html}`)
FileSystem.saveToFile(NewHtmlGenerator(entity, {}), `${outputFolder}${fileNames.new.html}`)
FileSystem.saveToFile(ViewHtmlGenerator(entity, { permission, fields }), `${outputFolder}${fileNames.view.html}`)
