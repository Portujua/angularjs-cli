const su = require('../utilities/StringUtils')
const ou = require('../utilities/ObjectUtils')

function generate(entity, opts, defaults = {}) {
  opts = ou.smartCopy(opts, defaults)

  return `
  describe('${su.capitalize(entity)} Factory', () => {
    beforeEach(angular.mock.module('app'));
    let ${su.capitalize(entity)};
  
    beforeEach(inject((_${su.capitalize(entity)}_) => {
      ${su.capitalize(entity)} = _${su.capitalize(entity)}_;
    }))
  
    it('Exists', () => {
      expect(${su.capitalize(entity)}).toBeDefined();
    })
  
    it('Implements inPlace payload', () => {
      let obj = new ${su.capitalize(entity)}({
        id: 'foo'
      })
  
      expect(obj.putPayload('id', 'bar')).toEqual({ id: 'bar' })
    })
  
    it('PUT contains ID field', () => {
      let obj = new ${su.capitalize(entity)}({
        id: 123
      })
  
      expect(Object.keys(obj.putPayload())).toContain('id');
    })
  
    it('POST doesn\'t contain ID field', () => {
      let obj = new ${su.capitalize(entity)}({
        id: 123
      })
  
      expect(Object.keys(obj.postPayload())).not.toContain('id');
    })
  
    it('Ignores non defined fields', () => {
      let obj = new ${su.capitalize(entity)}({
        foobarfoobarfoobar: 'foo'
      })
  
      expect('foobarfoobarfoobar' in obj).toBeFalsy();
    })
  })
  `
}

module.exports = generate;
