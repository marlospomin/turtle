# Turtle.js

> Turtle is a blazing fast & modern javascript plugin to lazy-load your images with no dependencies.

### Features

* Extremely fast. (Using Intersection Observer)
* Lightweight.
* No dependencies.


## Install

``` bash
# Using npm
$ npm install --save turtle-js

# Using yarn
$ yarn install turtle-js
```

Now include turtle and you should be good to go.

``` js
// es6
import turtle from 'turtle'

// commonjs
const turtle = require('turtle');
```

Alternatively you can include a minified version of turtle (or the source code, up to you) on your page via direct file or our **CDN** link.

``` html
<body>
  <!-- CDN link not available yet, use the dist -->
  <script src="turtle.min.js"></script>
</body>
```

### Build Explanation

Files with ```.es7``` suffix are what they mean and should **not** be used in most cases (as they usually break on older browsers), if you don't care about compatibility use them as you wish.

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
const turtle = turtle();
```

### Configuring

These are the current options found in the source file, change them as you wish.

| Option | Default | Description |
| --- | --- | --- |
| `selector` | .turtle | A selector that indicates which class to search elements from. |
| `rootMargin` | 50px | Distance (Y axis) from the element for the event to occur. |
| `treshold` | 0 | Not used by turtle at this time. |

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

**Minified files found in the dist folder are es5 compatible.**

## Todo List

* [x] Refactor turtle to use a function caller.
* [ ] Make tests work properly.
* [ ] Update promise to async/await.
* [ ] Add options to the plugin.
* [ ] Make it work on IE 11.

## Contributing

If you feel like we missed something please do send us a message or, alternatively make a pull request or open an issue using a discussion/request label and we will go from there.

## License

Code released under the [MIT](LICENSE) license.
