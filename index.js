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
const FactorySpecGenerator = require('./generators/factory.spec')
const ServiceSpecGenerator = require('./generators/service.spec')
const ListComponentSpecGenerator = require('./generators/list.component.spec')
const NewComponentSpecGenerator = require('./generators/new.component.spec')
const ViewComponentSpecGenerator = require('./generators/view.component.spec')

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
const plural = argv.plural || `${entity}s`;
const endpoint = argv.endpoint || StringUtils.dasherize(plural);

const fileNames = {
  factory: `${entity}.factory.js`,
  service: `${entity}.service.js`,
  list: {
    html: `${StringUtils.cammelCase(plural)}.list.html`,
    component: `${StringUtils.cammelCase(plural)}.list.component.js`,
  },
  new: {
    html: `${StringUtils.cammelCase(plural)}.new.html`,
    component: `${StringUtils.cammelCase(plural)}.new.component.js`,
  },
  view: {
    html: `${StringUtils.cammelCase(plural)}.view.html`,
    component: `${StringUtils.cammelCase(plural)}.view.component.js`,
  },
  specs: {
    factory: `${entity}.factory.spec.js`,
    service: `${entity}.service.spec.js`,
    list: `${StringUtils.cammelCase(plural)}.list.component.spec.js`,
    new: `${StringUtils.cammelCase(plural)}.new.component.spec.js`,
    view: `${StringUtils.cammelCase(plural)}.view.component.spec.js`
  }
}

// Javascript files
FileSystem.saveToFile(FactoryGenerator(entity, { fields }), `${outputFolder}${fileNames.factory}`);
FileSystem.saveToFile(ServiceGenerator(entity, { endpoint, plural }), `${outputFolder}${fileNames.service}`);
FileSystem.saveToFile(ListComponentGenerator(entity, { plural }), `${outputFolder}${fileNames.list.component}`)
FileSystem.saveToFile(NewComponentGenerator(entity, { plural }), `${outputFolder}${fileNames.new.component}`)
FileSystem.saveToFile(ViewComponentGenerator(entity, { plural }), `${outputFolder}${fileNames.view.component}`)
FileSystem.saveToFile(FactorySpecGenerator(entity, {}), `${outputFolder}${fileNames.specs.factory}`)
FileSystem.saveToFile(ServiceSpecGenerator(entity, { endpoint }), `${outputFolder}${fileNames.specs.service}`)
FileSystem.saveToFile(ListComponentSpecGenerator(entity, { endpoint, plural }), `${outputFolder}${fileNames.specs.list}`)
FileSystem.saveToFile(NewComponentSpecGenerator(entity, { endpoint, plural }), `${outputFolder}${fileNames.specs.new}`)
FileSystem.saveToFile(ViewComponentSpecGenerator(entity, { endpoint, plural }), `${outputFolder}${fileNames.specs.view}`)

// Html Files
FileSystem.saveToFile(ListHtmlGenerator(entity, { permission, color }), `${outputFolder}${fileNames.list.html}`)
FileSystem.saveToFile(NewHtmlGenerator(entity, {}), `${outputFolder}${fileNames.new.html}`)
FileSystem.saveToFile(ViewHtmlGenerator(entity, { permission, fields }), `${outputFolder}${fileNames.view.html}`)
