const su = require('../utilities/StringUtils')
const ou = require('../utilities/ObjectUtils')

function generate(entity, opts, defaults = {}) {
  opts = ou.smartCopy(opts, defaults)

  return `
(() => {
  class ${su.capitalize(entity)}sViewController {
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

  angular.module('app').component('${entity}sView', {
    templateUrl: 'views/${entity}s/${entity}s.view.html',
    controller: ${su.capitalize(entity)}sViewController,
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
