const su = require('../utilities/StringUtils')
const ou = require('../utilities/ObjectUtils')

function generate(entity, opts, defaults = { plural: `${su.cammelCase(entity)}s` }) {
  opts = ou.smartCopy(opts, defaults)

  return `
(() => {
  class ${su.capitalize(opts.plural)}ViewController {
    constructor(${su.capitalize(entity)}, ${su.capitalize(entity)}Service, Auth, $filter, AppContentService) {
      this.${su.capitalize(entity)} = ${su.capitalize(entity)};
      this.${su.capitalize(entity)}Service = ${su.capitalize(entity)}Service;
      this.session = Auth.getSession();
      this.$filter = $filter;
      this.appContent = AppContentService;
    }

    $onInit() {
      this.load();
    }

    load() {
      this.data = null;

      this.loadingPromise = this.${su.capitalize(entity)}Service.get(this.id).then((response) => {
        this.data = new this.${su.capitalize(entity)}(response.data);
      })
    }

    save(value, item, field) {
      return this.loadingPromise = this.${su.capitalize(entity)}Service.update(item.id, { [field]: value }, true).then((response) => {
        this.load();
      })
    }
  }

  angular.module('app').component('${su.cammelCase(opts.plural)}View', {
    templateUrl: 'views/${su.cammelCase(opts.plural)}/${su.cammelCase(opts.plural)}.view.html',
    controller: ${su.capitalize(opts.plural)}ViewController,
    bindings: {
      tabId: '@',
      parentId: '@',
      id: '@'
    }
  });
})();
  `
}

module.exports = generate;
