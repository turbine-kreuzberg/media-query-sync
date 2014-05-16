# Media Query Sync

Re-use CSS media queries in JavaScript.



## Motivation

- [DRY](https://en.wikipedia.org/wiki/Don't_repeat_yourself): All media queries are saved in one place. Especially when using tools as LESS CSS or SASS where the design breakpoints may be defined in the global variables file. Using this JS plug-in, one don't need to repeat the CSS media queries in a JS file.
- Fewer event actions for the layout: We may also listen to the resize event, but in many cases a redraw of the UI or a re-computing of layout options is not necessary on each resize action, but most times only if a design breakpoint was reached.



## Documentation

This plug-in is implemented as [AMD](https://github.com/amdjs/amdjs-api/wiki) and has a fallback to a global variable.


### Requirements

The plug-in uses the JavaScript [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent). If you target browsers that do not know this object, you have to include [the appropriate polyfill](polyfill.customevent.js). (For example IE 10 on Microsoft Surface tablets)

```javascript
    if( typeof window.CustomEvent !== 'function' ) {
        /* include polyfill (using your preferred script loading mechanism) */
    }
```


### Design breakpoints

The breakpoints are the following:

1. 'xs'
2. 'sm'
3. 'md'
4. 'lg'
5. 'xl'

The numbers correspond to the `z-index`  of the element that is used for the tests. Those z-indizes are set via CSS inside a give `@media` query. (See attached CSS or an example.) David Walsh also proposed to use pseudo elements and their `content` property to store the media query breakpoint identifiers directly. But [older versions of the iOS Safari and native Android browsers do not support `getComputedStyle` on pseudo-elements](http://caniuse.com/getcomputedstyle).


### API

#### Custom event

The first option to read a design breakpoint is to listen to the event `deviceStateChanged`, which has a property `deviceState`. This property contains a string naming the breakpoint that was reached as the event was fired.

#### Public method

The MediaQuerySync module has one public method: `getDeviceState()`. This method returns the current design breakpoint. This can be used if your layout changes do not only depend on screen size changes.



## Usage


### General

Include the provided CSS file in the HTML HEAD of your template or append it to your custom CSS/LESS.

```html
    <link rel="stylesheet" href="media-query-sync.css">
```


### Event based usage

You need to set up the event handler before the script is included to capture the initial event which is fired upon executing the module.

#### AMD

```javascript
    window.addEventListener( 'deviceStateChanged', function( event ) {
        console.log( 'another breakpoint was reached: ' + event.deviceState );
    }, false );
    
    require( [ 'media-query-sync' ] );
```

#### Browser global

```html
    <script type="text/javascript">
        window.addEventListener( 'deviceStateChanged', function( event ) {
            console.log( 'another breakpoint was reached: ' + event.deviceState );
        }, false );
    </script>
    <script type="text/javascript" src="media-query-sync.js"></script>
```


### Direct usage

#### AMD

```javascript
    require( [ 'media-query-sync' ], function( MediaQuerySync ) {
        console.log( 'the current breakpoint is: ' + MediaQuerySync.getDeviceState() );
    } );
```

#### Browser global

```html
    <script type="text/javascript" src="media-query-sync.js"></script>
    <script type="text/javascript">
        console.log( 'the current breakpoint is: ' + mediaQuerySync.getDeviceState() );
    </script>
```


### Demo

You can run the usage example via rawgit.com: https://rawgit.com/votum/media-query-sync/master/demo.htm (Watch the JS console output.)

