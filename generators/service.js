const su = require('../utilities/StringUtils')
const ou = require('../utilities/ObjectUtils')

function generate(entity, opts, defaults = { endpoint: su.dasherize(entity) + 's', color: 'color-1' }) {
  opts = ou.smartCopy(opts, defaults)

  return `
(() => {
  class ${su.capitalize(entity)}Service extends BaseService {
    constructor(RESTful, $q, Message, $uibModal, AppContentService) {
      super();
      this.RESTful = RESTful;
      this.$q = $q;
      this.Message = Message;
      this.$uibModal = $uibModal;
      this.appContent = AppContentService;
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
        component: '${entity}sNew',
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
    //     title: this.appContent.get('${entity.toUpperCase()}'),
    //     order: 1,
    //     icon: 'fa-book',
    //     tab: {
    //       component: '${entity}sList',
    //       // icon: 'fa-book',
    //       color: '${opts.color}'
    //     },
    //     color: '${opts.color}',
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
