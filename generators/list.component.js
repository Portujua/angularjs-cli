const su = require('../utilities/StringUtils')
const ou = require('../utilities/ObjectUtils')

function generate(entity, opts, defaults = {}) {
  opts = ou.smartCopy(opts, defaults)

  return `
(() => {
  class ${su.capitalize(entity)}sListController extends BaseController {
    constructor(${su.capitalize(entity)}Service, Auth, NgTableParams, AppContentService, ${su.capitalize(entity)}) {
      super();
      this.${su.capitalize(entity)}Service = ${su.capitalize(entity)}Service;
      this.session = Auth.getSession();
      this.NgTableParams = NgTableParams;
      this.appContent = AppContentService;
      this.${su.capitalize(entity)} = ${su.capitalize(entity)};
    }

    $onInit() {
      this.load();
    }

    load(keyword = '') {
      this.tableParams = new this.NgTableParams({}, {
        getData: (params) => {
          this.count = params.count() * (params.page() - 1);

          // Query strings
          let query = {
            sort: params.orderBy(),
            page: params.page(),
            size: params.count(),
            filter: params.filter(),
            keyword
          };

          return this.loadingPromise = this.${su.capitalize(entity)}Service.list(query)
            .then((response) => {
              // Setting the total of records
              params.total(response.data.totalElements);
              // returning list
              return response.data.content;
            });
        }
      });
    }

    create() {
      this.${su.capitalize(entity)}Service.openCreateModal()
        .then((response) => {
          this.load();
        }, () => {
        });
    }
  }

  angular.module('app').component('${entity}sList', {
    templateUrl: 'views/${entity}s/${entity}s.list.html',
    controller: ${su.capitalize(entity)}sListController,
    bindings: {
      tabId: '@'
    }
  });
})();
  `
}

module.exports = generate;
