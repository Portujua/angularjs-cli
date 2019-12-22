const su = require('../utilities/StringUtils')
const ou = require('../utilities/ObjectUtils')

function generate(entity, opts, defaults = {}) {
  opts = ou.smartCopy(opts, defaults)

  return `
  describe('${su.capitalize(entity)} Service', () => {
    beforeEach(angular.mock.module('app'));
    let ${su.capitalize(entity)}Service;
  
    beforeEach(inject((_${su.capitalize(entity)}Service_) => {
      ${su.capitalize(entity)}Service = _${su.capitalize(entity)}Service_;
    }))
  
    it('Exists', () => {
      expect(${su.capitalize(entity)}Service).toBeDefined();
    })

    it('API calls return promises', () => {
      expect(${su.capitalize(entity)}Service.list().__proto__.constructor.name).toEqual(Promise.name);
      expect(${su.capitalize(entity)}Service.create().__proto__.constructor.name).toEqual(Promise.name);
      expect(${su.capitalize(entity)}Service.get().__proto__.constructor.name).toEqual(Promise.name);
      expect(${su.capitalize(entity)}Service.update().__proto__.constructor.name).toEqual(Promise.name);
    })
  })
  `
}

module.exports = generate;
