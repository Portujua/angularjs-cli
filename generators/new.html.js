const su = require('../utilities/StringUtils')
const ou = require('../utilities/ObjectUtils')

function generate(entity, opts, defaults = {}) {
  opts = ou.smartCopy(opts, defaults)

  return `
<form name="form"
      autocomplete="off">
  <div class="modal-header">
    <h3 class="modal-title pull-left">{{ $ctrl.appContent.get('${su.underscorize(entity).toUpperCase()}') }}</h3>
    <div class="pull-right">
      <div class="btn-group btn-group-sm">
        <button class="btn btn-default btn-xs"
                type="button"
                ng-click="$ctrl.switchComposeState()"
                uib-tooltip="{{ isCollapsed ? $ctrl.appContent.get('MAXIMIZE') : $ctrl.appContent.get('MINIMIZE') }}"
                tooltip-append-to-body="true">
          <i class="fa fa-fw"
             ng-class="{ 'fa-window-maximize': isCollapsed, 'fa-window-minimize': !isCollapsed }"></i>
        </button>

        <button type="button"
                class="close"
                ng-click="$ctrl.cancel()"
                ng-disabled="$ctrl.isSaving"
                title="Cerrar">
          <i class="fa fa-fw fa-times"></i>
        </button>
      </div>
    </div>
  </div>
  <div uib-collapse="isCollapsed"
       class="modal-body"
       cg-busy="{ promise: $ctrl.loadingPromise, message: $ctrl.isSaving ? 'Saving...' : 'Loading...' }">

    <div class="form-group row has-feedback"
         ng-class="{ 'has-error': form.FIELD_NAME.$invalid && form.FIELD_NAME.$touched, 'has-success': form.FIELD_NAME.$valid && form.FIELD_NAME.$touched }">
      <label class="col-4 col-form-label"
             for="textinput">{{ $ctrl.appContent.get('FIELD_NAME') }}</label>
      <div class="col-6">
        <input type="text"
               name="FIELD_NAME"
               id="FIELD_NAME"
               class="form-control"
               ng-model="$ctrl.data.FIELD_NAME"
               required
               placeholder=""
               required
               maxlength="50">
        <!-- Errors -->
        <span class="help-block"
              ng-messages="form.FIELD_NAME.$error"
              role="alert">
          <span ng-message="required">{{ $ctrl.appContent.get('FIELD_REQUIRED') }}</span>
          <span ng-message="maxlength">{{ $ctrl.appContent.get('FIELD_MAXLENGTH') }} 50.</span>
          <span ng-message="pattern">{{ $ctrl.appContent.get('ERROR_ONLY_LETTERS') }}</span>
        </span>
        <!-- /Errors -->
      </div>
    </div>


  </div>

  <div class="modal-footer"
       uib-collapse="isCollapsed">
    <button class="btn btn-danger btn-link"
            type="button"
            ng-click="$ctrl.cancel()"
            ng-disabled="$ctrl.isSaving">
      {{ $ctrl.appContent.get('CLOSE') }}
    </button>
    <button class="btn btn-default"
            type="button"
            ng-click="$ctrl.save()"
            ng-disabled="form.$invalid || $ctrl.isSaving">
      <i class="fa fa-fw fa-save"></i>
      {{ $ctrl.appContent.get('CREATE') }}
    </button>
  </div>
</form>

  `
}

module.exports = generate;
