(function($){
  'use strict';

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
      return this.attributeName + attribute.charAt(0).toUpperCase() + attribute.slice(1);
    }
  };

  Bindr.prototype.methods = function() {
    return this.$el.data(this.options.attributeName).split(' ');
  };

  Bindr.prototype.args = function() {
    var args = this.$el.data(this.options.dataAttr('arguments')) ? this.$el.data(this.options.dataAttr('arguments')).split(', ') : [];
    var dataArgs   = this.$el.data();

    if(!args.length || this.$el.data(this.options.dataAttr('lastArg'))) {
      args.push(dataArgs);
    }

    return args;
  };

  Bindr.prototype.run = function() {
    var methods = this.methods().reverse();
    var i = methods.length;
    var args = this.args();

    while(i--) {
      this.$el[methods[i]].apply(this.$el, args);
    }
  };

  $.fn.bindr = function(options) {

    options = $.extend({}, Bindr.DEFAULTS, options);

    return this.each(function() {
      var targets = $(this).find(options.selector()).addBack(options.selector());

      targets.each(function() {
        var bindr = new Bindr(this, options);
      });
    });
  };

})(jQuery);
