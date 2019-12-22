const su = require('../utilities/StringUtils')
const ou = require('../utilities/ObjectUtils')

function generate(entity, opts, defaults = { plural: `${su.cammelCase(entity)}s` }) {
  opts = ou.smartCopy(opts, defaults)

  return `
  describe('${su.capitalize(opts.plural)}ViewController', () => {
    beforeEach(angular.mock.module('app'));
  
    let element, scope, compile, $ctrl, $httpBackend;
    let id = 1;
  
    beforeEach(inject(($compile, $rootScope, CacheFactory, _$httpBackend_) => {
      CacheFactory.destroy('unittests.local-storage')
      CacheFactory.destroy('unittests.session-storage')
      $httpBackend = _$httpBackend_;
  
      // Setup fake BE
      $httpBackend.whenGET(/.+/).respond(200, { data: {} })
      $httpBackend.whenPOST(/.+/).respond(200, { data: {} })
      $httpBackend.whenPUT(/.+/).respond(200, { data: {} })
      $httpBackend.whenPATCH(/.+/).respond(200, { data: {} })
  
      scope = $rootScope.$new();
      compile = $compile;
      element = angular.element(\`<${su.dasherize(opts.plural)}-view id="\${id}"></${su.dasherize(opts.plural)}-view>\`)
      element = compile(element)(scope)
      scope.$digest();
      $ctrl = angular.element(element).controller('${su.cammelCase(opts.plural)}View')
    }))
  
    // Tests here!
    it('Exists', () => {
      expect($ctrl).toBeDefined();
    })
  
    it('AppContent is defined', () => {
      expect($ctrl.appContent).toBeDefined();
    })
  
    it('Reads passed ID property', () => {
      expect($ctrl.id).toBe(String(id));
    })
  
    it('Fetch entity', () => {
      $httpBackend.expectGET(/.+/).respond(200, { data: { id } })
      $ctrl.load();
      $httpBackend.flush();
  
      expect($ctrl.data.__proto__.constructor.name).toBe($ctrl.${su.capitalize(entity)}.name);
      expect($ctrl.data.id).toBe(id);
    })
  })
  `
}

module.exports = generate;
