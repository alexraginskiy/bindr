(function($){
  'use strict';

  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  var Bindr = function(el, options) {
    this.$el = $(el);
    this.options = options;

    this.run();
  };

  Bindr.DEFAULTS = {
    attributeName: 'bindr',
    selector: function() {
      return ['[data-', this.attributeName, ']'].join('');
    },
    dataAttr: function(attribute) {
      return this.attributeName + capitalize(attribute);
    }
  };

  Bindr.prototype.methods = function() {
    return this.$el.data(this.options.attributeName).split(' ');
  };

  Bindr.prototype.args = function(methodName) {

    var args = [],
        passedArgs,
        dataArgs = this.$el.data();

    if (typeof methodName !== 'undefined' && args !== null) {
      passedArgs = this.$el.data(this.options.dataAttr('arguments' + capitalize(methodName)))
    }
    
    if (!passedArgs) {
      passedArgs = this.$el.data(this.options.dataAttr('arguments'))
    }

    if (passedArgs) {
      args = passedArgs.split(', ');
    }

    if (!args.length || this.$el.data(this.options.dataAttr('lastArg')) || this.$el.data(this.options.dataAttr(capitalize(methodName) + 'LastArg'))) {
      args.push(dataArgs);
    }

    return args;
  };

  Bindr.prototype.run = function() {
    var methods = this.methods().reverse(),
        i = methods.length,
        method,
        args;

    while(i--) {
      method = methods[i];
      args = this.args(method);
      this.$el[method].apply(this.$el, args);
    }
  };

  $.fn.bindr = function(options) {

    options = $.extend({}, Bindr.DEFAULTS, options);

    return this.each(function() {
      var targets = $(this).find(options.selector()).addBack(options.selector());

      targets.each(function() {
        new Bindr(this, options);
      });
    });
  };

})(jQuery);
