const su = require('../utilities/StringUtils')
const ou = require('../utilities/ObjectUtils')

function generate(entity, opts, defaults = { fields: [], permission: su.cammelCase(entity) }) {
  opts = ou.smartCopy(opts, defaults)

  let dashboardGroups = ''

  for (let i = 0; i < opts.fields.length; i++) {
    dashboardGroups += `
            <div class="dashboard-group">
              <div class="col-4 dashboard-label">{{ $ctrl.appContent.get('${opts.fields[i].toUpperCase()}') }}</div>
              <div class="col-8 dashboard-input">
                <span editable-text="$ctrl.data.${opts.fields[i]}"
                      edit-disabled="!$ctrl.session.can('${opts.permission}', 'edit')"
                      onbeforesave="$ctrl.save($data, $ctrl.data, '${opts.fields[i]}')">
                  {{ $ctrl.data.${opts.fields[i]} | available }}
                </span>
              </div>
            </div>
`
  }

  return `
<div class="dashboard"
     cg-busy="$ctrl.loadingPromise">
  <div class="padding-sm">
    <div class="row">
      <collapsible-panel compact="true"></collapsible-panel>

      <!-- board -->
      <div class="col-12 col-lg-4 col-xl-3">
        <div class="panel panel-default">
          <!-- Body -->
          <div class="dashboard-body">

            <!-- Toolbar -->
            <div class="dashboard-actions">
              <div class="btn-toolbar">
                <div class="btn-group">
                  <button class="btn btn-primary btn-outline"
                          ng-click="$ctrl.load()"
                          uib-tooltip="{{ $ctrl.appContent.get('REFRESH') }}"
                          tooltip-append-to-body="true">
                    <i class="fa fa-fw fa-refresh"></i>
                  </button>
                </div>
              </div>
            </div>
            <!-- /Toolbar -->

            ${dashboardGroups}

          </div>
          <!-- /Body -->
        </div>
      </div>
      <!-- /board -->

      <div class="col">
        <div class="frame expand hug">
          <uib-tabset justified="false"
                      ng-if="$ctrl.data">
            <uib-tab index="1"
                     heading="N/A">
              Empty tab!
            </uib-tab>
          </uib-tabset>
        </div>
      </div>
    </div>
  </div>
</div>
  `
}

module.exports = generate;
