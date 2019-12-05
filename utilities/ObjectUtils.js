const _ = require('underscore')

class ObjectUtils {
  static smartCopy(opts, defaults) {
    let r = JSON.parse(JSON.stringify(defaults))

    for (let key in opts) {
      if (!_.isUndefined(opts[key]) && !_.isNull(opts[key]) && !_.isEmpty(opts[key]) && key in defaults) {
        r[key] = opts[key];
      }
    }

    return r;
  }
}

module.exports = ObjectUtils;
