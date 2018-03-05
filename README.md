# Turtle.js [![Build Status](https://travis-ci.com/marlospomin/turtle.svg?token=PosttrboZuYSHkXP2Lm8&branch=master)](https://travis-ci.com/marlospomin/turtle)

> Turtle is a blazing fast & modern javascript plugin to lazy-load your images with no dependencies.

### Features

* Extremely fast. (Using Intersection Observer)
* Lightweight.
* No dependencies.

## Demo

Example page on codepen (temporary), click [here](https://codepen.io/marlospomin/pen/EbYXqe).


## Install

``` bash
# Using npm
$ npm install --save turtle-js

# Using yarn
$ yarn add turtle-js
```

Now include turtle and you should be good to go.

``` js
// es6
import turtle from 'turtle'

// commonjs
const turtle = require('turtle');
```

Alternatively you can include a minified version of turtle (or the source code, up to you) on your page via direct file or using our **CDN** link.

``` html
<body>
  <script src="https://unpkg.com/turtle-js"></script>
</body>
```

## Usage

Add ```.turtle ``` class to your element(s) and the image path using ```data-src``` attribute as follows below.

``` html
<img class="turtle" data-src="image.jpg" alt="">
```

If you want to use a *placeholder* for the real image refer it in the ```src``` attribute:

``` html
<img class="" src="placeholder.jpg" data-src="" alt="">
```

Call turtle function anywhere in your code.

``` js
// Call turtle
turtle();
```

### Configuring

These are the current options that can be modified, change them as you wish.

``` js
// Custom options
turtle('.mySelector', config = {
  rootMargin: '0px',
  treshold: 0
});
```

| Option | Default | Description |
| --- | --- | --- |
| `selector` | `.turtle` | A selector that indicates which class to search elements from. |
| `rootMargin` | `50px` | Distance (Y axis) from the element for the event to occur. |
| `treshold` | `0` | Not used by turtle at this time. |

## Running Tasks

You can run tasks with the ```yarn``` or ```npm``` shorthand using the following commands:

``` bash
# Build task
$ yarn build

# Lint task
$ yarn lint

# etc.
$ ...
```

## Browser Support

You can check the browsers supported [here](http://caniuse.com/#feat=intersectionobserver).

IE 11 is not supported by turtle.

**Files found in the dist folder are es5 compatible.**

## Todo List

* [ ] Refactor turtle to use async/await.
* [ ] Write tests.
* [ ] Refactor turtle to the bones.

**Legend**: Checked boxes mean *__partial__* completion, checked and ~~crossed~~ items mean they're *__fully__* working.

## Contributing

If you feel like I missed something please do send me a message or, alternatively make a pull request/open an issue and we will go from there.

## License

Code released under the [MIT](LICENSE) license.
