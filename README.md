# bindr

Bindr is an example jQuery plugin that demonstrates a way to attach behavior to DOM elements through data attributes.  It is a pattern that promotes writing modular and reusable components that assign behavior to your website by utilizing jQuery's plugin system.  You can use to trigger built-in jQuery methods or other plugins that act on elements.

Although it requires you to decorate HTML elements in order to specify how they behave, it is no different than adding class attributes to specify how the elements will look.  The important distinction between this pattern and adding `onClick` attributes is that you are not actually writing any JavaScript in your markup, just stating references.

## Example

Assume you have a jQuery plugin with the following usage:

```HTML
<div id="my-element"></div>
```

```JavaScript
$('#my-element').foo()
```

If you wanted to call this plugin on any element, you could create a seperate .js file that looks for a specific selectors:

```JavaScript
$('.foo-element').foo()
// or
$('[data-trigger="foo"]').foo()
```

```HTML
<div id="my-element" class="foo-element"></div>
<!-- or -->
<div id="my-element" data-trigger="foo"></div>
```

Of course doing this everytime you want to assign behavior can be quite repetive, so bindr can 

With bindr, however, you could simply call any plugin by adding some data attributes to the elements in your HTML:

```HTML
<div id="my-element" data-bindr="foo"></div>
```

No extra JavaScript is required once you include bindr.

#### Passing arguments

If the plugin you would like to trigger takes arguments, you can pass them in various ways:

##### String arguments

```HTML
<div id="my-element" data-bindr="text" data-bindr-arguments="some text"></div>
```
is equivalent to
```JavaScript
$('#my-element').text('some text')
```

```HTML
<div id="my-element" data-bindr="append" data-bindr-arguments="<div>foo</div>, <div>bar</div>"></div>
```
is equivalent to
```JavaScript
$('#my-element').append('<div>foo</div>', '<div>bar</div>')
```

#### Object arguments

If your plugin takes an object as an argument, you can specify the properties of the object argument by using data attributes:

```HTML
<div id="my-element" data-bindr="animate" data-height="200" data-width="200"></div>
```
is equivalent to 
```JavaScript
$('#my-element').animate({height: 200, width: 200})
```

#### Strings and objects

Often times, plugins will take string and object arguments.  Bindr allows you to pass string arguments first, and an object argument last.

```HTML
<div id="my-element" data-bindr="somePlugin" data-bindr-arguments="first argument, second argument" data-foo="some value" data-bar="false"></div>
```
is equivalent to
```JavaScript
$('#my-element').somePlugin('first argument', 'second argument', {
  foo: 'some value',
  bar: false
})
```

### Calling multiple plugins on the same element

You can call multiple plugins on the same element by seperating them with a comma and a space in the data-bindr attribute:

```HTML
<div data-bindr="hide, show"></div>
```

## Caveats

When bindr passes objects as arguments, it passes them by using jQuery's `data` method, and therefore passes all key-values derivied from an elements data attributes.  If you are triggering multiple methods that take objects with the same keys, or if you have data attributes unrelated to the methods you'd like to call that can interfere with the object used as the argument, you may run into some issues. 