const su = require('../utilities/StringUtils')
const ou = require('../utilities/ObjectUtils')

function generate(entity, opts, defaults = { permission: su.cammelCase(entity), color: 'color-1' }) {
  opts = ou.smartCopy(opts, defaults)

  return `
<table-actions button-settings="{ create: true }"
               on-refresh="$ctrl.load()"
               on-create="$ctrl.create()"
               on-search="$ctrl.load(query)"
               filter-toggle-value="$ctrl.filters"
               avoid-create="!$ctrl.session.can('${opts.permission}', 'create')"></table-actions>

<div class="table-frame">
  <div class="table-responsive"
       cg-busy="$ctrl.loadingPromise">
    <table class="table table-striped"
           ng-table="$ctrl.tableParams"
           show-filter="$ctrl.filters">
      <colgroup>
        <col>
        <col width="100%">
      </colgroup>
      <tbody>
        <tr ng-repeat="item in $data">
          <td class="table-numeration">{{ $ctrl.count + $index + 1 }}</td>

          <td title="$ctrl.appContent.get('NAME')"
              filter="{ name: 'text' }"
              sortable="'name'"
              class="text-center">
            <a href=""
               title=""
               drilldown="{ title: item.name, component: '${su.cammelCase(entity)}sView', id: item.id, can: $ctrl.session.can('${opts.permission}', 'get'), color: $ctrl.${su.capitalize(entity)}Service.color }">
              {{ item.name | available }}
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
  `
}

module.exports = generate;
