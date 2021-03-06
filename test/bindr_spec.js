describe('bindr', function() {

  beforeEach(function () {
    fixtures.load('bindr-test.html')
    this.fixtureDoc = fixtures.window().document
    this.hideStub = sinon.stub($.fn, 'hide')
    this.showStub = sinon.stub($.fn, 'show')
    this.textStub = sinon.stub($.fn, 'text')
    this.appendStub = sinon.spy($.fn, 'append')
  });

  afterEach(function () {
    this.hideStub.restore()
    this.showStub.restore()
    this.textStub.restore()
    this.appendStub.restore()
    fixtures.cleanUp()
  });

  it("should call methods on self and the children", function() {
    $('#sample-bindr', this.fixtureDoc).bindr()
    expect(this.hideStub).to.have.been.calledThrice
    expect(this.showStub).to.have.been.calledOnce
  });

  it("should call multiple methods", function() {
    $('#multiple-calls-bindr', this.fixtureDoc).bindr()
    expect(this.hideStub).to.have.been.calledThrice
    expect(this.showStub).to.have.been.calledOnce
  });

  it("should pass a string argument if one is provided", function() {
    var el = $('#string-argument-bindr', this.fixtureDoc).bindr()
    expect(this.textStub).to.have.been.calledWith('some text')
  });

  it("should pass multiple string arguments if they are provided", function() {
    var el = $('#multiple-string-arguments-bindr', this.fixtureDoc).bindr()
    expect(this.appendStub).to.have.been.calledWithExactly('<div>foo</div>', '<div>bar</div>')
  });

  it("should include last argument object", function() {
    var el = $('#last-param-arg-arguments-bindr', this.fixtureDoc)
    el.bindr()
    expect(this.appendStub).to.have.been.calledWithExactly('first append', 'second append', el.data())
  });

  it("should let you set the name of the data attribute", function() {
    var el = $('#different-name-bindr', this.fixtureDoc).bindr({attributeName: 'foobar'})
    expect(this.hideStub).to.have.been.calledWith('some argument', el.data())
  });

  it("should call methods with different params", function() {
    var el = $('#different-params-bindr', this.fixtureDoc).bindr()
    expect(this.hideStub).to.have.been.calledWithExactly('hide arg', 'other hide arg')
    expect(this.showStub).to.have.been.calledWithExactly('show args', el.data())
  });

})