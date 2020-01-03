const su = require('../utilities/StringUtils')
const ou = require('../utilities/ObjectUtils')

function generate(entity, opts, defaults = { endpoint: su.dasherize(entity) + 's', color: 'color-1', plural: `${su.cammelCase(entity)}s` }) {
  opts = ou.smartCopy(opts, defaults)

  return `
(() => {
  class ${su.capitalize(entity)}Service extends BaseService {
    constructor(RESTful, $q, Message, $uibModal, AppContentService, ColorService) {
      super();
      this.RESTful = RESTful;
      this.$q = $q;
      this.Message = Message;
      this.$uibModal = $uibModal;
      this.appContent = AppContentService;
      this.color = ColorService.get();
    }

    list(query) {
      let queryString = this.getQueryString(query);

      return this.RESTful.get('${opts.endpoint}', queryString);
    }

    get(id) {
      return this.RESTful.get(\`${opts.endpoint}/$\{id}\`);
    }

    create(payload) {
      return this.RESTful.post('${opts.endpoint}', payload);
    }

    update(id, payload, inPlace = false) {
      let promise = inPlace
        ? this.RESTful.patch(\`${opts.endpoint}/\${id}\`, payload)
        : this.RESTful.put('${opts.endpoint}', payload);
      let deferred = this.$q.defer()

      promise.then((response) => {
        deferred.resolve(response);
      });

      return deferred.promise;
    }

    openCreateModal() {
      let modalInstance = this.$uibModal.open({
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        component: '${su.cammelCase(opts.plural)}New',
        keyboard: true,
        // Indicates whether the dialog should be closable by hitting the ESC key.
        backdrop: 'static',
        // Allowed values: true (default), false (no backdrop), 'static' (disables modal closing by click on the backdrop)
        size: 'compose-md',
        resolve: {}
      });

      return modalInstance.result;
    }

    // getSidebarButton() {
    //   return {
    //     title: this.appContent.get('${opts.plural.toUpperCase()}'),
    //     order: 1,
    //     icon: 'fa-book',
    //     tab: {
    //       component: '${su.cammelCase(opts.plural)}List',
    //       // icon: 'fa-book',
    //       color: this.color
    //     },
    //     color: this.color,
    //     module: '${entity}',
    //     permission: 'list'
    //   };
    // }
  }

angular.module('app').service('${su.capitalize(entity)}Service', ${su.capitalize(entity)}Service);
}) ();

  `
}

module.exports = generate;
