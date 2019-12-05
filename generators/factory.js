const su = require('../utilities/StringUtils')
const ou = require('../utilities/ObjectUtils')

function generate(entity, opts, defaults = { fields: [] }) {
  opts = ou.smartCopy(opts, defaults)

  return `
angular.module('app')
  .factory('${su.capitalize(entity)}', () => {

    class ${su.capitalize(entity)} extends BaseFactory {
      constructor({ createdAt = null, updatedAt = null, id = null, ${opts.fields.join(' = null, ')}${opts.fields.length > 0 ? ' = null' : ''} }) {
        super({ createdAt, updatedAt, id, ${opts.fields.join(', ')} });
      }

      postPayload() {
        return { };
      }

      putPayload(field, value) {
        if (_.isEmpty(field)) {
          // Bulk update
          return {
            //
          };
        }

        return {
          [field]: value
        };
      }
    };

    return ${su.capitalize(entity)};
  });
  `
}

module.exports = generate;
