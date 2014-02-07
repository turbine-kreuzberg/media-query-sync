# MediaQuerySync

Re-use CSS media queries in JavaScript.

## Motivation

- DRY: All media queries are saved in one place. Especially when using tools as LESS CSS or SASS where the design breakpoints may be defined in the global variables file. Using this JS plug-in, one don't need to repeat the CSS media queries in a JS file.
- Fewer event actions for the layout: We may also listen to the resize event, but in many cases a redraw of the UI or a re-computing of layout options is not necessary on each resize action, but most times only if a design breakpoint was reached.

## Documentation

### Requirements

The plug-in uses the JavaScript [`CustomEvent`](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent). If you target browsers that do not know this object, you have to include the appropriate polyfill (polyfill.customevent.js).

    if( typeof window.CustomEvent !== 'function' ) {
        /* include polyfill (using your preferred script loading mechanism) */
    }

### Design breakpoints

The breakpoints are the following:

1. 'xs'
2. 'sm'
3. 'md'
4. 'lg'
5. 'xl'

The numbers correspond to the `z-index`  of the element that is used for the tests. Those z-indizes are set via CSS inside a give `@media` query. (See attached CSS or an example.)

### API

#### Custom event

One method to read a design breakpoint is to listen to the event `deviceStateChanged`, which has a property `deviceState`. This property contains a string naming the breakpoint that was reached as the event was fired.

#### Public method

The MediaQuerySync module has one public method: `getDeviceState()`. This method returns the current design breakpoint. This can be used if your layout changes do not only depend on screen size changes.

## Usage

### General

Include the provided CSS file in the HTML HEAD of your template or append it to your custom CSS/LESS.

    <link rel="stylesheet" href="media-query-sync.css">

### Event based usage

#### AMD

    require( [ 'media-query-sync' ], function() {
        window.addEventListener( 'deviceStateChanged', function( event ) {
            console.log( 'another breakpoint was reached: ' + event.deviceState );
        }, false );
    } );

#### Browser global

    <script type="text/javascript" src="media-query-sync.js"></script>
    <script type="text/javascript">
        window.addEventListener( 'deviceStateChanged', function( event ) {
            console.log( 'another breakpoint was reached: ' + event.deviceState );
        }, false );
    </script>

### Direct usage

#### AMD

    require( [ 'media-query-sync' ], function( MediaQuerySync ) {
        console.log( 'the current breakpoint is: ' + MediaQuerySync.getDeviceState() );
    } );

#### Browser global

    <script type="text/javascript" src="media-query-sync.js"></script>
    <script type="text/javascript">
        console.log( 'the current breakpoint is: ' + mediaQuerySync.getDeviceState() );
    </script>


### Demo

A complete usage example is available at:
http://demo.dev.votum.local/media-query-sync/demo.htm
(Watch the JS console output.)

