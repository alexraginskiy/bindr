(function($){
  'use strict';

  var defaults = {
    attributeName: 'bindr',
    selector: function() {
      return ['[data-', this.attributeName, ']'].join('');
    }
  };

  $.fn.bindr = function(options) {

    options = $.extend({}, defaults, options);

    return this.each(function() {
      var $el     = $(this),
          targets = $el.find(options.selector()).addBack(options.selector());

      targets.each(function() {
        var $el            = $(this),
            methods        = $el.data(options.attributeName).split(' ').reverse(),
            args           = $el.data(options.attributeName+'Arguments') && $el.data(options.attributeName+'Arguments').split(', ').reverse(),
            includeLastArg = $el.data(options.attributeName+'LastArg'),
            method,
            arg,
            applyArgs = [];

        while(method = methods.pop()) {
          while(args && (arg = args.pop())) {
            applyArgs.push(arg)
          }

          if(!applyArgs.length || includeLastArg) {
            applyArgs.push($el.data());
          }

          $el[method].apply($el, applyArgs);
        }
      });
    });
  };

})(jQuery);