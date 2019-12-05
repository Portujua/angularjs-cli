const su = require('../utilities/StringUtils')
const ou = require('../utilities/ObjectUtils')

function generate(entity, opts, defaults = {}) {
  opts = ou.smartCopy(opts, defaults)

  return `
(() => {
  class ${su.capitalize(entity)}sNewController extends BaseController {
    constructor(${su.capitalize(entity)}Service, ${su.capitalize(entity)}, AppContentService, $scope) {
      super();
      this.${su.capitalize(entity)}Service = ${su.capitalize(entity)}Service;
      this.${su.capitalize(entity)} = ${su.capitalize(entity)};
      this.appContent = AppContentService;
      this.$scope = $scope;

      this.isBusy = false;
    }

    $onInit() {
      this.data = new this.${su.capitalize(entity)}({});
      this.load();
    }

    load() {
      //
    }

    cancel() {
      this.modalInstance.dismiss();
    }

    close() {
      this.modalInstance.close();
    }

    save() {
      this.isSaving = true;

      this.loadingPromise = this.${su.capitalize(entity)}Service.create(this.data.postPayload())
        .then((response) => {
          this.close();
        }).finally(() => {
          this.isSaving = false;
          this.isBusy = false;
        });
    }
  }

  angular.module('app').component('${entity}sNew', {
    templateUrl: 'views/${entity}s/${entity}s.new.html',
    controller: ${su.capitalize(entity)}sNewController,
    controllerAs: '$ctrl',
    bindings: {
      modalInstance: '<',
      resolve: '<'
    }
  });
})();

  `
}

module.exports = generate;
